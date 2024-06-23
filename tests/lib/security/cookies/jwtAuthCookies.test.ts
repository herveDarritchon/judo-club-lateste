import { describe, expect, it } from 'vitest';
import { JWTAuthCookies, JWTAuthNoCookies } from '$lib/security/cookie/JWTAuthCookie';

// Tests for JWTAuthCookies
describe('JWTAuthCookies', () => {
	it('should create an instance with no cookies when no arguments are passed', () => {
		const cookies = new JWTAuthCookies();
		expect(cookies.getCookieString()).toBe('');
	});

	it('should create an instance with initial cookies when an object is passed', () => {
		const cookies = new JWTAuthCookies({ 'cookie1': 'value1', 'cookie2': 'value2' });
		expect(cookies.getCookieString()).toBe('cookie1=value1; cookie2=value2');
	});

	it('should create an instance with a single cookie when name and value are passed', () => {
		const cookies = new JWTAuthCookies('cookie1', 'value1');
		expect(cookies.getCookieString()).toBe('cookie1=value1');
	});

	it('should set a new cookie', () => {
		const cookies = new JWTAuthCookies();
		cookies.setCookie('cookie1', 'value1');
		expect(cookies.getCookieString()).toBe('cookie1=value1');
	});

	it('should override an existing cookie', () => {
		const cookies = new JWTAuthCookies({ 'cookie1': 'value1' });
		cookies.setCookie('cookie1', 'new_value');
		expect(cookies.getCookieString()).toBe('cookie1=new_value');
	});
});

// Tests for JWTAuthNoCookies
describe('JWTAuthNoCookies', () => {
	it('should create an instance with no cookies', () => {
		const noCookies = new JWTAuthNoCookies();
		expect(noCookies.getCookieString()).toBe('');
	});
});
