import { HttpAuthenticatedClient } from '$lib/http/HttpAuthenticatedClient';
import { HttpMethod } from '$lib/http/HttpMethod';
import { Guest, type User } from '$lib/models/User';
import { StorageService } from '$lib/storage/StorageService';

export const ssr = false;
export const prerender = false;

export async function load({ fetch }) {
	let currentUser: User;
	try {
		const response = await new HttpAuthenticatedClient('http://localhost:8888/judolateste', new StorageService(localStorage), fetch)
			.request('/wp-json/wp/v2/users/me', HttpMethod.GET);
		currentUser = await response.json();
	} catch (e) {
		console.warn('Erreur de récupération des infos du Current User:', e);
		currentUser = Guest;
	}
	return {
		user: currentUser
	};

}