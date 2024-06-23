import { HttpAuthenticatedClient } from '$lib/http/HttpAuthenticatedClient';
import { HttpMethod } from '$lib/http/HttpMethod';
import { StorageService } from '$lib/storage/StorageService';

export async function load({ fetch }) {
	let members;
	try {
		const response = await new HttpAuthenticatedClient('http://localhost:8888/judolateste', new StorageService(localStorage), fetch)
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
