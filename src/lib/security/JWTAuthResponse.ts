/**
 * Interface to define the JWTAuthDataResponseProps properties of the JWTAuthResponse class
 * The payload of the JWT Response from the server with the token and user data
 * @interface JWTAuthDataResponseProps
 * @public
 */
export interface JWTAuthDataResponseProps {
	token: string;
	id: number;
	email: string;
	nicename: string;
	firstName: string;
	lastName: string;
	displayName: string;
}

/**
 * Interface to define the JWTAuthResponseProps properties of the JWTAuthResponse class
 * Response from the server with the technical details and the payload
 */
export interface JWTAuthResponseProps {
	success: boolean;
	statusCode: number;
	code: string;
	message: string;
	data: JWTAuthDataResponseProps | unknown[];
}

/**
 * Class to handle the JWT token from the server
 * @export
 * @class JWTAuthResponse
 * @public
 */
export class JWTAuthResponse {
	success: boolean;
	statusCode: number;
	code: string;
	message: string;
	data: JWTAuthDataResponseProps | unknown[];

	/**
	 * Constructor to create a JWTAuthResponse instance
	 * @param json
	 * @memberof JWTAuthResponse
	 * @public
	 */
	constructor(json: JWTAuthResponseProps) {
		this.success = json.success;
		this.statusCode = json.statusCode;
		this.code = json.code;
		this.message = json.message;
		this.data = json.data;
	}

	/**
	 * Method to check if the response is valid
	 * @returns boolean - True if the response is valid and false otherwise
	 * @public
	 */
	isValid(): boolean {
		return this.success && this.statusCode === 200 && this.code === 'jwt_auth_valid_token';
	}

	/**
	 * Method to check if the response has unknown data
	 * @returns boolean - True if the response has unknown data and false otherwise
	 * @public
	 */
	hasUnknonwData(): boolean {
		return this.isArray(this.data);
	}

	/**
	 * Method to check if the response has JWTAuthData
	 * @returns boolean - True if the response has JWTAuthData and false otherwise
	 * @public
	 */
	hasJWTAuthDataResponseProps(): boolean {
		return this.isJWTAuthDataResponseProps(this.data);
	}

	/**
	 * Method to check if the data is an array
	 * @param data - The data to check
	 * @private
	 */
	private isArray(data: unknown): data is unknown[] {
		return Array.isArray(data);
	}

	/**
	 * Method to check if the data is JWTAuthDataResponseProps
	 * @param data
	 * @private
	 */
	private isJWTAuthDataResponseProps(data: unknown): data is JWTAuthDataResponseProps {
		return !!(data && typeof data === 'object' && 'token' in data && 'user' in data);
	}

	/**
	 * Method to get the message from the server response
	 * @returns string - The message from the server response
	 * @public
	 */
	getMessage(): string {
		return this.message;
	}
}