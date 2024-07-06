<script lang="ts">
	import ContactSVG from '$lib/components/svg/ContactSVG.svelte';
	import TelephoneNumberSVG from '$lib/components/svg/TelephoneNumberSVG.svelte';
	import DateCalendarSVG from '$lib/components/svg/DateCalendarSVG.svelte';
	import { _updateSubscriptionData } from './+page';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { Inscription } from '$lib/data/models/Inscription';

	export let data;
	export let subscription: Inscription = data.subscription.data;

	const toastStore = getToastStore();

	let updatedSubscription = { ...subscription };

	async function handleSubmit(event) {
		event.preventDefault();
		let t: ToastSettings;
		try {
			const updated = await _updateSubscriptionData(subscription.id, updatedSubscription);
			// Handle the response, e.g., show a success message or redirect
			const updateData = updated.subscription.data;
			t = {
				message: 'Mise à jour réussie pour l\'inscription de ' + updateData.subscription_name,
				background: 'variant-filled-primary',
				hideDismiss: true,
				timeout: 3000
			};
		} catch (e: any) {
			const errorMessage = 'Erreur lors de la Mise à jour de l\'inscription ' + updatedSubscription.subscription_name;
			console.error(errorMessage, e)
			t = {
				message: errorMessage,
				background: 'variant-filled-error',
				hideDismiss: true,
				timeout: 3000
			};
		}
		toastStore.trigger(t);
	}
</script>

