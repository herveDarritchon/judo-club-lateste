<script lang="ts">
	import MembreDatatable from '$lib/components/MembreDatatable.svelte';
	import type { User } from '$lib/models/User';
	import type { Membre } from '$lib/data/models/Membre';

	export let data: { user: User, members: Membre[] };

	console.log('Data from Member +page.svelte:', data);

	const members: Membre[] = data.members;
	console.log('Members from Member +page.svelte:', members);

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
	<MembreDatatable {members} />
</div>
