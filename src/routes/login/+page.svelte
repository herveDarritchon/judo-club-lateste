<script lang="ts">
	import { setError, setMessage, superForm } from 'sveltekit-superforms';
	import { _userSchema } from './+page.js';
	import { zod } from 'sveltekit-superforms/adapters';
	import { HttpAuthenticatedClient } from '$lib/http/HttpAuthenticatedClient';
	import {
		PUBLIC_BACKEND_API_URL,
	} from '$env/static/public';
	import { goto } from '$app/navigation';

	export let data;

	const { form, errors, message, constraints, enhance } = superForm(
		data.form,
		{
			SPA: true,
			validators: zod(_userSchema),
			async onUpdate({ form }) {
				// Form validation
				if (form.data.email.includes('spam')) {
					setError(form, 'email', 'Suspicious email address.');
				} else if (form.valid) {
					await new HttpAuthenticatedClient(PUBLIC_BACKEND_API_URL).createTokenFromCredentials(form.data.email, form.data.password);
					await goto('/');
				}
			}
		}
	);

</script>

{#if $message}<h3>{$message}</h3>{/if}
<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<img class="mx-auto h-24 w-auto" src="/logo-app.webp"
				 alt="Club Sensei">
		<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Connectez-vous à votre compte</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form class="space-y-6" method="POST" use:enhance>
			<div>
				<label for="email" class="block text-xs font-medium leading-6 ">Adresse email</label>
				<div class="mt-2">
					<input id="email" name="email" type="email" autocomplete="email" required
								 class="block text-gray-900 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
								 bind:value={$form.email}>
				</div>
			</div>

			<div>
				<div class="flex items-center justify-between">
					<label for="password" class="block text-xs font-medium leading-6">Mot de passe</label>
				</div>
				<div class="mt-2">
					<input id="password" name="password" type="password" autocomplete="current-password" required
								 class="block text-gray-900 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
								 bind:value={$form.password}>
				</div>
			</div>

			<div>
				<button type="submit"
								class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
					Connexion
				</button>
			</div>
		</form>
	</div>
</div>