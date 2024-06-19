export async function load() {
	return {
		refreshToken: localStorage.getItem('refresh_token') ?? ''
	};
}