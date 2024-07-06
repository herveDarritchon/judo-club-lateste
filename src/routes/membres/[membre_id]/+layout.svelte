<script lang="ts">
	import type { Membre } from '$lib/data/models/Membre';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';

	export let data;
	export const membre: Membre = data.member;


	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'top'
	};

</script>

<slot />

<a class="btn variant-filled [&>*]:pointer-events-none" href="/membres"
	 use:popup={popupHover}>
	<span><i class="fa-solid fa-arrow-left"></i></span>
	<span>Membres</span>
</a>
<div class="card p-4 variant-filled-surface" data-popup="popupHover">
	Retour à la page des membres.
	<div class="arrow variant-filled-secondary" />
</div>