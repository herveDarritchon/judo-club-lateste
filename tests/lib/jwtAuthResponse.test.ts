import { describe, it, expect } from 'vitest';
import {
	type JWTAuthDataResponseProps,
	JWTAuthResponse,
	type JWTAuthResponseProps
} from '$lib/security/JWTAuthResponse';

// Mock data for testing
const validJWTAuthDataResponse: JWTAuthDataResponseProps = {
	token: 'valid_token',
	id: 1,
	email: 'test@example.com',
	nicename: 'testuser',
	firstName: 'Test',
	lastName: 'User',
	displayName: 'Test User',
};

const validJWTAuthResponseProps: JWTAuthResponseProps = {
	success: true,
	statusCode: 200,
	code: 'jwt_auth_valid_token',
	message: 'Token is valid',
	data: validJWTAuthDataResponse,
};

const invalidJWTAuthResponseProps: JWTAuthResponseProps = {
	success: false,
	statusCode: 401,
	code: 'jwt_auth_invalid_token',
	message: 'Token is invalid',
};

describe('JWTAuthResponse', () => {
	it('should create an instance of JWTAuthResponse', () => {
		const response = new JWTAuthResponse(validJWTAuthResponseProps);
		expect(response).toBeInstanceOf(JWTAuthResponse);
	});

	it('should return true for a valid response', () => {
		const response = new JWTAuthResponse(validJWTAuthResponseProps);
		expect(response.isValid()).toBe(true);
	});

	it('should return false for an invalid response', () => {
		const response = new JWTAuthResponse(invalidJWTAuthResponseProps);
		expect(response.isValid()).toBe(false);
	});

	it('should return true if the response has JWTAuthDataResponseProps', () => {
		const response = new JWTAuthResponse(validJWTAuthResponseProps);
		expect(response.hasJWTAuthDataResponseProps()).toBe(true);
	});

	it('should return false if the response does not have JWTAuthDataResponseProps', () => {
		const response = new JWTAuthResponse(invalidJWTAuthResponseProps);
		expect(response.hasJWTAuthDataResponseProps()).toBe(false);
	});

	it('should return the correct message', () => {
		const response = new JWTAuthResponse(validJWTAuthResponseProps);
		expect(response.getMessage()).toBe('Token is valid');
	});

	it('should correctly identify JWTAuthDataResponseProps type', () => {
		const response = new JWTAuthResponse(validJWTAuthResponseProps);
		// Accessing the private method through any type
		const isJWTAuthDataResponseProps = (response as any).isJWTAuthDataResponseProps(validJWTAuthDataResponse);
		expect(isJWTAuthDataResponseProps).toBe(true);
	});

	it('should return false for incorrect JWTAuthDataResponseProps type', () => {
		const response = new JWTAuthResponse(validJWTAuthResponseProps);
		// Accessing the private method through any type
		const isJWTAuthDataResponseProps = (response as any).isJWTAuthDataResponseProps({});
		expect(isJWTAuthDataResponseProps).toBe(false);
	});
});
