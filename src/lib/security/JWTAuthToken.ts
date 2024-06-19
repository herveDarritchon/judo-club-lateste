/**
 * Interface to define the UserData
 * @interface UserData
 * @public
 */
interface UserData {
	id: number;
	email: string;
	nicename: string;
	firstName: string;
	lastName: string;
	displayName: string;
}

/**
 * Interface to define the RefreshToken
 * Represents the refresh token used to get a new JWT token
 * Duration of the token is 30 days
 * @interface RefreshToken
 * @public
 */
export interface RefreshToken {
	value: string;
	expireAt: Date;

	isValid(): boolean;

}

/**
 * Class to handle the JWT refresh token from the server
 * The refresh token is used to get a new JWT token when the current token expires
 * @export
 * @class JWTAuthRefreshToken
 * @public
 */
export class JWTAuthRefreshToken implements RefreshToken {
	value: string;
	expireAt: Date;

	/**
	 * Constructor to create a JWTAuthRefreshToken instance
	 * @param {RefreshToken} json The JSON response from the server
	 * @memberof JWTAuthRefreshToken
	 * @public
	 * @example
	 * const refreshToken = new JWTAuthRefreshToken({ value: 'refreshToken', expireAt: new Date() });
	 */
	constructor(json: RefreshToken) {
		this.value = json.value;
		this.expireAt = json.expireAt;
	}

	/**
	 * Method to check if the token is valid
	 * The token is valid if it exists, the expireAt date exists and the token has not expired
	 * @returns {boolean} True if the token is valid, false otherwise
	 * @override isValid in RefreshToken interface
	 * @memberof JWTAuthRefreshToken
	 * @public
	 */
	isValid(): boolean {
		return !!(this.value && this.expireAt && (new Date().getTime() < this.expireAt.getTime()));
	}

	/**
	 * Method to get the refresh token
	 * @returns {RefreshToken} The refresh token
	 * @memberof JWTAuthRefreshToken
	 * @public
	 */
	getRefreshToken(): RefreshToken {
		return this.value;
	}
}

/**
 * Interface to define the AuthToken
 * @interface AuthToken
 * @public
 */
export interface AuthToken {
	value: string;
	createdAt: Date;

	/**
	 * Method to check if the token is valid
	 * The token is valid if it exists and the token was created less than 10 minutes ago
	 */
	isValid(): boolean;
}

/**
 * Class to handle the JWT token from the server
 * @export
 * @class JWTAuthToken
 * @public
 */
export class JWTAuthToken implements AuthToken {
	authToken: AuthToken;
	user: UserData;

	/**
	 * Constructor to create a JWTAuthToken instance
	 * @param {JWTAuthResponse} json The JSON response from the server
	 * @memberof JWTAuthToken
	 * @public
	 */
	constructor(json: JWTAuthResponse) {
		if (json.hasJWTAuthDataResponseProps()) {
			const authData = <JWTAuthDataResponseProps>json.data;
			this.authToken = {
				value: authData.token,
				createdAt: new Date()
			};
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
		return !!(this.token && this.user && this.createdAt && (new Date().getTime() - this.createdAt.getTime()) < ((60 * 10) * 1000));
	}

	/**
	 * Method to get the token
	 * @returns {string} The token
	 * @memberof JWTAuthToken
	 * @public
	 */
	getAuthToken(): AuthToken {
		return this.authToken;
	}

	/**
	 * Method to get the user data
	 * @returns {UserData} The user data
	 * @memberof JWTAuthToken
	 * @public
	 */
	getUser(): UserData {
		return this.user;
	}
}
