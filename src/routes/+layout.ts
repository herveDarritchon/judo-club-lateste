import { HttpAuthenticatedClient } from '$lib/http/HttpAuthenticatedClient';
import { HttpMethod } from '$lib/http/HttpMethod';
import { Guest, type User } from '$lib/models/User';
import { StorageService } from '$lib/storage/StorageService';
import { redirect } from '@sveltejs/kit';

export const ssr = false;
export const prerender = false;

export async function load({ url, fetch }) {
	let currentUser: User;
	if (url.pathname !== '/login') {
		try {
			const response = await new HttpAuthenticatedClient('http://localhost:8888/judolateste', new StorageService(localStorage), fetch)
				.request('/wp-json/wp/v2/users/me', HttpMethod.GET);
			currentUser = await response.json();
		} catch (e) {
			console.warn('Erreur de récupération des infos du Current User:', e);
			redirect(307, '/login');
		}
	} else {
		currentUser = Guest;
	}
	return {
		user: currentUser
	};

}