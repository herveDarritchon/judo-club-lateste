import { HttpAuthenticatedClient } from '$lib/http/HttpAuthenticatedClient';
import { HttpMethod } from '$lib/http/HttpMethod';
import { StorageService } from '$lib/storage/StorageService';
import {
	PUBLIC_BACKEND_API_URL,
} from '$env/static/public';

export async function load({ fetch }) {
	let members;
	try {
		const response = await new HttpAuthenticatedClient(PUBLIC_BACKEND_API_URL, new StorageService(localStorage), fetch)
			.request('/wp-json/associationManagement/v1/members', HttpMethod.GET);
		members = await response.json();
	} catch (e) {
		console.warn('Erreur de récupération des infos du Current User:', e);
		members = [];
	}
	return {
		members
	};
}
