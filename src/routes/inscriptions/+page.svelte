<script lang="ts">
	import InscriptionDatatable from '$lib/components/InscriptionDatatable.svelte';
	import type { User } from '$lib/models/User';
	import type { Inscription } from '$lib/data/models/Inscription';
	import { subscriptions } from './store';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let data: { user: User, subscriptions: Inscription[] };

	$subscriptions = data.subscriptions;

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};
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

<a class="btn variant-filled [&>*]:pointer-events-none" href="/"
	 use:popup={popupHover}>
	<span><i class="fa-solid fa-arrow-left"></i></span>
	<span>Accueil</span>
</a>
<div class="card p-4 variant-filled-surface" data-popup="popupHover">
	Retour à la page d'accueil
	<div class="arrow variant-filled-secondary" />
</div>