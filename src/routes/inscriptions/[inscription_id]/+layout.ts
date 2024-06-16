import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const response = await fetch('http://localhost:8888/judolateste/wp-json/associationManagement/v1/subscriptions/' + params.inscription_id);

	if (response.status >= 400) {
		throw error(response.status, response.statusText);
	}

	const data = await response.json();

	return {
		data,
		inscription: data.data
	};
}
