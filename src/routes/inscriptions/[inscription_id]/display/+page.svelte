<script lang="ts">
	import type { Membre } from '$lib/data/models/Membre';
	import type { Inscription } from '$lib/data/models/Inscription';

	export let data;

	export let subscription: Inscription = data.subscription.data;

	const beltColors = {
		"Sans": "gray",
		"Blanche": "white",
		'Blanche un liseré jaune': "lightyellow",
		'Blanche deux liserés jaunes': "yellow",
		"Jaune": "yellow",
		"Orange": "orange",
		"Verte": "green",
		"Bleue": "blue",
		"Marron": "brown",
		"Noire": "black"
	};

	function getBeltColors(belt: string) {
		if (belt.includes('/')) {
			return belt.split('/').map(color => beltColors[color.trim()] || 'gray');
		}
		return [beltColors[belt] || 'gray'];
	}
</script>

<div class="container mx-auto p-4">
	<div class="shadow-md rounded-lg p-6">
		<h1 class="text-2xl font-bold mb-4">{subscription.subscription_name}</h1>
		<p><strong>Type de Licence:</strong> {subscription.licence_renewal_type}</p>
		<p><strong>Date de Naissance:</strong> {subscription.birthday}</p>
		<p><strong>Sexe:</strong> {subscription.sex}</p>
		<p><strong>Lieu de Naissance:</strong> {subscription.birth_place}</p>
		<p><strong>Activité:</strong> {subscription.activity}</p>

		<div class="flex items-center mb-2">
			<p><strong>Ceinture de Judo:</strong></p>
			{#each getBeltColors(subscription.judo_belt) as color}
				<div class="ml-2 w-12 h-6" style="background-color: {color};"></div>
			{/each}
			<p class="ml-2">({subscription.judo_belt})</p>
		</div>

		<p><strong>Adresse Postale:</strong> {subscription.postal_address}</p>
		<p><strong>Adresse Email:</strong> {subscription.email_address}</p>
		<p><strong>Numéro de Téléphone:</strong> {subscription.telephone_number}</p>
		<p><strong>Contacts d'Urgence:</strong> {subscription.emergency_contacts}</p>

		<label class="flex items-center space-x-2 mb-2">
			<p><strong>Autorisation d'Activité</strong></p>
			<input class="checkbox ml-2" type="checkbox" checked={subscription.activity_authorization} disabled />
		</label>

		<p><strong>Accord de Renonciation et de Décharge:</strong> {subscription.release_and_waive_agreement}</p>
		<p><strong>Commentaires:</strong> {subscription.comments}</p>
		<p><strong>Date de Création:</strong> {subscription.created_at}</p>

		<label class="flex items-center space-x-2 mb-2">
			<p><strong>Certificat Médical</strong></p>
			<input class="checkbox ml-2" type="checkbox" checked={subscription.medical_certificate} disabled />
		</label>

		<label class="flex items-center space-x-2 mb-2">
			<p><strong>Frais de Licence Payés</strong></p>
			<input class="checkbox ml-2" type="checkbox" checked={subscription.licence_fee_paid} disabled />
		</label>

		<p><strong>Date de Validation Extranet:</strong> {subscription.extranet_validation_date}</p>

		<label class="flex items-center space-x-2 mb-2">
			<p><strong>Vérification de Validation Extranet</strong></p>
			<input class="checkbox ml-2" type="checkbox" checked={subscription.extranet_validation_check} disabled />
		</label>

		<p><strong>Dojo:</strong> {subscription.dojo}</p>
	</div>
</div>

<style>
    .container {
        max-width: 600px;
    }
    .checkbox:checked {
        @apply form-checkbox;
    }
</style>