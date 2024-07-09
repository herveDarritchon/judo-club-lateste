import { HttpAuthenticatedClient } from '$lib/http/HttpAuthenticatedClient';
import { StorageService } from '$lib/storage/StorageService';
import { HttpMethod } from '$lib/http/HttpMethod';
import {
	PUBLIC_BACKEND_API_URL,
} from '$env/static/public';

export async function load({ params, fetch }) {
	const subscriptionId = params.inscription_id;
	let subscription;
	try {
		const response = await new HttpAuthenticatedClient(PUBLIC_BACKEND_API_URL, new StorageService(localStorage), fetch)
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
