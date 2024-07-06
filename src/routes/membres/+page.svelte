<script lang="ts">
	import MembreDatatable from '$lib/components/MembreDatatable.svelte';
	import type { User } from '$lib/models/User';
	import type { Membre } from '$lib/data/models/Membre';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let data: { user: User, members: Membre[] };

	const members: Membre[] = data.members;

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};
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

<a class="btn variant-filled [&>*]:pointer-events-none" href="/"
	 use:popup={popupHover}>
	<span><i class="fa-solid fa-arrow-left"></i></span>
	<span>Accueil</span>
</a>
<div class="card p-4 variant-filled-surface" data-popup="popupHover">
	Retour à la page d'accueil
	<div class="arrow variant-filled-secondary" />
</div>