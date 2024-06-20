/**
 * JWTAuthCookiesProps: Interface to define the properties of the JWTAuthCookies
 * Represents the cookies of the JWTAuthRequest
 * @interface JWTAuthCookiesProps
 * @public
 * @export
 * @example
 * {
 * 	'cookie1': 'value1',
 * 	'cookie2': 'value2'
 * }
 */
export interface JWTAuthCookiesProps {
	[key: string]: string;
}

/**
 * JWTAuthCookies: Class to handle the cookies of the JWTAuthRequest
 * @class JWTAuthCookies - Class to handle the cookies of the JWTAuthRequest
 * @public
 * @export
 * @example
 * const cookies = new JWTAuthCookies({ 'cookie1': 'value1', 'cookie2': 'value2' });
 */
export class JWTAuthCookies {
	private readonly cookies: JWTAuthCookiesProps;

	/**
	 * Constructor to create a JWTAuthCookies instance
	 * The cookies are stored in a key-value pair
	 * Several constructors are available:
	 * - JWTAuthCookies()
	 * - JWTAuthCookies({ 'cookie1': 'value1', 'cookie2': 'value2' })
	 * - JWTAuthCookies('cookie1', 'value1')
	 * @param {JWTAuthCookiesProps} initialCookies The initial cookies of the JWTAuthCookies
	 * @memberof JWTAuthCookies
	 * @param initialCookies - The initial cookies of the JWTAuthCookies
	 * The cookies are stored in a key-value pair
	 * @public
	 */
	constructor(initialCookies?: JWTAuthCookiesProps);
	constructor(name?: string, value?: string);
	constructor(initialCookiesOrName?: JWTAuthCookiesProps | string, value?: string) {
		if (typeof initialCookiesOrName === 'string' && typeof value === 'string') {
			this.cookies = { [initialCookiesOrName]: value };
		} else if (typeof initialCookiesOrName === 'object') {
			this.cookies = { ...initialCookiesOrName };
		} else {
			this.cookies = {};
		}
	}

	/**
	 * Method to set the cookie
	 * @param name - The name of the cookie
	 * @param value - The value of the cookie
	 */
	setCookie(name: string, value: string): void {
		this.cookies[name] = value;
	}

	/**
	 * Method to get the cookies as a string
	 * @returns The value of the cookie
	 */
	getCookieString(): string {
		return Object.entries(this.cookies)
			.map(([name, value]) => `${name}=${value}`)
			.join('; ');
	}
}

/**
 * JWTAuthRequest: Class to handle the JWTAuthNoCookies request, a request without cookies
 * @class JWTAuthNoCookies - Class to handle the JWTAuthNoCookies request
 * @extends {JWTAuthCookies}
 * @public
 * @export
 * @example
 * const request = new JWTAuthCookies({ });
 */
export class JWTAuthNoCookies extends JWTAuthCookies {
	constructor() {
		super();
	}
}