<div class="space-y-10">
	<!-- Header -->
	<header class="flex justify-between items-center">
		<h1 class="h1">Modifie l'inscription</h1>
		<i class="fa-solid fa-person text-6xl"></i>
	</header>
	<!-- Divider -->
	<hr />
	<!-- Component -->

	<div class="container mx-auto p-4">
		<form on:submit={handleSubmit} class="shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
			<h1 class="text-2xl font-bold mb-4 col-span-1 md:col-span-2">Éditer les informations
				de {subscription.subscription_name}</h1>

			<div class="mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="subscription_name">Nom du l'inscription</label>
				<input type="text" id="subscription_name" bind:value={updatedSubscription.subscription_name}
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="licence_renewal_type">Type de Licence</label>
				<select id="sex" bind:value={updatedSubscription.licence_renewal_type}
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option value="Première">Première</option>
					<option value="Renouvellement">Renouvellement</option>
				</select>
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="birthday">Date de Naissance</label>
				<div class="relative max-w-sm">
					<DateCalendarSVG cssClass="w-5 h-5 text-gray-200 dark:text-gray-400" />
					<input type="text" id="birthday"
								 bind:value={updatedSubscription.birthday}
								 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
				</div>
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="sex">Sexe</label>
				<select id="sex" bind:value={updatedSubscription.sex}
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option value="Homme">Homme</option>
					<option value="Femme">Femme</option>
				</select>
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="birth_place">Lieu de Naissance</label>
				<input type="text" id="birth_place" bind:value={updatedSubscription.birth_place}
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="activity">Activité</label>
				<select id="activity" bind:value={updatedSubscription.activity}
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option value="Taïso">Taïso</option>
					<option value="Judo">Judo</option>
				</select>
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="judo_belt">Ceinture de Judo</label>
				<select id="judo_belt" bind:value={updatedSubscription.judo_belt}
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option value="Sans">Sans</option>
					<option value="Blanche">Blanche</option>
					<option value="Blanche 1 liseré jaune">Blanche 1 liseré jaune</option>
					<option value="Blanche 2 liserés jaunes">Blanche 2 liserés jaunes</option>
					<option value="Blanche/Jaune">Blanche/Jaune</option>
					<option value="Jaune">Jaune</option>
					<option value="Jaune/Orange">Jaune/Orange</option>
					<option value="Orange">Orange</option>
					<option value="Orange/Verte">Orange/Verte</option>
					<option value="Verte">Verte</option>
					<option value="Verte/Bleue">Verte/Bleue</option>
					<option value="Bleue">Bleue</option>
					<option value="Marron">Marron</option>
					<option value="Noire">Noire</option>
				</select>
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="category">Catégorie</label>
				<select id="category" bind:value={updatedSubscription.category}
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option value="Sans">Sans</option>
					<option value="baby-judo">Baby-judo</option>
					<option value="mini-poussin">Mini-poussin</option>
					<option value="poussins">Poussins</option>
					<option value="benjamins">Benjamins</option>
					<option value="minimes">Minimes</option>
					<option value="cadets">Cadets</option>
					<option value="juniors">Juniors</option>
					<option value="seniors">Séniors</option>
				</select>
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="postal_address">Adresse Postale</label>
				<input type="text" id="postal_address" bind:value={updatedSubscription.postal_address}
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="email_address">Adresse Email</label>
				<input type="email" id="email_address" bind:value={updatedSubscription.email_address}
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="telephone_number">Numéro de Téléphone</label>
				<div class="relative max-w-sm">
					<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
						<TelephoneNumberSVG cssClass="w-5 h-5 text-gray-200 dark:text-gray-400" />
					</div>
					<input type="text" id="telephone_number" bind:value={updatedSubscription.telephone_number}
								 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
				</div>
			</div>

			<div class="mb-4">
				<div class="mb-4">
					<label class="block text-gray-300 text-sm font-bold mb-2" for="emergency_contacts">Contacts d'Urgence</label>
					<div class="relative max-w-sm">
						<ContactSVG cssClass="w-5 h-5 text-gray-200 dark:text-gray-400" />
						<input type="text" id="emergency_contacts" bind:value={updatedSubscription.emergency_contacts}
									 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					</div>
				</div>

			</div>

			<div class="flex items-center mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="activity_authorization">Autorisation
					d'Activité</label>
				<input type="checkbox" id="activity_authorization" bind:checked={updatedSubscription.activity_authorization}
							 class="ml-2">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="release_and_waive_agreement">Accord de
					Renonciation et de Décharge</label>
				<input type="text" id="release_and_waive_agreement" bind:value={updatedSubscription.release_and_waive_agreement}
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="comments">Commentaires</label>
				<textarea id="comments" bind:value={updatedSubscription.comments}
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
			</div>

			<div class="flex items-center mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="medical_certificate">Certificat Médical</label>
				<input type="checkbox" id="medical_certificate" bind:checked={updatedSubscription.medical_certificate} class="ml-2">
			</div>

			<div class="flex items-center mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="licence_fee_paid">Frais de Licence Payés</label>
				<input type="checkbox" id="licence_fee_paid" bind:checked={updatedSubscription.licence_fee_paid} class="ml-2">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="subscription_state">État de l'Abonnement</label>
				<input type="number" id="subscription_state" bind:value={updatedSubscription.subscription_state}
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="extranet_validation_date">Date de Validation
					Extranet</label>
				<div class="relative max-w-sm">
					<DateCalendarSVG cssClass="w-5 h-5 text-gray-200 dark:text-gray-400" />
					<input type="text" id="extranet_validation_date"
								 bind:value={updatedSubscription.extranet_validation_date}
								 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
				</div>


			</div>

			<div class="flex items-center mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="extranet_validation_check">Vérification de
					Validation Extranet</label>
				<input type="checkbox" id="extranet_validation_check" bind:checked={updatedSubscription.extranet_validation_check}
							 class="ml-2">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-sm font-bold mb-2" for="dojo">Dojo</label>
				<input type="text" id="dojo" bind:value={updatedSubscription.dojo}
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</div>

			<div class="flex items-center justify-between col-span-1 md:col-span-2">
				<button type="submit"
								class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
					Enregistrer
				</button>
			</div>
		</form>
	</div>
</div>

<style>
    .container {
        max-width: 1200px;
    }
</style>
