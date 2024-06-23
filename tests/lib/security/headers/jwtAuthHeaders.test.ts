import { beforeEach, describe, expect, it } from 'vitest';
import type { JWTAuthHeadersProps } from '$lib/security/header/JWTAuthHeader';
import { JWTAuthHeaders } from '$lib/security/header/JWTAuthHeader';

describe('JWTAuthHeaders', () => {
	let headersInstance: JWTAuthHeaders;

	beforeEach(() => {
		headersInstance = new JWTAuthHeaders();
	});

	it('should initialize with default headers', () => {
		const defaultHeaders: JWTAuthHeadersProps = {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		};
		expect(headersInstance.getHeaders()).toEqual(defaultHeaders);
	});

	it('should initialize with provided headers and default headers', () => {
		const initialHeaders: JWTAuthHeadersProps = {
			'Authorization': 'Bearer token'
		};
		headersInstance = new JWTAuthHeaders(initialHeaders);
		const expectedHeaders: JWTAuthHeadersProps = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer token'
		};
		expect(headersInstance.getHeaders()).toEqual(expectedHeaders);
	});

	it('should set a header correctly', () => {
		headersInstance.setHeader('Authorization', 'Bearer token');
		const expectedHeaders: JWTAuthHeadersProps = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer token'
		};
		expect(headersInstance.getHeaders()).toEqual(expectedHeaders);
	});

	it('should overwrite an existing header correctly', () => {
		headersInstance.setHeader('Content-Type', 'text/plain');
		const expectedHeaders: JWTAuthHeadersProps = {
			'Content-Type': 'text/plain',
			'Accept': 'application/json'
		};
		expect(headersInstance.getHeaders()).toEqual(expectedHeaders);
	});
});
