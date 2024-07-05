<script lang="ts">

	//Import local datatable components
	import ThSort from '$lib/components/ThSort.svelte';
	import ThFilter from '$lib/components/ThFilter.svelte';
	import Search from '$lib/components/Search.svelte';
	import RowsPerPage from '$lib/components/RowsPerPage.svelte';
	import RowCount from '$lib/components/RowCount.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	//Import handler from SSD
	import { DataHandler } from '@vincjo/datatables';
	import type { Membre } from '$lib/data/models/Membre';

	//Load remote data
	export let members: Membre[] = [];

	const handler = new DataHandler(members, { rowsPerPage: 5 });
	const rows = handler.getRows();

	const selected = handler.getSelected();
	const isAllSelected = handler.isAllSelected();

	function checkBoxWithDate(value: boolean, date: string) {
		return value ? 'Oui le ' + date : 'Non';
	}

	function checkBox(value: boolean) {
		return value ? 'Oui' : 'Non';
	}

	function createAndOpenPdf(row: Membre) {
		const docDefinition = {
			content: [
				{
					text: [
						{ text: 'Fiche de membre de ', style: 'header' },
						{ text: row.subscription_name, style: 'header_label' }
					], alignment: 'center', margin: [0, 90, 0, 80]
				},
				{
					columns: [
						{
							width: '33%',
							text: [
								{ text: 'Activité: ', style: 'label' },
								{ text: row.activity, style: 'subheader' }
							]
						},
						{
							width: '33%',
							text: [
								{ text: 'Dojo: ', style: 'label' },
								{ text: row.dojo, style: 'subheader' }
							]
						},
						{
							width: '33%',
							text: [
								{ text: 'Ceinture: ', style: 'label' },
								{ text: row.judo_belt, style: 'subheader' }
							]
						}
					], margin: [0, 20, 0, 20]
				},
				{
					columns: [
						{
							width: '33%',
							text: [
								{ text: 'Date de Naissance: ', style: 'label' },
								{ text: row.birthday, style: 'subheader' }
							]
						},
						{
							width: '33%',
							text: [
								{ text: 'Lieu de Naissance: ', style: 'label' },
								{ text: row.birth_place, style: 'subheader' }
							]
						},
						{
							width: '33%',
							text: [
								{ text: 'Genre: ', style: 'label' },
								{ text: row.sex, style: 'subheader' }
							]
						}
					], margin: [0, 20, 0, 20]
				},
				{
					columns: [
						{
							width: '50%',
							text: [
								{ text: 'Adresse: ', style: 'label' },
								{ text: row.postal_address, style: 'subheader' }
							]
						},
						{
							width: '50%',
							text: [
								{ text: 'Email: ', style: 'label' },
								{ text: row.email_address, style: 'subheader' }
							]
						}
					], margin: [0, 20, 0, 20]
				},
				{
					columns: [
						{
							width: '50%',
							text: [
								{ text: 'Téléphone: ', style: 'label' },
								{ text: row.telephone_number, style: 'subheader' }
							]
						},
						{
							width: '50%',
							text: [
								{ text: 'Contacts: ', style: 'label' },
								{ text: row.emergency_contacts, style: 'subheader' }
							]
						}
					], margin: [0, 20, 0, 20]
				},
				{
					text: [

						{ text: 'Commentaire:\n', style: 'label' },
						{ text: row.comments, style: 'subheader' }
					], margin: [0, 25, 0, 25]
				},
				{
					columns: [
						{
							width: '50%',
							text: [
								{ text: 'Paiement: ', style: 'label' },
								{ text: checkBox(row.licence_fee_paid), style: 'subheader' }
							]
						},
						{
							width: '50%',
							text: [
								{ text: 'Autorisation de pratique: ', style: 'label' },
								{ text: checkBox(row.activity_authorization), style: 'subheader' }
							]
						}
					], margin: [0, 20, 0, 20]
				},
				{
					columns: [
						{
							width: '50%',
							text: [
								{ text: 'Certificat médical: ', style: 'label' },
								{ text: checkBox(row.medical_certificate), style: 'subheader' }
							]
						},
						{
							width: '50%',
							text: [
								{ text: 'Extranet: ', style: 'label' },
								{
									text: checkBoxWithDate(row.extranet_validation_check, row.extranet_validation_date),
									style: 'subheader'
								}
							]
						}
					], margin: [0, 20, 0, 20]
				},
				{
					text: [
						{ text: 'Date de validation de la demande: ' },
						{ text: row.extranet_validation_date }
					],
					style: ['quote', 'small']
				}
			],
			styles: {
				header: {
					fontSize: 16,
					bold: true
				},
				header_label: {
					fontSize: 18,
					bold: false
				},
				subheader: {
					fontSize: 12,
					bold: false
				},
				label: {
					fontSize: 11,
					bold: true
				},
				quote: {
					italics: true
				},
				small: {
					fontSize: 8
				}
			}
		};

		pdfMake.createPdf(docDefinition).open();
	}

	function memoriseMemberEmails(selected: (Membre[keyof Membre] | Membre)[], rows: Membre[]) {
		const emails = selected.map((member) => {
			const foundMember = rows.find((row) => row.id === member);
			if (foundMember) return foundMember.email_address;
		}).join(';');
		navigator.clipboard.writeText(emails);
	}

