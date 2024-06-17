
import type { State } from '@vincjo/datatables/remote';
import type { Inscription } from '$lib/data/models/Inscription';
import type { Membre } from '$lib/data/models/Membre';
import { error } from '@sveltejs/kit';

export const reloadInscription = async (state: State) : Promise<Inscription[]> => {
	const response = await fetch(`http://localhost:8888/judolateste/wp-json/associationManagement/v1/subscriptions`);
	return response.json();
};

export const reloadMembre = async (state: State) : Promise<Membre[]> => {
	const response = await fetch(`http://localhost:8888/judolateste/wp-json/associationManagement/v1/members`);
	return response.json();
};

export const createToken = async (username: string, password: string) : Promise<String> => {
	const response = await fetch('http://localhost:8888/judolateste/wp-json/jwt-auth/v1/token', {
		method: 'POST',
		body:  JSON.stringify({ username, password }),
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	});

	if (response.status >= 400) throw error(response.status);

	let tokenResponse = await response.json();
	console.log(tokenResponse);

	return tokenResponse.data.token;
};

const getParams = (state: State) => {
	const { pageNumber, rowsPerPage, sort, filters, search } = state;

	let params = `_page=${pageNumber}`;

	if (rowsPerPage) {
		params += `&_limit=${rowsPerPage}`;
	}
	if (sort) {
		params += `&_sort=${sort.orderBy}&_order=${sort.direction}`;
	}
	if (filters) {
		params += filters.map(({ filterBy, value }) => `&${filterBy}=${value}`).join();
	}
	if (search) {
		params += `&q=${search}`;
	}
	return params;
};
