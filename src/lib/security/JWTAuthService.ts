import { JWTAuthBody, type JWTAuthBodyProps } from '$lib/security/body/JWTAuthBody';
import { JWTAuthCookies, JWTAuthNoCookies } from '$lib/security/cookie/JWTAuthCookie';
import { JWTAuthHeaders } from '$lib/security/header/JWTAuthHeader';
import type { StorageService } from '$lib/storage/StorageService';
import { type AuthToken, InvalidAuthToken, JWTAuthToken } from '$lib/security/authToken/JWTAuthToken';
import { InvalidRefreshToken, type RefreshToken } from '$lib/security/refreshToken/JWTRefreshToken';
import type { JWTAuthResponseProps } from '$lib/security/JWTAuthResponse';

/**
 * JWTAuthService
 *  - A service to handle JWT authentication
 *  - It creates and refreshes JWT tokens
 *  - It validates JWT tokens
 *  - It stores the tokens in the storage
 *  @export
 *  @public
 */
export class JWTAuthService {
	private readonly apiUrl: string;
	private readonly AUTH_TOKEN_KEY = 'auth_token';
	private readonly REFRESH_TOKEN_KEY = 'refresh_token';
	private readonly storageService: StorageService;

	constructor(apiUrl: string, storageService: StorageService) {
		this.apiUrl = apiUrl;
		this.storageService = storageService;
	}

	// Helper method to handle API requests
	private async request(endpoint: string, method: string, body: JWTAuthBody, headers: JWTAuthHeaders, cookies: JWTAuthCookies): Promise<Response> {
		const response = await fetch(`${this.apiUrl}${endpoint}`, {
			method: method,
			headers: {
				...headers.getHeaders(),
				'Cookie': cookies.getCookieString()
			},
			body: JSON.stringify(body)
		});
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.message || 'Request failed');
		}
		return response;
	}

	// Helper function to extract refresh_token from response headers
	private extractRefreshTokenFromHeaders(headers: Headers): string | null {
		const cookies = headers.get('set-cookie');
		if (!cookies) {
			return null;
		}

		const refreshTokenCookie = cookies.split(';')
			.find(cookie => cookie.trim().startsWith('refresh_token='));
		if (!refreshTokenCookie) {
			return null;
		}

		return decodeURIComponent(refreshTokenCookie.trim().substring('refresh_token='.length));
	}

	// Create token from credentials (username and password)
	async createTokenFromCredentials(username: string, password: string, device: string = ''): Promise<JWTAuthToken> {
		const body: JWTAuthBodyProps = device === '' ? { username, password } : { username, password, device };
		const response = await this.request('/wp-json/jwt-auth/v1/token', 'POST', new JWTAuthBody(body), new JWTAuthHeaders(), new JWTAuthNoCookies());

		// Check for refresh_token in the response cookies
		const refreshToken = this.extractRefreshTokenFromHeaders(response.headers);
		if (refreshToken) {
			this.storageService.save(this.REFRESH_TOKEN_KEY, refreshToken);
		}

		const data = await response.json();
		console.log('Token creation:', data);
		const jwtAuthToken = new JWTAuthToken(data);
		this.storageService.save(this.AUTH_TOKEN_KEY, jwtAuthToken.getAuthToken());
		return jwtAuthToken;
	}

	// Create token from refresh token
	async createTokenFromRefreshToken(device: string = ''): Promise<AuthToken> {
		const body: JWTAuthBodyProps = device === '' ? {} : { device };
		const refreshToken: RefreshToken = this.storageService.read(this.REFRESH_TOKEN_KEY) ?? new InvalidRefreshToken();
		if (!refreshToken || !refreshToken.isValid()) {
			throw new Error('No refresh token found');
		}
		const cookies = new JWTAuthCookies(this.REFRESH_TOKEN_KEY, refreshToken.value);
		const response = await this.request('/wp-json/jwt-auth/v1/token', 'POST', new JWTAuthBody(body), new JWTAuthHeaders(), cookies);

		const data = await response.json();
		console.log('Token creation:', data);
		return new JWTAuthToken(data).authToken;
	}

	// Refresh token
	async refreshToken(refreshToken: string, device: string = ''): Promise<JWTAuthResponseProps> {
		const headers = { 'Authorization': `Bearer ${refreshToken}` };
		const body = { device };
		const response = await this.request('/wp-json/jwt-auth/v1/token/refresh', 'POST', new JWTAuthBody(body), new JWTAuthHeaders(headers), new JWTAuthNoCookies());
		const data = await response.json();
		console.log('Token refresh:', data);
		return data;
	}

	// Validate token
	async validateToken(token: string): Promise<boolean> {
		const headers = { 'Authorization': `Bearer ${token}` };
		const response = await this.request('/jwt-auth/v1/token/validate', 'POST', {}, new JWTAuthHeaders(headers), new JWTAuthNoCookies());
		const data = await response.json();
		console.log('Token validation:', data);
		return data.isValid();
	}

	async getToken(device: string): Promise<AuthToken> {
		const token: AuthToken = this.storageService.read(this.AUTH_TOKEN_KEY) ?? new InvalidAuthToken();
		if (!token || !token.isValid()) {
			const token: RefreshToken = this.storageService.read(this.REFRESH_TOKEN_KEY) ?? new InvalidRefreshToken();
			if (!token || !token.isValid()) {
				throw new Error('No refresh token found or auth token is invalid');
			}
			return await this.createTokenFromRefreshToken(device);
		}
		return token;
	}
}