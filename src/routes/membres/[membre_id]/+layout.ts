import { HttpAuthenticatedClient } from '$lib/http/HttpAuthenticatedClient';
import { StorageService } from '$lib/storage/StorageService';
import { HttpMethod } from '$lib/http/HttpMethod';

export async function load({ params, fetch }) {
	const membreId = params.membre_id;
	let member;
	try {
		const response = await new HttpAuthenticatedClient('http://localhost:8888/judolateste', new StorageService(localStorage), fetch)
			.request('/wp-json/associationManagement/v1/members/' + membreId, HttpMethod.GET);
		member = await response.json();
	} catch (error: any) {
		const message = `Erreur de récupération des infos du membre ${membreId} avec comme cause ${error.message}`;
		console.warn(message, error);
		throw new Error(message);
	}
	return {
		member
	};
}
