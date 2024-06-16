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

	//Load remote data
	export let data;

	console.log('Data', data);

	//Init data handler - CLIENT
	const handler = new DataHandler(data.data, { rowsPerPage: 5 });
	const rows = handler.getRows();

	function handleDelete(id: string): boolean {
		console.log('Delete', id);
		return true;
	}
</script>

<div class=" overflow-x-auto space-y-4">
	<!-- Header -->
	<header class="flex justify-between gap-4">
		<Search {handler} />
		<RowsPerPage {handler} />
	</header>
	<!-- Table -->
	<table class="table table-hover table-compact w-full table-auto">
		<thead>
		<tr>
			<ThSort {handler} orderBy="licence_renewal_type">Mode</ThSort>
			<ThSort {handler} orderBy="subscription_name">Nom</ThSort>
			<ThSort {handler} orderBy="activity">Activité</ThSort>
			<ThSort {handler} orderBy="dojo">Dojo</ThSort>
			<ThSort {handler} orderBy="birthday">Date de naissance</ThSort>
			<ThSort {handler} orderBy="telephone_number">Téléphone</ThSort>
			<ThSort {handler} orderBy="email_address">Email</ThSort>
			<td>Actions</td>
		</tr>
		<tr>
			<ThFilter {handler} filterBy="licence_renewal_type" />
			<ThFilter {handler} filterBy="subscription_name" />
			<ThFilter {handler} filterBy="activity" />
			<ThFilter {handler} filterBy="dojo" />
			<ThFilter {handler} filterBy="birthday" />
			<ThFilter {handler} filterBy="telephone_number" />
			<ThFilter {handler} filterBy="email_address" />
			<td></td>
		</tr>
		</thead>
		<tbody>
		{#each $rows as row}
			<tr>
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
				<td>{row.telephone_number}</td>
				<td>{row.email_address}</td>
				<td class="row-auto">
					<a type="button" class="btn-icon btn-icon-sm variant-filled"
						 href="/inscriptions/{row.id}/display"
									data-tooltip-target="tooltip-display-{row.id}" data-tooltip-placement="left">
						<i class="fa-solid fa-display"></i>
					</a>
					<div id="tooltip-display-{row.id}" role="tooltip"
							 class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
						Voir l'inscription complète de {row.subscription_name}.
						<div class="tooltip-arrow" data-popper-arrow></div>
					</div>
					<a type="button" class="btn-icon btn-icon-sm variant-filled"
						 href="/inscriptions/{row.id}/edit"
									data-tooltip-target="tooltip-edit-{row.id}" data-tooltip-placement="left">
						<i class="fa-solid fa-pen-to-square"></i>
					</a>
					<div id="tooltip-edit-{row.id}" role="tooltip"
							 class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
						Editer pour modification l'inscription de {row.subscription_name}.
						<div class="tooltip-arrow" data-popper-arrow></div>
					</div>
					<a type="button" class="btn-icon btn-icon-sm variant-filled"
						 href="/inscriptions/{row.id}/pdf"
						 data-tooltip-target="tooltip-pdf-{row.id}" data-tooltip-placement="left">
						<i class="fa-solid fa-file-pdf"></i>
					</a>
					<div id="tooltip-pdf-{row.id}" role="tooltip"
							 class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
						Générer le pdf pour imprimer l'inscription de {row.subscription_name}.
						<div class="tooltip-arrow" data-popper-arrow></div>
					</div>
					<button type="button" class="btn-icon btn-icon-sm variant-filled"
									on:click="{handleDelete(row.id)}"
									data-tooltip-target="tooltip-delete-{row.id}" data-tooltip-placement="left">
						<i class="fa-solid fa-trash"></i>
					</button>
					<div id="tooltip-delete-{row.id}" role="tooltip"
							 class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
						Supprimer l'inscription de {row.subscription_name}.
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