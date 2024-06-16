export async function load({ fetch }) {
	const response = await fetch('http://localhost:8888/judolateste/wp-json/associationManagement/v1/subscriptions');
	const data = await response.json();

	return {
			data,
		inscriptions: data.data,
	};
}
