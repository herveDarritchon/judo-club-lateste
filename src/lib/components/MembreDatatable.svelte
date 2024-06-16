<script lang="ts">
	import { reloadMembre } from '$lib/data/api';

	import type { State } from '@vincjo/datatables/remote';
	import { DataHandler } from '@vincjo/datatables/remote';
	import ThSort from '$lib/components/ThSort.svelte';
	import RowsPerPage from '$lib/components/RowsPerPage.svelte';
	import RowCount from '$lib/components/RowCount.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import ThFilter from '$lib/components/ThFilter.svelte';
	import Search from '$lib/components/Search.svelte';
	import type { Membre } from '$lib/data/models/Membre';
	import type { Writable } from 'svelte/store';

	const handler: DataHandler<Membre> = new DataHandler<Membre>([], { rowsPerPage: 5, totalRows: 200 });
	const rows: Writable<Membre[]> = handler.getRows();

	handler.onChange((state: State) => reloadMembre(state));
	handler.invalidate();
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
			<ThSort {handler} orderBy="subscription_name">Nom</ThSort>
			<ThSort {handler} orderBy="activity">Activité</ThSort>
			<ThSort {handler} orderBy="dojo">Dojo</ThSort>
		</tr>
		<tr>
			<ThFilter {handler} filterBy="subscription_name" />
			<ThFilter {handler} filterBy="activity" />
			<ThFilter {handler} filterBy="dojo" />
		</tr>
		</thead>
		<tbody>
		{#each $rows as row}
			<tr>
				<td>{row.subscription_name}</td>
				<td>{row.activity}</td>
				<td>{row.dojo}</td>
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