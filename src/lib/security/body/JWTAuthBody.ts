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