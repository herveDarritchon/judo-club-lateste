<script lang="ts">
	import type { Inscription } from '$lib/data/models/Inscription';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';

	export let data;
	export const inscription: Inscription = data.subscription;

	const popupInscriptionHover: PopupSettings = {
		event: 'hover',
		target: 'popupInscriptionHover',
		placement: 'top'
	};
	</script>

<slot/>

<a class="btn variant-filled [&>*]:pointer-events-none" href="/inscriptions"
	 use:popup={popupInscriptionHover}>
	<span><i class="fa-solid fa-arrow-left"></i></span>
	<span>Inscriptions</span>
</a>
<div class="card p-4 variant-filled-surface" data-popup="popupInscriptionHover">
	Retour à la page des inscriptions
	<div class="arrow variant-filled-secondary" />
</div>