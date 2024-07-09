import { HttpAuthenticatedClient } from '$lib/http/HttpAuthenticatedClient';
import { StorageService } from '$lib/storage/StorageService';
import { HttpMethod } from '$lib/http/HttpMethod';
import type { Membre } from '$lib/data/models/Membre';
import {
	PUBLIC_BACKEND_API_URL,
} from '$env/static/public';

export async function _updateMemberData(memberId: number, updatedMember: Membre) {
	let member;
	try {
		const response = await new HttpAuthenticatedClient(PUBLIC_BACKEND_API_URL, new StorageService(localStorage), fetch)
			.request('/wp-json/associationManagement/v1/members/' + memberId, HttpMethod.PUT, updatedMember);
		member = await response.json();
	} catch (error: any) {
		const message = `Erreur de la mise à jour des infos du membre ${memberId} avec comme cause ${error.message}`;
		console.warn(message, error);
		throw new Error(message);
	}
	return {
		member
	};
}