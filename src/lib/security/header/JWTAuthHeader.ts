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