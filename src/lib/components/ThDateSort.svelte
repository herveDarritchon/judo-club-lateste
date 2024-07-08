<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	import moment from 'moment';

	export let handler: DataHandler;
	export let orderBy: string;

	const sorted = handler.getSort();

</script>

<th on:click={() => {
	handler.sort( (row) => {
		const dateObject = moment(row.birthday, "DD/MM/YYYY");
		return dateObject.toISOString()
	} )
}
	} class="cursor-pointer select-none">
	<div class="flex h-full items-center justify-start gap-x-2">
		<slot />
		{#if $sorted.identifier === orderBy}
			{#if $sorted.direction === 'asc'}
				&darr;
			{:else if $sorted.direction === 'desc'}
				&uarr;
			{/if}
		{:else}
			&updownarrow;
		{/if}
	</div>
</th>
