<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';

	export let handler: DataHandler;
	export let filterBy: string;
	const defaultValue = 'Sans-Filtre';
	let selectFilter: string = defaultValue;

	const customCheck = (entry: string, value: string): boolean => {
		return entry === value;
	};

	function handleFilter() {
		if (selectFilter === defaultValue) {
			handler.clearFilters();
		} else if (filterBy) {
			handler.filter(selectFilter, filterBy, customCheck);
		}
	}
</script>

<th>
	<select id="licence_renewal_type"
					bind:value={selectFilter}
					on:change={() => handleFilter()}
					class="input text-xs w-full"
	>
		<option value={defaultValue}>{defaultValue}</option>
		<option value="Première">Première</option>
		<option value="Renouvellement">Renouvellement</option>
	</select>
</th>

