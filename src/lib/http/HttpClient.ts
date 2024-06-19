import { JWTAuthBody, JWTAuthCookies, JWTAuthHeaders } from '$lib/security/JWTAuthRequest';
import { JWTAuthService } from '$lib/security/JWTAuthService';
import type { StorageService } from '$lib/storage/StorageService';
import type { DeviceFingerPrint } from '$lib/security/DeviceFingerPrint';

/**
 * HttpClient - A class to handle HTTP requests to the API server
 * @class HttpClient - A class to handle HTTP requests to the API server
 * @public
 */
export class HttpClient {
	private readonly apiUrl: string;
	private readonly jwtAuthService: JWTAuthService;
	private deviceFingerPrint: DeviceFingerPrint;

	/**
	 * Constructor to create an HttpClient instance
	 * @param apiUrl
	 * @param storageService
	 */
	constructor(apiUrl: string, storageService: StorageService) {
		this.apiUrl = apiUrl;
		this.deviceFingerPrint = new DeviceFingerPrint(storageService);
		this.jwtAuthService = new JWTAuthService(apiUrl, storageService);
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

		const token = new JWTAuthService(path).getToken(this.deviceFingerPrint.get());
		const response = await fetch(`${this.apiUrl}${path}`, {
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
}