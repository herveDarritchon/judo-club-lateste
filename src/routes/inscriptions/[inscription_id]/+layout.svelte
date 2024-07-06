<script lang="ts">
	import type { Inscription } from '$lib/data/models/Inscription';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';

	export let data;
	export const inscription: Inscription = data.subscription;

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};
	</script>

<slot/>

<a class="btn variant-filled [&>*]:pointer-events-none" href="/inscriptions"
	 use:popup={popupHover}>
	<span><i class="fa-solid fa-arrow-left"></i></span>
	<span>Inscriptions</span>
</a>
<div class="card p-4 variant-filled-surface" data-popup="popupHover">
	Retour à la page des inscriptions
	<div class="arrow variant-filled-secondary" />
</div>