import { beforeEach, describe, expect, it } from 'vitest';
import { HttpAuthenticatedClient } from '$lib/http/HttpAuthenticatedClient';
import { StorageService } from '$lib/storage/StorageService';
import { MockStorage } from '../storage/MockStorage';
import { HttpMethod } from '$lib/http/HttpMethod';
import { MockFetch } from './MockFetch';
import { JWTAuthToken } from '$lib/security/authToken/JWTAuthToken';
import { RefreshToken } from '$lib/security/refreshToken/JWTRefreshToken';

class TestHttpAuthenticatedClient extends HttpAuthenticatedClient {
	public async createTokenFromRefreshToken(): Promise<JWTAuthToken> {
		return super.createTokenFromRefreshToken();
	}
}

const serverBaseUrl = 'https://api.example.com';
let client: TestHttpAuthenticatedClient;
let storageService: StorageService;
let storage: MockStorage;
let mockFetch = new MockFetch();

beforeEach(() => {

	storage = new MockStorage();
	storageService = new StorageService(storage);
	mockFetch = new MockFetch();
	client = new TestHttpAuthenticatedClient(serverBaseUrl, mockFetch.fetch.bind(mockFetch), storageService);

});

describe('HttpAuthenticatedClient', () => {
	const createTokenPath = '/wp-json/jwt-auth/v1/token';
	const validToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg4ODgvanVkb2xhdGVzdGUiLCJpYXQiOjE3MTkwNDU5MDcsIm5iZiI6MTcxOTA0NTkwNywiZXhwIjoxNzE5MDQ2NTA3LCJkYXRhIjp7InVzZXIiOnsiaWQiOjIsImRldmljZSI6IiIsInBhc3MiOiJiMjNkOTljNzZmMmM3MTMyYWExYzBhMDAxOTNhZjFmMiJ9fX0.SznG4umcio__Vwd-PT5vxjW39pMArKTuBB_787jiGs4';
	const createTokenMockedResponse = {
		'success': true,
		'statusCode': 200,
		'code': 'jwt_auth_valid_credential',
		'message': 'Credential is valid',
		'data': {
			'token': validToken,
			'id': 2,
			'email': 'herve.darritchon@gmail.com',
			'nicename': 'hervedarritchon',
			'firstName': 'Hervé',
			'lastName': 'Darritchon',
			'displayName': 'Hervé Darritchon'
		}
	};
	const headers = new Headers({
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	});
	it('should create token from credentials without device fingerprint', async () => {
		// Ajouter une route pour le chemin '/wp-json/jwt-auth/v1/token'
		mockFetch.addRoute(serverBaseUrl + createTokenPath, () => {
			return Promise.resolve(MockFetch.buildMockResponse(createTokenMockedResponse, {
				status: 200,
				statusText: 'OK',
				headers
			}));
		});

		const token = await client.createTokenFromCredentials('username', 'password');

		const requestInit = mockFetch.getInitFromRoute(serverBaseUrl + createTokenPath);

		expect(requestInit.method).toBe(HttpMethod.POST);
		expect(requestInit.credentials).toBe('include');
		expect(requestInit.headers).toEqual({
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Cookie': ''
		});
		expect(requestInit.body).toEqual(JSON.stringify({ username: 'username', password: 'password' }));
		expect(token.authToken.value).toBe(validToken);
	});
	it('should create token from credentials with a device fingerprint', async () => {
		// Ajouter une route pour le chemin '/wp-json/jwt-auth/v1/token'
		mockFetch.addRoute(serverBaseUrl + createTokenPath, () => {
			return Promise.resolve(MockFetch.buildMockResponse(createTokenMockedResponse, {
				status: 200,
				statusText: 'OK',
				headers
			}));
		});

		const token = await client.createTokenFromCredentials('username', 'password', 'device-fingerprint-123-456-789');

		const requestInit = mockFetch.getInitFromRoute(serverBaseUrl + createTokenPath);

		expect(requestInit.method).toBe(HttpMethod.POST);
		expect(requestInit.credentials).toBe('include');
		expect(requestInit.headers).toEqual({
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Cookie': ''
		});
		expect(requestInit.body).toEqual(JSON.stringify({
			username: 'username',
			password: 'password',
			device: 'device-fingerprint-123-456-789'
		}));
		expect(token.authToken.value).toBe(validToken);
	});
	it('should create token from refresh token', async () => {
		const date = new Date(); // Now
		date.setDate(date.getDate() + 30);
		storageService.save('refresh_token', new RefreshToken({ value: 'validRefreshToken', expireAt: date }));

		// Ajouter une route pour le chemin '/wp-json/jwt-auth/v1/token'
		mockFetch.addRoute(serverBaseUrl + createTokenPath, () => {
			return Promise.resolve(MockFetch.buildMockResponse(createTokenMockedResponse, {
				status: 200,
				statusText: 'OK',
				headers
			}));
		});

		const token = await client.createTokenFromRefreshToken();

		const requestInit = mockFetch.getInitFromRoute(serverBaseUrl + createTokenPath);

		expect(requestInit.method).toBe(HttpMethod.POST);
		expect(requestInit.credentials).toBe('include');
		expect(requestInit.headers).toEqual({
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Cookie': 'refresh_token=validRefreshToken'
		});
		expect(requestInit.body).toEqual(JSON.stringify({}));
		expect(token.authToken.value).toBe(validToken);
	});
	it('should throw an error from refresh token if no refresh token', async () => {

		expect(async () => await client.createTokenFromRefreshToken()).rejects.toThrow('No refresh token found');

	});
	it('should throw an error from refresh token if an invalid refresh token', async () => {
		const date = new Date(); // Now
		date.setDate(date.getDate() - 1);
		storageService.save('refresh_token', new RefreshToken({ value: 'validRefreshToken', expireAt: date }));

		expect(async () => await client.createTokenFromRefreshToken()).rejects.toThrow('No refresh token found');

	});

});

