/**
 * JWTAuthHeadersProps: Interface for the headers of the JWTAuthRequest
 * Store the headers of the JWTAuthRequest
 * @interface JWTAuthHeadersProps
 * @public
 * @export
 * @example
 * {
 * 	'Content-Type': 'application/json',
 * 	'Accept': 'application/json',
 * 	'Authorization ': 'Bearer token'
 * }
 */
export interface JWTAuthHeadersProps {
	[key: string]: string;
}

/**
 * JWTAuthBodyProps: Interface for the body of the JWTAuthRequest
 * Store the body of the JWTAuthRequest
 * @interface JWTAuthBodyProps
 * @public
 * @export
 * @example
 * {
 * 	username: 'username',
 * 	password: 'password',
 * 	device: 'device'
 * }
 */
export interface JWTAuthBodyProps {
	username?: string;
	password?: string;
	device?: string;
}

/**
 * JWTAuthBody: Class to handle the body of the JWTAuthRequest
 * @class JWTAuthBody - Class to handle the body of the JWTAuthRequest
 * @public
 * @export
 * @example
 * const body = new JWTAuthBody({ username: 'username', password: 'password', device: 'device' });
 *
 */
export class JWTAuthBody {
	username?: string;
	password?: string;
	device?: string;

	/**
	 * Constructor to create a JWTAuthBody instance
	 * @param bodyProps - The properties of the JWTAuthBody
	 */
	constructor(bodyProps: JWTAuthBodyProps) {
		this.username = bodyProps.username ?? this.username;
		this.password = bodyProps.password ?? this.password;
		this.device = bodyProps.device ?? this.device;
	}
}

/**
 * JWTAuthHeaders: Class to handle the headers of the JWTAuthRequest
 * @class JWTAuthHeaders - Class to handle the headers of the JWTAuthRequest
 * @public
 * @export
 * @example
 * const headers = new JWTAuthHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
 */
export class JWTAuthHeaders {
	private readonly headers: JWTAuthHeadersProps;

	/**
	 * Constructor to create a JWTAuthHeaders instance
	 * @param initialHeaders - The initial headers of the JWTAuthHeaders added to the default headers
	 * Content-Type and Accept headers are set by default to 'application/json'
	 */
	constructor(initialHeaders: JWTAuthHeadersProps = {}) {
		this.headers = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			...initialHeaders
		};
	}

	/**
	 * Method to set the headers to the existing headers
	 * @param key - The key of the header
	 * @param value - The value of the header
	 */
	setHeader(key: string, value: string): void {
		this.headers[key] = value;
	}

	/**
	 * Method to get all the headers available
	 * @returns The headers
	 */
	getHeaders(): JWTAuthHeadersProps {
		return this.headers;
	}
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
	private readonly cookies: { [key: string]: string } = {};

	/**
	 * Constructor to create a JWTAuthCookies instance
	 * @param initialCookies - The initial cookies of the JWTAuthCookies
	 * The cookies are stored in a key-value pair
	 * @public
	 */
	constructor(initialCookies?: { [key: string]: string }) {
		if (initialCookies) {
			this.cookies = { ...initialCookies };
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