<script lang="ts">
	import ContactSVG from '$lib/components/svg/ContactSVG.svelte';
	import TelephoneNumberSVG from '$lib/components/svg/TelephoneNumberSVG.svelte';
	import DateCalendarSVG from '$lib/components/svg/DateCalendarSVG.svelte';
	import { _updateSubscriptionData } from './+page';
	import { getToastStore, popup, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { Inscription } from '$lib/data/models/Inscription';
	import moment from 'moment';

	export let data;
	export let subscription: Inscription = data.subscription.data;

	const toastStore = getToastStore();

	let updatedSubscription = { ...subscription };

	async function handleSubmit(event: any) {
		event.preventDefault();
		let t: ToastSettings;
		try {
			if (updatedSubscription.subscription_state == 1 || updatedSubscription.subscription_state == 2) {
				updatedSubscription.subscription_state = 2;
			}
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
			console.error(errorMessage, e);
			t = {
				message: errorMessage,
				background: 'variant-filled-error',
				hideDismiss: true,
				timeout: 3000
			};
		}
		toastStore.trigger(t);
	}

	function subscriptionValidation(updatedSubscription: Inscription) {
		const t: ToastSettings = {
			message: 'Validation de la fiche de ' + updatedSubscription.subscription_name + ' pour cette saison',
			background: 'variant-filled-primary',
			hideDismiss: true,
			timeout: 3000
		};
		toastStore.trigger(t);

	}

	function subscriptionIsValid(inscription: Inscription) {
		return (inscription.medical_certificate && inscription.licence_fee_paid && inscription.extranet_validation_check);
	}

	function extranetDateIsValid(inscription: Inscription) {
		// Expression régulière pour le format "dd/mm/yyyy"
		const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

		const extranetValidationDateStr = inscription.extranet_validation_date;
		if (regex.test(extranetValidationDateStr)) {
			// Date de référence
			const format = 'DD/MM/YYYY';
			const referenceDate = moment('01-01-2024', format);
			const subscriptionExtranetDate = moment(extranetValidationDateStr, format);
			const isAfter = subscriptionExtranetDate.isAfter(referenceDate);
			console.log(`Date de référence: ${referenceDate} - Date de validation extranet: ${subscriptionExtranetDate} with result: ${isAfter}`);
			return isAfter;
		}

		return false;
	}

	function subscriptionIsReadyForExtranet(inscription: Inscription) {
		const result = inscription.medical_certificate && inscription.licence_fee_paid;
		console.log(`inscription.medical_certificate  (${inscription.medical_certificate}) && inscription.licence_fee_paid (${inscription.licence_fee_paid}) && !inscription.extranet_validation_check (${!inscription.extranet_validation_check}) with Result:  ${result}`);
		return result;
	}

	$: subscriptionIsUpdated = (initial: Inscription, current: Inscription) => {
		return JSON.stringify(initial) !== JSON.stringify(current);
	};

	// Reactive statement to compute subscription_state
	$: {
		if (subscriptionIsValid(updatedSubscription)) {
			updatedSubscription.subscription_state = 4;
		} else if (subscriptionIsReadyForExtranet(updatedSubscription)) {
			updatedSubscription.subscription_state = 3;
		} else if (subscriptionIsUpdated(subscription, updatedSubscription)) {
			updatedSubscription.extranet_validation_check = false;
			updatedSubscription.subscription_state = 2;
		}
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
				<label class="block text-gray-300 text-xs font-bold mb-2" for="subscription_name">Nom du l'inscription</label>
				<input type="text" id="subscription_name" bind:value={updatedSubscription.subscription_name}
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="licence_renewal_type">Type de Licence</label>
				<select id="licence_renewal_type" bind:value={updatedSubscription.licence_renewal_type}
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
								 bind:value={updatedSubscription.birthday}
								 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
				</div>
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="sex">Sexe</label>
				<select id="sex" bind:value={updatedSubscription.sex}
								class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option value="Homme">Homme</option>
					<option value="Femme">Femme</option>
				</select>
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="birth_place">Lieu de Naissance</label>
				<input type="text" id="birth_place" bind:value={updatedSubscription.birth_place}
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="activity">Activité</label>
				<select id="activity" bind:value={updatedSubscription.activity}
								class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option value="Taïso">Taïso</option>
					<option value="Judo">Judo</option>
				</select>
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="judo_belt">Ceinture de Judo</label>
				<select id="judo_belt" bind:value={updatedSubscription.judo_belt}
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
				<select id="category" bind:value={updatedSubscription.category}
								class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
				<label class="block text-gray-300 text-xs font-bold mb-2" for="postal_address">Adresse Postale</label>
				<input type="text" id="postal_address" bind:value={updatedSubscription.postal_address}
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="email_address">Adresse Email</label>
				<input type="email" id="email_address" bind:value={updatedSubscription.email_address}
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="telephone_number">Numéro de Téléphone</label>
				<div class="relative max-w-sm">
					<div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
						<TelephoneNumberSVG cssClass="w-5 h-5 text-gray-200 dark:text-gray-400" />
					</div>
					<input type="text" id="telephone_number" bind:value={updatedSubscription.telephone_number}
								 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
				</div>
			</div>

			<div class="mb-4">
				<div class="mb-4">
					<label class="block text-gray-300 text-xs font-bold mb-2" for="emergency_contacts">Contacts d'Urgence</label>
					<div class="relative max-w-sm">
						<ContactSVG cssClass="w-5 h-5 text-gray-200 dark:text-gray-400" />
						<input type="text" id="emergency_contacts" bind:value={updatedSubscription.emergency_contacts}
									 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					</div>
				</div>

			</div>

			<div class="flex items-center mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="activity_authorization">Autorisation
					d'Activité</label>
				<input type="checkbox" id="activity_authorization" bind:checked={updatedSubscription.activity_authorization}
							 class="ml-2">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="release_and_waive_agreement">Accord de
					Renonciation et de Décharge</label>
				<input type="text" id="release_and_waive_agreement" bind:value={updatedSubscription.release_and_waive_agreement}
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="comments">Commentaires</label>
				<textarea id="comments" bind:value={updatedSubscription.comments}
									class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="dojo">Dojo</label>
				<input type="text" id="dojo" bind:value={updatedSubscription.dojo}
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</div>

			<div class="flex items-center mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="licence_fee_paid">Frais de Licence Payés</label>
				<input type="checkbox" id="licence_fee_paid" bind:checked={updatedSubscription.licence_fee_paid} class="ml-2">
			</div>

			<div class="flex items-center  mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="medical_certificate">Certificat Médical</label>
				<input type="checkbox" id="medical_certificate" bind:checked={updatedSubscription.medical_certificate}
							 class="ml-2">
			</div>

			<div class="mb-4"
					 class:hidden={!subscriptionIsReadyForExtranet(updatedSubscription)}>
				<label class="block text-gray-300 text-xs font-bold mb-2" for="extranet_validation_date">Date de Validation
					Extranet</label>
				<div class="relative max-w-sm">
					<DateCalendarSVG cssClass="w-5 h-5 text-gray-200 dark:text-gray-400" />
					<input type="text" id="extranet_validation_date"
								 bind:value={updatedSubscription.extranet_validation_date}
								 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
				</div>

			</div>

			<div class="flex items-center mb-4"
					 class:inactive={!extranetDateIsValid(updatedSubscription)}
					 class:hidden={!subscriptionIsReadyForExtranet(updatedSubscription)}
			>
				<label class="block text-gray-300 text-xs font-bold mb-2" for="extranet_validation_check">
					Vérification de Validation Extranet</label>
				<input type="checkbox" id="extranet_validation_check"
							 bind:checked={updatedSubscription.extranet_validation_check}
							 class="ml-2">
			</div>

			<div class="mb-4">
				<label class="block text-gray-300 text-xs font-bold mb-2" for="subscription_state">État de l'Abonnement</label>
				<input type="number" id="subscription_state" bind:value={updatedSubscription.subscription_state}
							 class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			</div>

			<div class="flex items-center justify-between col-span-1 md:col-span-2">

				<button
					type="submit"
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline [&>*]:pointer-events-none"
					use:popup={{ event: 'hover', target: 'save-' + updatedSubscription.id, placement: 'top' }}
					disabled={!subscriptionIsUpdated(subscription, updatedSubscription)}>
					<span><i class="fa-solid fa-save"></i></span>
					<span>Enregistrer</span>
				</button>
				<div class="card p-4 variant-filled-surface" data-popup="save-{updatedSubscription.id}">
					Enregistre les modifications de la fiche d'inscription de {updatedSubscription.subscription_name}
					<div class="arrow variant-filled-secondary" />
				</div>

				<button
					type="button"
					class="btn variant-filled-primary [&>*]:pointer-events-none"
					on:click={() =>subscriptionValidation(updatedSubscription)}
					use:popup={{ event: 'hover', target: 'validate-' + updatedSubscription.id, placement: 'top' }}
					disabled={!subscriptionIsValid(updatedSubscription)}>
					<span><i class="fa-solid fa-check"></i></span>
					<span>Valider comme licencié</span>
				</button>
				<div class="card p-4 variant-filled-surface" data-popup="validate-{updatedSubscription.id}">
					Valide comme licencié la fiche de {updatedSubscription.subscription_name} pour cette saison
					<div class="arrow variant-filled-secondary" />
				</div>

			</div>

		</form>
	</div>
</div>

<style>
    .container {
        max-width: 1300px;
    }

    div.inactive {
        opacity: 0.5; /* Rend l'élément semi-transparent */
        color: #ccc; /* Couleur de texte gris clair pour indiquer l'inactivité */
        pointer-events: none; /* Désactive les interactions de la souris */
    }

    button[type="submit"]:disabled {
        @apply bg-tertiary-300;
        cursor: not-allowed;
    }

</style>
