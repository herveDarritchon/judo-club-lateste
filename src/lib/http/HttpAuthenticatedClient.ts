import { JWTAuthHeaders } from '$lib/security/header/JWTAuthHeader';
import { HttpClient } from '$lib/http/HttpClient';
import { JWTAuthBody, type JWTAuthBodyProps } from '$lib/security/body/JWTAuthBody';
import { JWTAuthCookies, JWTAuthNoCookies } from '$lib/security/cookie/JWTAuthCookie';
import { type AuthToken, InvalidAuthToken, JWTAuthToken } from '$lib/security/authToken/JWTAuthToken';
import { InvalidRefreshToken, RefreshToken, type RefreshTokenProps } from '$lib/security/refreshToken/JWTRefreshToken';
import { JWTAuthResponse } from '$lib/security/JWTAuthResponse';
import { HttpMethod } from '$lib/http/HttpMethod';
import type { StorageService } from '$lib/storage/StorageService';
import { DeviceFingerPrint } from '$lib/security/DeviceFingerPrint';

/**
 * HttpClient - A class to handle HTTP requests to the API server
 * @class HttpClient - A class to handle HTTP requests to the API server
 * @public
 */
export class HttpAuthenticatedClient extends HttpClient {
	private readonly AUTH_TOKEN_KEY = 'auth_token';
	public static readonly REFRESH_TOKEN_KEY = 'refresh_token';
	private readonly storageService: StorageService;

	/**
	 * Constructor to create an HttpClient instance
	 * @param serverBaseUrl - The URL of the API server
	 * @param fetcher
	 * @param storageService
	 */
	constructor(serverBaseUrl: string, fetcher: (input: RequestInfo, init?: RequestInit) => Promise<Response>, storageService: StorageService) {
		super(serverBaseUrl, fetcher);
		this.storageService = storageService;
	}

	/**
	 * Method to make a method (GET, POST, UPDATE, DELETE) request to the API server with JWT token
	 * @param path - The path of the request (e.g. '/wp-json/wp/v2/posts')
	 * @param method - The method of the request (e.g. 'GET', 'POST', 'UPDATE', 'DELETE')
	 * @param body - The body of the request (e.g. { username: 'username', password: 'password', device: 'device' })
	 * @param headers - The headers of the request (e.g. { 'Content-Type': 'application/json', 'Accept': 'application/json' })
	 * @param cookies - The cookies of the request (e.g. { 'auth_token': 'auth token', 'refresh': 'refresh token' })
	 * @returns Promise<Response> - The response of the request as a promise
	 * @public
	 */
	async request(path: string, method: string, body: JWTAuthBody, headers: JWTAuthHeaders, cookies: JWTAuthCookies): Promise<Response> {
		const deviceId = new DeviceFingerPrint(this.storageService).get();
		const token = await this.createToken(deviceId);
		headers.setHeader('Authorization', `Bearer ${token}`);
		return super.request(path, method, body, headers, cookies);
	}

	// Create token from credentials (username and password)
	async createTokenFromCredentials(username: string, password: string, device: string = ''): Promise<JWTAuthToken> {
		const body: JWTAuthBodyProps = device === '' ? { username, password } : { username, password, device };
		const response = await super.request('/wp-json/jwt-auth/v1/token', HttpMethod.POST, new JWTAuthBody(body), new JWTAuthHeaders(), new JWTAuthNoCookies());

		// Check for refresh_token in the response cookies
		const refreshToken = JWTAuthHeaders.extractCookieFrom(response.headers, HttpAuthenticatedClient.REFRESH_TOKEN_KEY);
		if (refreshToken) {
			this.storageService.save(HttpAuthenticatedClient.REFRESH_TOKEN_KEY, refreshToken);
		}

		const data = await response.json();

		const jwtAuthToken = new JWTAuthToken(new JWTAuthResponse(data));
		this.storageService.save(this.AUTH_TOKEN_KEY, jwtAuthToken.authToken);
		return jwtAuthToken;
	}

	// Create token from refresh token
	protected async createTokenFromRefreshToken(device: string = ''): Promise<JWTAuthToken> {
		const body: JWTAuthBodyProps = device === '' ? {} : { device };
		const refreshTokenProps: RefreshTokenProps = this.storageService.read(HttpAuthenticatedClient.REFRESH_TOKEN_KEY) ?? new InvalidRefreshToken();
		const refreshToken = new RefreshToken(refreshTokenProps);
		if (!refreshToken || !refreshToken.isValid()) {
			throw new Error('No refresh token found');
		}
		const cookies = new JWTAuthCookies(HttpAuthenticatedClient.REFRESH_TOKEN_KEY, refreshToken.value);
		const response = await super.request('/wp-json/jwt-auth/v1/token', HttpMethod.POST, new JWTAuthBody(body), new JWTAuthHeaders(), cookies);

		const data = await response.json();
		const jwtAuthToken = new JWTAuthToken(new JWTAuthResponse(data));
		this.storageService.save(this.AUTH_TOKEN_KEY, jwtAuthToken.authToken);
		return jwtAuthToken;
	}

	// Validate token
	async validateToken(token: string): Promise<boolean> {
		const headers = { 'Authorization': `Bearer ${token}` };
		let response;
		try {
			response = await super.request('/jwt-auth/v1/token/validate', HttpMethod.POST, {}, new JWTAuthHeaders(headers), new JWTAuthNoCookies());
		} catch (e: unknown) {
			if (e instanceof Error) {
				console.debug('Erreur de validation du Token:', e.message);
			}
			return false;
		}
		const data = await response.json();
		const jwtAuthToken = new JWTAuthResponse(data);
		return jwtAuthToken.isValid();
	}

	private async createToken(device: string): Promise<AuthToken> {
		const token: AuthToken = this.storageService.read(this.AUTH_TOKEN_KEY) ?? new InvalidAuthToken();
		if (!token || !token.isValid()) {
			const token: RefreshToken = this.storageService.read(HttpAuthenticatedClient.REFRESH_TOKEN_KEY) ?? new InvalidRefreshToken();
			if (!token || !token.isValid()) {
				throw new Error('No refresh token found or auth token is invalid');
			}
			return (await this.createTokenFromRefreshToken(device)).authToken;
		}
		return token;
	}
}