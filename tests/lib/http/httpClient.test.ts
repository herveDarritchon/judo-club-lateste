import { beforeEach, describe, expect, it, vi } from 'vitest';
import { JWTAuthBody } from '$lib/security/body/JWTAuthBody';
import { JWTAuthHeaders } from '$lib/security/header/JWTAuthHeader';
import { JWTAuthCookies } from '$lib/security/cookie/JWTAuthCookie';
import { HttpClient } from '$lib/http/HttpClient';
import { HttpMethod } from '$lib/http/HttpMethod';
import { MockFetch } from './MockFetch';

vi.mock('$lib/security/JWTAuthService');
vi.mock('$lib/security/DeviceFingerPrint');
const serverBaseUrl = 'https://example.com';

describe('HttpClient', () => {
	let httpClient: HttpClient;
	let mockFetch: MockFetch;

	beforeEach(() => {

		mockFetch = new MockFetch();
		httpClient = new HttpClient(serverBaseUrl, mockFetch.fetch.bind(mockFetch));

	});

	it('should initialize with serverBaseUrl and services', () => {
		expect(httpClient['serverBaseUrl']).toBe(serverBaseUrl);
	});

	it('should make a successful request', async () => {
		const path = '/test';
		const method = HttpMethod.GET;
		const body: JWTAuthBody = {};
		const headers = new JWTAuthHeaders();
		const cookies = new JWTAuthCookies();
		const mockedResponse = { message: 'Success' };

		// Ajouter une route pour le chemin '/test'
		mockFetch.addRoute(serverBaseUrl + path, () => {
			return Promise.resolve(MockFetch.createMockResponse(mockedResponse, {
				status: 200,
				statusText: 'OK'
			}));
		});

		await httpClient.request(path, method, body, headers, cookies);

		const requestInit = mockFetch.getInitFromRoute(serverBaseUrl + path);

		expect(requestInit.method).toBe(HttpMethod.GET);
		expect(requestInit.credentials).toBe('include');
		expect(requestInit.headers).toEqual({
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Cookie': ''
		});
		expect(requestInit.body).toEqual(JSON.stringify(body));
	});

	it('should handle request failure', async () => {
		const path = '/error';
		const method = HttpMethod.DELETE;
		const body: JWTAuthBody = {};
		const headers = new JWTAuthHeaders();
		const cookies = new JWTAuthCookies();
		const mockedResponse = { message: 'Request failed' };

		// Ajouter une route pour le chemin '/test'
		mockFetch.addRoute(serverBaseUrl + path, () => {
			return Promise.resolve(MockFetch.createMockResponse(mockedResponse, {
				status: 500,
				statusText: 'ERROR_SERVER'
			}));
		});

		await expect(httpClient.request(path, method, body, headers, cookies)).rejects.toThrow('Request failed');

		const requestInit = mockFetch.getInitFromRoute(serverBaseUrl + path);

		expect(requestInit.method).toBe(HttpMethod.DELETE);
		expect(requestInit.credentials).toBe('include');
		expect(requestInit.headers).toEqual({
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Cookie': ''
		});
		expect(requestInit.body).toEqual(JSON.stringify(body));
	});
});
