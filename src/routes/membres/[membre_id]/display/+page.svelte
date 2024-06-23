<script lang="ts">
	import type { Membre } from '$lib/data/models/Membre';

	export let data;

	export let member: Membre = data.member.data;

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
		<h1 class="text-2xl font-bold mb-4">{member.subscription_name}</h1>
		<p><strong>Type de Licence:</strong> {member.licence_renewal_type}</p>
		<p><strong>Date de Naissance:</strong> {member.birthday}</p>
		<p><strong>Sexe:</strong> {member.sex}</p>
		<p><strong>Lieu de Naissance:</strong> {member.birth_place}</p>
		<p><strong>Activité:</strong> {member.activity}</p>

		<div class="flex items-center mb-2">
			<p><strong>Ceinture de Judo:</strong></p>
			{#each getBeltColors(member.judo_belt) as color}
				<div class="ml-2 w-12 h-6" style="background-color: {color};"></div>
			{/each}
			<p class="ml-2">({member.judo_belt})</p>
		</div>

		<p><strong>Adresse Postale:</strong> {member.postal_address}</p>
		<p><strong>Adresse Email:</strong> {member.email_address}</p>
		<p><strong>Numéro de Téléphone:</strong> {member.telephone_number}</p>
		<p><strong>Contacts d'Urgence:</strong> {member.emergency_contacts}</p>

		<label class="flex items-center space-x-2 mb-2">
			<p><strong>Autorisation d'Activité</strong></p>
			<input class="checkbox ml-2" type="checkbox" checked={member.activity_authorization} disabled />
		</label>

		<p><strong>Accord de Renonciation et de Décharge:</strong> {member.release_and_waive_agreement}</p>
		<p><strong>Commentaires:</strong> {member.comments}</p>
		<p><strong>Date de Création:</strong> {member.created_at}</p>

		<label class="flex items-center space-x-2 mb-2">
			<p><strong>Certificat Médical</strong></p>
			<input class="checkbox ml-2" type="checkbox" checked={member.medical_certificate} disabled />
		</label>

		<label class="flex items-center space-x-2 mb-2">
			<p><strong>Frais de Licence Payés</strong></p>
			<input class="checkbox ml-2" type="checkbox" checked={member.licence_fee_paid} disabled />
		</label>

		<p><strong>Date de Validation Extranet:</strong> {member.extranet_validation_date}</p>

		<label class="flex items-center space-x-2 mb-2">
			<p><strong>Vérification de Validation Extranet</strong></p>
			<input class="checkbox ml-2" type="checkbox" checked={member.extranet_validation_check} disabled />
		</label>

		<p><strong>Dojo:</strong> {member.dojo}</p>
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