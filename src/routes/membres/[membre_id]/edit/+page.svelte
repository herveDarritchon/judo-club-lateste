<script lang="ts">
	import type { Membre } from '$lib/data/models/Membre';

	export let data;
	export let membre: Membre = data.data.data;

</script>

<div class="space-y-10">
	<!-- Header -->
	<header class="flex justify-between items-center">
		<h1 class="h1">Modifie Membre</h1>
		<i class="fa-solid fa-person text-6xl"></i>
	</header>
	<!-- Divider -->
	<hr />
	<!-- Component -->
	<h3>{membre.subscription_name}</h3>

</div>
