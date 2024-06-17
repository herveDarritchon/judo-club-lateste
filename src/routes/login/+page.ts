import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

export const _userSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
});

export const load = async ({ params, fetch }) => {

	/*	const request = await fetch(
			`https://jsonplaceholder.typicode.com/users/`
		);
		if (request.status >= 400) throw error(request.status);

		const userData = await request.json();*/
	const userData = {};

	const form = await superValidate(userData, zod(_userSchema));

	return { form };
};