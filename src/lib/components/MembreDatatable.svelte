<script lang="ts">

	//Import local datatable components
	import ThSort from '$lib/components/ThSort.svelte';
	import ThFilter from '$lib/components/ThFilter.svelte';
	import Search from '$lib/components/Search.svelte';
	import RowsPerPage from '$lib/components/RowsPerPage.svelte';
	import RowCount from '$lib/components/RowCount.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	//Load remote data
	export let data;

	console.log("Data", data);

	//Import handler from SSD
	import { DataHandler } from '@vincjo/datatables';

	//Init data handler - CLIENT
	const handler = new DataHandler(data.data, { rowsPerPage: 5 });
	const rows = handler.getRows();
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