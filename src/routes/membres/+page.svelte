<script lang="ts">
	import MembreDatatable from '$lib/components/MembreDatatable.svelte';

	export let data;
</script>

<div class="space-y-10">
	<!-- Header -->
	<header class="flex justify-between items-center">
		<h1 class="h1">Membres</h1>
		<i class="fa-solid fa-person text-6xl"></i>
	</header>
	<!-- Divider -->
	<hr />
	<!-- Component -->
	<MembreDatatable {data} />
</div>
