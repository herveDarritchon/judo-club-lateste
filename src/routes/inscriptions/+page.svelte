<script lang="ts">
	import InscriptionDatatable from '$lib/components/InscriptionDatatable.svelte';
	import type { User } from '$lib/models/User';
	import type { Inscription } from '$lib/data/models/Inscription';
	import { subscriptions } from './store';

	export let data: { user: User, subscriptions: Inscription[] };

	$subscriptions = data.subscriptions;

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
	<InscriptionDatatable subscriptions={$subscriptions} />
</div>
