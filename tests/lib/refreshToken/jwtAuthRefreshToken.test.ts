import { describe, it, expect } from 'vitest';
import { InvalidRefreshToken, JWTAuthRefreshTokenService, RefreshToken } from '$lib/security/refreshToken/JWTRefreshToken';
import type { RefreshTokenProps } from '$lib/security/refreshToken/JWTRefreshToken';

// Define a past date for testing expired tokens
const pastDate = new Date(Date.now() - 1000);
// Define a future date for testing valid tokens
const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

describe('RefreshToken Class', () => {
	it('should create a valid RefreshToken', () => {
		const tokenProps: RefreshTokenProps = { value: 'valid-token', expireAt: futureDate };
		const refreshToken = new RefreshToken(tokenProps);

		expect(refreshToken.value).toBe('valid-token');
		expect(refreshToken.expireAt).toStrictEqual(futureDate);
		expect(refreshToken.isValid()).toBe(true);
	});

	it('should create an expired RefreshToken', () => {
		const tokenProps: RefreshTokenProps = { value: 'expired-token', expireAt: pastDate };
		const refreshToken = new RefreshToken(tokenProps);

		expect(refreshToken.isValid()).toBe(false);
	});

	it('should create an invalid RefreshToken when no value or expireAt is provided', () => {
		const tokenProps: RefreshTokenProps = { value: '', expireAt: futureDate };
		const refreshToken = new RefreshToken(tokenProps);

		expect(refreshToken.isValid()).toBe(false);
	});
});

describe('InvalidRefreshToken Class', () => {
	it('should create an InvalidRefreshToken', () => {
		const invalidToken = new InvalidRefreshToken();

		expect(invalidToken.value).toBe('invalid-value');
		expect(invalidToken.isValid()).toBe(false);
	});
});

describe('JWTAuthRefreshToken Class', () => {
	it('should create a valid JWTAuthRefreshToken', () => {
		const tokenProps: RefreshTokenProps = { value: 'jwt-valid-token', expireAt: futureDate };
		const jwtRefreshToken = new JWTAuthRefreshTokenService(tokenProps);

		expect(jwtRefreshToken.value).toBe('jwt-valid-token');
		expect(jwtRefreshToken.expireAt).toBe(futureDate);
		expect(jwtRefreshToken.isValid()).toBe(true);
	});

	it('should create an expired JWTAuthRefreshToken', () => {
		const tokenProps: RefreshTokenProps = { value: 'jwt-expired-token', expireAt: pastDate };
		const jwtRefreshToken = new JWTAuthRefreshTokenService(tokenProps);

		expect(jwtRefreshToken.isValid()).toBe(false);
	});

	it('should get the refresh token from JWTAuthRefreshToken', () => {
		const tokenProps: RefreshTokenProps = { value: 'jwt-valid-token', expireAt: futureDate };
		const jwtRefreshToken = new JWTAuthRefreshTokenService(tokenProps);

		const refreshToken = jwtRefreshToken.getRefreshToken();

		expect(refreshToken.value).toBe('jwt-valid-token');
		expect(refreshToken.expireAt).toBe(futureDate);
	});
});
