import { HttpAuthenticatedClient } from '$lib/http/HttpAuthenticatedClient';
import { StorageService } from '$lib/storage/StorageService';
import { HttpMethod } from '$lib/http/HttpMethod';
import {
	PUBLIC_BACKEND_API_URL,
} from '$env/static/public';

export async function load({ params, fetch }) {
	const membreId = params.membre_id;
	let member;
	try {
		const response = await new HttpAuthenticatedClient(PUBLIC_BACKEND_API_URL, new StorageService(localStorage), fetch)
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
