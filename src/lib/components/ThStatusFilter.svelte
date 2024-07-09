<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';

	export let handler: DataHandler;
	export let filterBy: string;
	const defaultValue = 'Sans-Filtre';
	let selectFilter: string = defaultValue;

	const customCheck = (entry: number, value: string): boolean => {
		return entry === parseInt(value);
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
	<select id="subscription_status"
					bind:value={selectFilter}
					on:change={() => handleFilter()}
					class="input text-xs w-full"
	>
		<option value={defaultValue}>{defaultValue}</option>
		<option value=1>Non débuté</option>
		<option value=2>En cours</option>
		<option value=3>A inscrire extranet</option>
		<option value=4>A valider</option>
	</select>
</th>

