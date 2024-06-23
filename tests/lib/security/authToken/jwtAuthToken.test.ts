import { describe, expect, it } from 'vitest';
import { JWTAuthResponse } from '$lib/security/JWTAuthResponse';
import { AuthToken, InvalidAuthToken, JWTAuthToken } from '$lib/security/authToken/JWTAuthToken';

describe('AuthToken', () => {
	it('should create a valid AuthToken', () => {
		const token = new AuthToken({ value: 'authToken', createdAt: new Date() });
		expect(token.value).toBe('authToken');
		expect(token.createdAt).toBeInstanceOf(Date);
		expect(token.isValid()).toBe(true);
	});

	it('should invalidate an old AuthToken', () => {
		const oldDate = new Date(new Date().getTime() - 11 * 60 * 1000);
		const token = new AuthToken({ value: 'authToken', createdAt: oldDate });
		expect(token.isValid()).toBe(false);
	});

	it('should invalidate an AuthToken with no value', () => {
		const token = new AuthToken({ value: '', createdAt: new Date() });
		expect(token.isValid()).toBe(false);
	});
});

describe('InvalidAuthToken', () => {
	it('should create an InvalidAuthToken', () => {
		const token = new InvalidAuthToken();
		expect(token.value).toBe('invalid-value');
		expect(token.createdAt).toBeInstanceOf(Date);
		expect(token.isValid()).toBe(false);
	});
});

describe('JWTAuthToken', () => {
	it('should create a JWTAuthToken with valid data', () => {
		const json: JWTAuthResponse = new JWTAuthResponse(new JWTAuthResponse({
				success: true,
				statusCode: 200,
				code: 'jwt_auth_valid_token',
				message: 'Valid token',
				data: {
					token: 'validToken',
					id: 1,
					email: 'user@example.com',
					nicename: 'usernicename',
					firstName: 'FirstName',
					lastName: 'LastName',
					displayName: 'DisplayName'
				}
			})
		);

		const jwtAuthToken = new JWTAuthToken(json);
		expect(jwtAuthToken.isValid()).toBe(true);
		expect(jwtAuthToken.authToken.value).toBe('validToken');
		expect(jwtAuthToken.user.email).toBe('user@example.com');
	});

	it('should throw an error with invalid data', () => {
		const json: JWTAuthResponse = new JWTAuthResponse({
			success: true,
			statusCode: 200,
			code: 'jwt_auth_valid_token',
			message: 'Valid token',
			data: []
		});

		expect(() => new JWTAuthToken(json)).toThrow('Invalid JWTAuthData');
	});

	it('should invalidate JWTAuthToken with invalid AuthToken', () => {
		const json: JWTAuthResponse = new JWTAuthResponse({
			success: true,
			statusCode: 200,
			code: 'jwt_auth_valid_token',
			message: 'Valid token',
			data: {
				token: 'invalidToken',
				id: 2,
				email: 'user@example.com',
				nicename: 'usernicename',
				firstName: 'FirstName',
				lastName: 'LastName',
				displayName: 'DisplayName'
			}
		});

		const jwtAuthToken = new JWTAuthToken(json);
		jwtAuthToken.authToken.createdAt = new Date(new Date().getTime() - 11 * 60 * 1000);

		expect(jwtAuthToken.isValid()).toBe(false);
	});
});
