/**
 * Interface to define the RefreshToken
 * Represents the refresh token used to get a new JWT token
 * @interface RefreshTokenProps
 * @public
 */
export interface RefreshTokenProps {
	value: string;
	expireAt: Date;
}

/**
 * Class to define the RefreshToken
 * Represents the refresh token used to get a new JWT token
 * Duration of the token is 30 days
 * @interface RefreshToken
 * @public
 */
export class RefreshToken {
	value: string;
	expireAt: Date;

	constructor(json: RefreshTokenProps) {
		this.value = json.value;
		this.expireAt = new Date(json.expireAt);
	}

	isValid(): boolean {
		return !!(this.value && this.expireAt && (new Date().getTime() < this.expireAt.getTime()));
	}

}

/**
 * Class to handle an invalid AuthToken
 * @class InvalidAuthToken
 * @extends {AuthToken}
 * @export
 * @public
 */
export class InvalidRefreshToken extends RefreshToken {
	constructor() {
		const minimumDatePossible = new Date(-8640000000000000);
		super({
			value: 'invalid-value', expireAt: minimumDatePossible
		});
	}

	isValid(): boolean {
		return false;
	}
}

/**
 * Class to handle the JWT refresh token from the server
 * The refresh token is used to get a new JWT token when the current token expires
 * @export
 * @class JWTAuthRefreshTokenService
 * @public
 */
export class JWTAuthRefreshTokenService {
	value: string;
	expireAt: Date;

	/**
	 * Constructor to create a JWTAuthRefreshToken instance
	 * @param {RefreshToken} json The JSON response from the server
	 * @memberof JWTAuthRefreshTokenService
	 * @public
	 * @example
	 * const refreshToken = new JWTAuthRefreshToken({ value: 'refreshToken', expireAt: new Date() });
	 */
	constructor(json: RefreshTokenProps) {
		this.value = json.value;
		this.expireAt = json.expireAt;
	}

	/**
	 * Method to check if the token is valid
	 * The token is valid if it exists, the expireAt date exists and the token has not expired
	 * @returns {boolean} True if the token is valid, false otherwise
	 * @override isValid in RefreshToken interface
	 * @memberof JWTAuthRefreshTokenService
	 * @public
	 */
	isValid(): boolean {
		return !!(this.value && this.expireAt && (new Date().getTime() < this.expireAt.getTime()));
	}

	/**
	 * Method to get the refresh token
	 * @returns {RefreshToken} The refresh token
	 * @memberof JWTAuthRefreshTokenService
	 * @public
	 */
	getRefreshToken(): RefreshToken {
		return this;
	}
}