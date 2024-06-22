import { describe, it, expect } from 'vitest';
import { JWTAuthBody, type JWTAuthBodyProps } from '$lib/security/body/JWTAuthBody';

// Tests for JWTAuthBodyProps interface (Although it's just a type interface and doesn't require direct testing, we will test its usage indirectly via JWTAuthBody)

describe('JWTAuthBody', () => {
	it('should create an instance with all properties defined', () => {
		const bodyProps: JWTAuthBodyProps = {
			username: 'testUser',
			password: 'testPassword',
			device: 'testDevice'
		};

		const body = new JWTAuthBody(bodyProps);

		expect(body.username).toBe('testUser');
		expect(body.password).toBe('testPassword');
		expect(body.device).toBe('testDevice');
	});

	it('should create an instance with some properties undefined', () => {
		const bodyProps: JWTAuthBodyProps = {
			username: 'testUser',
			password: undefined,
			device: 'testDevice'
		};

		const body = new JWTAuthBody(bodyProps);

		expect(body.username).toBe('testUser');
		expect(body.password).toBeUndefined();
		expect(body.device).toBe('testDevice');
	});

	it('should create an instance with no properties defined', () => {
		const bodyProps: JWTAuthBodyProps = {};

		const body = new JWTAuthBody(bodyProps);

		expect(body.username).toBeUndefined();
		expect(body.password).toBeUndefined();
		expect(body.device).toBeUndefined();
	});

	it('should maintain default values if no props are provided', () => {
		const body = new JWTAuthBody({});

		expect(body.username).toBeUndefined();
		expect(body.password).toBeUndefined();
		expect(body.device).toBeUndefined();
	});

	it('should override default values if props are provided', () => {
		const body = new JWTAuthBody({ username: 'newUser', password: 'newPassword', device: 'newDevice' });

		expect(body.username).toBe('newUser');
		expect(body.password).toBe('newPassword');
		expect(body.device).toBe('newDevice');
	});
});
