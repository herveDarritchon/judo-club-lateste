import { HttpAuthenticatedClient } from '$lib/http/HttpAuthenticatedClient';
import { StorageService } from '$lib/storage/StorageService';
import { HttpMethod } from '$lib/http/HttpMethod';
import {
	PUBLIC_BACKEND_API_URL,
} from '$env/static/public';

export async function load({ fetch }) {
	let subscriptions;
	try {
		const response = await new HttpAuthenticatedClient(PUBLIC_BACKEND_API_URL, new StorageService(localStorage), fetch)
			.request('/wp-json/associationManagement/v1/subscriptions', HttpMethod.GET);
		subscriptions = await response.json();
	} catch (e) {
		console.error('Erreur de récupération des infos du Current User:', e);
		subscriptions = [];
	}
	return {
		subscriptions
	};
}