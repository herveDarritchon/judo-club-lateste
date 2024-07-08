import { JWTAuthHeaders } from '$lib/security/header/JWTAuthHeader';
import { HttpClient } from '$lib/http/HttpClient';
import { JWTAuthBody, type JWTAuthBodyProps } from '$lib/security/body/JWTAuthBody';
import { JWTAuthCookies, JWTAuthNoCookies } from '$lib/security/cookie/JWTAuthCookie';
import { AuthToken, InvalidAuthToken, JWTAuthToken } from '$lib/security/authToken/JWTAuthToken';
import { JWTAuthResponse } from '$lib/security/JWTAuthResponse';
import { HttpMethod } from '$lib/http/HttpMethod';
import { StorageService } from '$lib/storage/StorageService';
import { DeviceFingerPrint } from '$lib/security/fingerPrint/DeviceFingerPrint';

/**
 * HttpClient - A class to handle HTTP requests to the API server
 * @class HttpClient - A class to handle HTTP requests to the API server
 * @public
 */
export class HttpAuthenticatedClient extends HttpClient {
	private readonly AUTH_TOKEN_KEY = 'auth_token';
	public static readonly REFRESH_TOKEN_KEY = 'refresh_token';
	private readonly storageService: StorageService;
	private readonly deviceFingerPrint: DeviceFingerPrint;

	/**
	 * Constructor to create an HttpClient instance
	 * @param serverBaseUrl - The URL of the API server
	 * @param storageService
	 * @param fetcher
	 */
	constructor(serverBaseUrl: string, storageService: StorageService = new StorageService(localStorage), fetcher: (input: RequestInfo, init?: RequestInit) => Promise<Response> = fetch) {
		super(serverBaseUrl, fetcher);
		this.storageService = storageService;
		this.deviceFingerPrint =  new DeviceFingerPrint(this.storageService);
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
	async request<T>(path: string, method: string, body?: T, headers: JWTAuthHeaders = new JWTAuthHeaders(), cookies: JWTAuthCookies = new JWTAuthNoCookies()): Promise<Response> {
		const deviceId = await this.deviceFingerPrint.get();
		const token = await this.createToken(deviceId);
		headers.setHeader('Authorization', `Bearer ${token.value}`);
		const response = await super.request(path, method, body, headers, cookies);
		if (response.status === 401) {
			const jwtAuthToken = await this.createTokenFromRefreshToken(deviceId);
			headers.setHeader('Authorization', `Bearer ${jwtAuthToken.authToken.value}`);
			return await super.request(path, method, body, headers, cookies);
		}
		return response;
	}

	// Create token from credentials (username and password)
	/**
	 * Method to create a JWT token from credentials (username and password)
	 * @param username - The username of the user
	 * @param password - The password of the user
	 * @param device
	 * @returns Promise<JWTAuthToken> - The JWT token as a promise
	 * @public
	 * @async
	 */
	async createTokenFromCredentials(username: string, password: string, device: string = ''): Promise<JWTAuthToken> {
		const body: JWTAuthBodyProps = device === '' ? { username, password, device: await this.deviceFingerPrint.get() } : { username, password, device };
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
	/**
	 * Method to create a JWT token from a refresh token
	 * @returns Promise<JWTAuthToken> - The JWT token as a promise
	 * @public
	 * @async
	 * @param deviceId
	 */
	protected async createTokenFromRefreshToken(deviceId: string = ''): Promise<JWTAuthToken> {
		const body: JWTAuthBodyProps = deviceId === '' ? {} : { device: deviceId };
		/*		const refreshTokenProps: RefreshTokenProps = this.storageService.read(HttpAuthenticatedClient.REFRESH_TOKEN_KEY) ?? new InvalidRefreshToken();
				const refreshToken = new RefreshToken(refreshTokenProps);
				if (!refreshToken || !refreshToken.isValid()) {
					throw new Error('No refresh token found');
				}
				const cookies = new JWTAuthCookies(HttpAuthenticatedClient.REFRESH_TOKEN_KEY, refreshToken.value);*/
		const response = await super.request('/wp-json/jwt-auth/v1/token', HttpMethod.POST, new JWTAuthBody(body), new JWTAuthHeaders(), new JWTAuthNoCookies());

		const data = await response.json();
		const jwtAuthToken = new JWTAuthToken(new JWTAuthResponse(data));
		this.storageService.save(this.AUTH_TOKEN_KEY, jwtAuthToken.authToken);
		return jwtAuthToken;
	}

	// Validate token
	/**
	 * Method to validate a JWT token
	 * @param token - The JWT token to validate
	 * @returns Promise<boolean> - The validation result as a promise
	 * @public
	 * @async
	 */
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

	/**
	 * Method to create a token with a device
	 * @param device
	 * @private
	 */
	private async createToken(device: string): Promise<AuthToken> {
		const rawToken: AuthToken = this.storageService.read(this.AUTH_TOKEN_KEY) ?? new InvalidAuthToken();
		const token = new AuthToken(rawToken);
		if (!token || !token.isValid()) {
			const jwtAuthToken = await this.createTokenFromRefreshToken(device);
			/*const token: RefreshToken = this.storageService.read(HttpAuthenticatedClient.REFRESH_TOKEN_KEY) ?? new InvalidRefreshToken();*/
			if (!jwtAuthToken || !jwtAuthToken.isValid()) {
				throw new Error('No refresh token or auth token are valid');
			}
			return jwtAuthToken.authToken;
		}
		return token;
	}
}