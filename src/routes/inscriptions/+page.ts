import { HttpAuthenticatedClient } from '$lib/http/HttpAuthenticatedClient';
import { StorageService } from '$lib/storage/StorageService';
import { HttpMethod } from '$lib/http/HttpMethod';

export async function load({ fetch }) {
	let subscriptions;
	try {
		const response = await new HttpAuthenticatedClient('http://localhost:8888/judolateste', new StorageService(localStorage), fetch)
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