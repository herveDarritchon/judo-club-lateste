import { JWTAuthService } from '$lib/security/JWTAuthService';

export async function load({ fetch }) {
	const deviceId = localStorage.getItem('device_id') ?? '';
	new JWTAuthService('http://localhost:8888/judolateste').createTokenFromRefreshToken(deviceId);

	const response = await fetch('http://localhost:8888/judolateste/wp-json/associationManagement/v1/members');
	const data = await response.json();

	return {
		data,
		membres: data.data,
	};
}
