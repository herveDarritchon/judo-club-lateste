<script lang="ts">
	import InscriptionDatatable from '$lib/components/InscriptionDatatable.svelte';

	export let data;
</script>

<div class="space-y-10">
	<!-- Header -->
	<header class="flex justify-between items-center">
		<h1 class="h1">Inscriptions</h1>
		<i class="fa-brands fa-wpforms text-6xl"></i>
	</header>
	<!-- Divider -->
	<hr />
	<!-- Component -->
	<InscriptionDatatable {data} />
</div>
