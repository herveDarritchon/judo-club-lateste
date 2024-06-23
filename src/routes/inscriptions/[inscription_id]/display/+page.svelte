<script lang="ts">
	import type { Inscription } from '$lib/data/models/Inscription';

	export let data;
	export let inscription: Inscription = data;

</script>

<div class="space-y-10">
	<!-- Header -->
	<header class="flex justify-between items-center">
		<h1 class="h1">Affiche Inscription</h1>
		<i class="fa-solid fa-person text-6xl"></i>
	</header>
	<!-- Divider -->
	<hr />
	<!-- Component -->
	<h3>{inscription.subscription_name}</h3>
</div>
