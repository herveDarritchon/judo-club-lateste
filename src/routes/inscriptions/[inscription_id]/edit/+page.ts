import { HttpAuthenticatedClient } from '$lib/http/HttpAuthenticatedClient';
import { StorageService } from '$lib/storage/StorageService';
import { HttpMethod } from '$lib/http/HttpMethod';
import type { Inscription } from '$lib/data/models/Inscription';

export async function _updateSubscriptionData(subscriptionId: number, updatedSubscription: Inscription) {
	let subscription;
	try {
		const response = await new HttpAuthenticatedClient('http://localhost:8888/judolateste', new StorageService(localStorage), fetch)
			.request('/wp-json/associationManagement/v1/subscriptions/' + subscriptionId, HttpMethod.PUT, updatedSubscription);
		subscription = await response.json();
	} catch (error: any) {
		const message = `Erreur de la mise à jour des infos de l'inscription ${subscriptionId} avec comme cause ${error.message}`;
		console.warn(message, error);
		throw new Error(message);
	}
	return {
		subscription
	};
}