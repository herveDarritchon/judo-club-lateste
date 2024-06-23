import { JWTAuthBody } from '$lib/security/body/JWTAuthBody';
import { JWTAuthHeaders } from '$lib/security/header/JWTAuthHeader';
import { JWTAuthCookies } from '$lib/security/cookie/JWTAuthCookie';

export class HttpFetcher {
	public readonly fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;

	constructor(fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>) {
		this.fetch = fetch;
	}
}

/**
 * HttpClient - A class to handle HTTP requests to the API server
 * @class HttpClient - A class to handle HTTP requests to the API server
 * @public
 */
export class HttpClient {
	private readonly serverBaseUrl: string;
	private readonly fetcher: (input: RequestInfo, init?: RequestInit) => Promise<Response>;

	/**
	 * Constructor to create an HttpClient instance
	 * @param apiUrl - The URL of the API server
	 * @param fetcher
	 */
	constructor(apiUrl: string, fetcher: (input: RequestInfo, init?: RequestInit) => Promise<Response> = fetch) {
		this.serverBaseUrl = apiUrl;
		this.fetcher = fetcher;
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
	async request<T>(path: string, method: string, body: T, headers: JWTAuthHeaders, cookies: JWTAuthCookies): Promise<Response> {
		console.log('path', path);
		console.log('method', method);
		console.log('body', body);
		console.log('headers', headers);
		console.log('cookies', cookies);

		const response = await this.fetcher(`${this.serverBaseUrl}${path}`, {
			method: method,
			credentials: 'include', // Inclure les cookies pour les requêtes cross-origin
			headers: {
				...headers.getHeaders(),
				'Cookie': cookies.getCookieString()
			},
			body: JSON.stringify(body)
		});
		if (!response.ok) {
			const data = await response.json();
			throw new Error(data.message || 'Request failed');
		}
		return response;
	}
}