describe('HttpAuthenticatedClient - validateToken', () => {
	const validateTokenPath = '/jwt-auth/v1/token/validate';
	const validToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg4ODgvanVkb2xhdGVzdGUiLCJpYXQiOjE3MTkwNDU5MDcsIm5iZiI6MTcxOTA0NTkwNywiZXhwIjoxNzE5MDQ2NTA3LCJkYXRhIjp7InVzZXIiOnsiaWQiOjIsImRldmljZSI6IiIsInBhc3MiOiJiMjNkOTljNzZmMmM3MTMyYWExYzBhMDAxOTNhZjFmMiJ9fX0.SznG4umcio__Vwd-PT5vxjW39pMArKTuBB_787jiGs4';
	const invalidToken = 'invalidToken';
	const validTokenMockedResponse = {
		'success': true,
		'statusCode': 200,
		'code': 'jwt_auth_valid_token',
		'message': 'Token is valid',
		'data': []
	};
	const invalidTokenMockedResponse = {
		'success': false,
		'statusCode': 401,
		'code': 'jwt_auth_invalid_token',
		'message': 'Expired token',
		'data': []
	};
	const headers = new Headers({
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	});

	it('should validate a valid token', async () => {
		mockFetch.addRoute(serverBaseUrl + validateTokenPath, () => {
			return Promise.resolve(MockFetch.buildMockResponse(validTokenMockedResponse, {
				status: 200,
				statusText: 'OK',
				headers
			}));
		});

		const isValid = await client.validateToken(validToken);

		const requestInit = mockFetch.getInitFromRoute(serverBaseUrl + validateTokenPath);

		expect(requestInit.method).toBe(HttpMethod.POST);
		expect(requestInit.credentials).toBe('include');
		expect(requestInit.headers).toEqual({
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${validToken}`,
			'Cookie': ''
		});
		expect(isValid).toBe(true);
	});

	it('should invalidate an invalid token', async () => {
		mockFetch.addRoute(serverBaseUrl + validateTokenPath, () => {
			return Promise.resolve(MockFetch.buildMockResponse(invalidTokenMockedResponse, {
				status: 401,
				statusText: 'Unauthorized',
				headers
			}));
		});

		const isValid = await client.validateToken(invalidToken);

		const requestInit = mockFetch.getInitFromRoute(serverBaseUrl + validateTokenPath);

		expect(requestInit.method).toBe(HttpMethod.POST);
		expect(requestInit.credentials).toBe('include');
		expect(requestInit.headers).toEqual({
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${invalidToken}`,
			'Cookie': ''
		});
		expect(isValid).toBe(false);
	});
});