</script>

<div class=" overflow-x-auto space-y-4">
	<!-- Header -->
	<header class="flex justify-between gap-4">
		<Search {handler} />
		<button
			type="button"
			class="btn variant-filled"
			on:click={() => memoriseMemberEmails($selected, members)}
			data-tooltip-target="tooltip-memorize-emails" data-tooltip-placement="top"
			disabled={$selected.length===0}>
			<span><i class="fa-solid fa-clipboard"></i></span>
			<span>Copy Adresses Email</span>
		</button>
		<div id="tooltip-memorize-emails" role="tooltip"
				 class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
			Sauvegarde tous les emails des membres sélectionnés.
			<div class="tooltip-arrow" data-popper-arrow></div>
		</div>
		<RowsPerPage {handler} />
	</header>
	<!-- Table -->
	<table class="table table-hover table-compact w-full table-auto">
		<thead>
		<tr>
			<th>Sélection</th>
			<ThSort {handler} orderBy="licence_renewal_type">Mode</ThSort>
			<ThSort {handler} orderBy="subscription_name">Nom</ThSort>
			<ThSort {handler} orderBy="activity">Activité</ThSort>
			<ThSort {handler} orderBy="dojo">Dojo</ThSort>
			<ThSort {handler} orderBy="birthday">Date de naissance</ThSort>
			<ThSort {handler} orderBy="category">Catégorie</ThSort>
			<ThSort {handler} orderBy="telephone_number">Téléphone</ThSort>
			<ThSort {handler} orderBy="email_address">Email</ThSort>
			<td>Actions</td>
		</tr>
		<tr>
			<th>
				<input type="checkbox"
							 on:click={() => handler.selectAll({ selectBy: 'id' })}
							 checked={$isAllSelected}
				/>
			</th>
			<ThFilter {handler} filterBy="licence_renewal_type" />
			<ThFilter {handler} filterBy="subscription_name" />
			<ThFilter {handler} filterBy="activity" />
			<ThFilter {handler} filterBy="dojo" />
			<ThFilter {handler} filterBy="birthday" />
			<ThFilter {handler} filterBy="category" />
			<ThFilter {handler} filterBy="telephone_number" />
			<ThFilter {handler} filterBy="email_address" />
			<td></td>
		</tr>
		</thead>
		<tbody>
		{#each $rows as row}
			<tr>
				<td>
					<input type="checkbox"
								 on:click={() => handler.select(row.id)}
								 checked={$selected.includes(row.id)}
					/>
				</td>
				<td>
					<button type="button" class="btn-icon btn-icon-sm variant-filled"
									data-tooltip-target="tooltip-renewal-{row.id}">
						{#if row.licence_renewal_type === 'Première'}
							<i class="fa-solid fa-person-walking-arrow-right"></i>
						{:else}
							<i class="fa fa-refresh" aria-hidden="true"></i>
						{/if}
					</button>
					<div id="tooltip-renewal-{row.id}" role="tooltip"
							 class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
						{row.licence_renewal_type}
						<div class="tooltip-arrow" data-popper-arrow></div>
					</div>
				</td>
				<td>{row.subscription_name}</td>
				<td>{row.activity}</td>
				<td>{row.dojo}</td>
				<td>{row.birthday}</td>
				<td>{row.category}</td>
				<td>{row.telephone_number}</td>
				<td>{row.email_address}</td>
				<td class="row-auto">
					<a class="btn-icon btn-icon-sm variant-filled"
						 data-tooltip-target="tooltip-display-{row.id}"
						 href="/membres/{row.id}/display" data-tooltip-placement="left">
						<i class="fa-solid fa-display"></i>
					</a>
					<div id="tooltip-display-{row.id}" role="tooltip"
							 class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
						Voir l'inscription complète de {row.subscription_name}.
						<div class="tooltip-arrow" data-popper-arrow></div>
					</div>
					<a type="button" class="btn-icon btn-icon-sm variant-filled"
						 data-tooltip-target="tooltip-edit-{row.id}"
						 href="/membres/{row.id}/edit" data-tooltip-placement="left">
						<i class="fa-solid fa-pen-to-square"></i>
					</a>
					<div id="tooltip-edit-{row.id}" role="tooltip"
							 class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
						Editer pour modification l'inscription de {row.subscription_name}.
						<div class="tooltip-arrow" data-popper-arrow></div>
					</div>
					<button
						type="button"
						class="btn-icon btn-icon-sm variant-filled"
						on:click={() => createAndOpenPdf(row)}
						data-tooltip-target="tooltip-pdf-{row.id}" data-tooltip-placement="left">
						<i class="fa-solid fa-file-pdf"></i>
					</button>
					<div id="tooltip-pdf-{row.id}" role="tooltip"
							 class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
						Générer le pdf pour imprimer l'inscription de {row.subscription_name}.
						<div class="tooltip-arrow" data-popper-arrow></div>
					</div>
				</td>
			</tr>
		{/each}
		</tbody>
	</table>
	<!-- Footer -->
	<footer class="flex justify-between">
		<RowCount {handler} />
		<Pagination {handler} />
	</footer>
</div>