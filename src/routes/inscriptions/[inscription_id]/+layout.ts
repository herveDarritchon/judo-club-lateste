import { HttpAuthenticatedClient } from '$lib/http/HttpAuthenticatedClient';
import { StorageService } from '$lib/storage/StorageService';
import { HttpMethod } from '$lib/http/HttpMethod';

export async function load({ params, fetch }) {
	const subscriptionId = params.inscription_id;
	let subscription;
	try {
		const response = await new HttpAuthenticatedClient('http://localhost:8888/judolateste', new StorageService(localStorage), fetch)
			.request('/wp-json/associationManagement/v1/subscriptions/' + subscriptionId, HttpMethod.GET);
		subscription = await response.json();
	} catch (error: any) {
		const message = `Erreur de récupération des infos de l'inscription ${subscriptionId} avec comme cause ${error.message}`;
		console.error(message, error);
		throw new Error(message);
	}
	return {
		subscription
	};
}
