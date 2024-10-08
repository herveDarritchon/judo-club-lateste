<script lang="ts">
	import type { Membre } from '$lib/data/models/Membre';
	import ContactSVG from '$lib/components/svg/ContactSVG.svelte';
	import TelephoneNumberSVG from '$lib/components/svg/TelephoneNumberSVG.svelte';
	import DateCalendarSVG from '$lib/components/svg/DateCalendarSVG.svelte';
	import { _updateMemberData } from './+page';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	export let data;
	export let member: Membre = data.member.data;

	const toastStore = getToastStore();

	let updatedMember = { ...member };

	async function handleSubmit(event) {
		event.preventDefault();
		let t: ToastSettings;
		try {
			const updated = await _updateMemberData(member.id, updatedMember);
			// Handle the response, e.g., show a success message or redirect
			const updateData = updated.member.data;
			t = {
				message: 'Mise à jour réussie pour le compte du membre ' + updateData.subscription_name,
				background: 'variant-filled-primary',
				hideDismiss: true,
				timeout: 3000
			};
		} catch (e: any) {
			const errorMessage = 'Erreur lors de la Mise à jour du compte du membre ' + updatedMember.subscription_name;
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
		<h1 class="h1">Modifie Membre</h1>
		<i class="fa-solid fa-person text-6xl"></i>
	</header>
	<!-- Divider -->
	<hr />
	<!-- Component -->

	<div class="container mx-auto p-4">
		<form on:submit={handleSubmit} class="shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
			<h1 class="text-2xl font-bold mb-4 col-span-1 md:col-span-2">Éditer les informations
				de {member.subscription_name}</h1>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="subscription_name">Nom du membre</label>
				<input type="text" id="subscription_name" bind:value={updatedMember.subscription_name}
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="licence_renewal_type">Type de Licence</label>
				<select id="sex" bind:value={updatedMember.licence_renewal_type}
								class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option value="Première">Première</option>
					<option value="Renouvellement">Renouvellement</option>
				</select>
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="birthday">Date de Naissance</label>
				<div class="relative max-w-sm">
					<DateCalendarSVG cssClass="w-5 h-5 text-gray-200 dark:text-gray-400" />
					<input type="text" id="birthday"
								 bind:value={updatedMember.birthday}
								 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
				</div>
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="sex">Sexe</label>
				<select id="sex" bind:value={updatedMember.sex}
								class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option value="Homme">Homme</option>
					<option value="Femme">Femme</option>
				</select>
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="birth_place">Lieu de Naissance</label>
				<input type="text" id="birth_place" bind:value={updatedMember.birth_place}
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="activity">Activité</label>
				<select id="activity" bind:value={updatedMember.activity}
								class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option value="Taïso">Taïso</option>
					<option value="Judo">Judo</option>
				</select>
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="judo_belt">Ceinture de Judo</label>
				<select id="judo_belt" bind:value={updatedMember.judo_belt}
								class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
				<label class="block text-gray-300 text-xs font-bold mb-2" for="category">Catégorie</label>
				<select id="category" bind:value={updatedMember.category}
								class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option value="Sans">Sans</option>
					<option value="baby-judo">Baby judo</option>
					<option value="mini-poussin1">Mini poussin 1</option>
					<option value="mini-poussin2">Mini poussin 2</option>
					<option value="poussins-1">Poussins 1</option>
					<option value="poussins-2">Poussins 2</option>
					<option value="benjamins">Benjamins</option>
					<option value="minimes">Minimes</option>
					<option value="cadets">Cadets</option>
					<option value="juniors">Juniors</option>
					<option value="seniors">Séniors</option>
				</select>
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="postal_address">Adresse Postale</label>
				<input type="text" id="postal_address" bind:value={updatedMember.postal_address}
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="email_address">Adresse Email</label>
				<input type="email" id="email_address" bind:value={updatedMember.email_address}
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="telephone_number">Numéro de Téléphone</label>
				<div class="relative max-w-sm">
					<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
						<TelephoneNumberSVG cssClass="w-5 h-5 text-gray-200 dark:text-gray-400" />
					</div>
					<input type="text" id="telephone_number" bind:value={updatedMember.telephone_number}
								 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
				</div>
			</div>

			<div class="mb-4">
				<div class="mb-4">
					<label class="block text-gray-300 text-xs font-bold mb-2" for="emergency_contacts">Contacts d'Urgence</label>
					<div class="relative max-w-sm">
						<ContactSVG cssClass="w-5 h-5 text-gray-200 dark:text-gray-400" />
						<input type="text" id="emergency_contacts" bind:value={updatedMember.emergency_contacts}
									 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					</div>
				</div>

			</div>

			<div class="flex items-center mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="activity_authorization">Autorisation
					d'Activité</label>
				<input type="checkbox" id="activity_authorization" bind:checked={updatedMember.activity_authorization}
							 class="ml-2">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="release_and_waive_agreement">Accord de
					Renonciation et de Décharge</label>
				<input type="text" id="release_and_waive_agreement" bind:value={updatedMember.release_and_waive_agreement}
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="comments">Commentaires</label>
				<textarea id="comments" bind:value={updatedMember.comments}
									class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
			</div>

			<div class="flex items-center mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="medical_certificate">Certificat Médical</label>
				<input type="checkbox" id="medical_certificate" bind:checked={updatedMember.medical_certificate} class="ml-2">
			</div>

			<div class="flex items-center mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="licence_fee_paid">Frais de Licence Payés</label>
				<input type="checkbox" id="licence_fee_paid" bind:checked={updatedMember.licence_fee_paid} class="ml-2">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="extranet_validation_date">Date de Validation
					Extranet</label>
				<div class="relative max-w-sm">
					<DateCalendarSVG cssClass="w-5 h-5 text-gray-200 dark:text-gray-400" />
					<input type="text" id="extranet_validation_date"
								 bind:value={updatedMember.extranet_validation_date}
								 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
				</div>


			</div>

			<div class="flex items-center mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="extranet_validation_check">Vérification de
					Validation Extranet</label>
				<input type="checkbox" id="extranet_validation_check" bind:checked={updatedMember.extranet_validation_check}
							 class="ml-2">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="dojo">Dojo</label>
				<select id="activity" bind:value={updatedMember.dojo}
								class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option value="Cazaux">Cazaux</option>
					<option value="La Teste">La Teste</option>
				</select>
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
        max-width: 1300px;
    }
</style>
