import type { JWTAuthDataResponseProps, JWTAuthResponse } from '$lib/security/JWTAuthResponse';
import type { UserData } from '$lib/security/user/UserData';

/**
 * Interface to define the AuthTokenProps
 * @interface AuthTokenProps
 * @public
 */
export interface AuthTokenProps {
	value: string;
	createdAt: Date;
}

/**
 * Class to define the AuthToken
 * @class AuthToken
 * @public
 */
export class AuthToken {
	value: string;
	createdAt: Date;

	/**
	 * Constructor to create an AuthToken instance
	 * @param {AuthTokenProps} json The JSON response from the server
	 * @param json
	 * @memberof AuthToken
	 * @public
	 * @example
	 * const authToken = new AuthToken({ value: 'authToken', createdAt: new Date() });
	 */
	constructor(json: AuthTokenProps) {
		this.value = json.value;
		this.createdAt = json.createdAt;
	}

	/**
	 * Method to check if the token is valid
	 * The token is valid if it exists and the token was created less than 10 minutes ago
	 * @returns {boolean} True if the token is valid, false otherwise
	 * @public
	 */
	isValid(): boolean {
		return !!(this.value && this.createdAt && (new Date().getTime() - this.createdAt.getTime()) < ((60 * 10) * 1000));
	}
}

/**
 * Class to handle an invalid AuthToken
 * @class InvalidAuthToken
 * @extends {AuthToken}
 * @export
 * @public
 */
export class InvalidAuthToken extends AuthToken {
	constructor() {
		super({
			value: 'invalid-value', createdAt: new Date

			()
		});
	}

	/**
	 * @override isValid in AuthToken interface
	 * @returns {boolean} False
	 * @memberof InvalidAuthToken
	 * @public
	 */
	isValid(): boolean {
		return false;
	}
}

/**
 * Class to handle the JWT token from the server
 * @export
 * @class JWTAuthToken
 * @public
 */
export class JWTAuthToken {
	/**
	 * Property to store the token
	 * @type {AuthToken}
	 * @memberof JWTAuthToken
	 * @public
	 * @example
	 * const authToken = new AuthToken({ value: 'authToken', createdAt: new Date() });
	 */
	readonly authToken: AuthToken;
	/**
	 * Property to store the user data
	 * @type {UserData}
	 * @memberof JWTAuthToken
	 * @public
	 * @example
	 * {
	 * 	id: 1,
	 * 	email: 'email',
	 * 	nicename: 'nicename',
	 * 	firstName: 'firstName',
	 * 	lastName: 'lastName',
	 * 	displayName: 'displayName'
	 * }
	 */
	readonly user: UserData;

	/**
	 * Constructor to create a JWTAuthToken instance
	 * @param {JWTAuthResponse} json The JSON response from the server
	 * @memberof JWTAuthToken
	 * @public
	 */
	constructor(json: JWTAuthResponse) {
		if (json.hasJWTAuthDataResponseProps()) {
			const authData = <JWTAuthDataResponseProps>json.data;
			this.authToken = new AuthToken({
				value: authData.token,
				createdAt: new Date()
			});
			this.user = {
				id: authData.id,
				email: authData.email,
				nicename: authData.nicename,
				firstName: authData.firstName,
				lastName: authData.lastName,
				displayName: authData.displayName
			};
		} else {
			throw new Error('Invalid JWTAuthData');
		}
	}

	/**
	 * @override isValid in AuthToken interface
	 */
	isValid(): boolean {
		return (this.authToken && this.user && this.authToken.isValid());
	}
}
