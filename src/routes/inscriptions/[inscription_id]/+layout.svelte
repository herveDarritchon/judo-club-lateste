<script lang="ts">
	import type { Inscription } from '$lib/data/models/Inscription';

	export let data;
	export let inscription: Inscription = data.data.data;
	</script>

<slot/>
<a type="button" class="btn-icon btn-icon-sm variant-filled"
	 data-tooltip-target="tooltip-back-{inscription.id}"
	 href="/membres" data-tooltip-placement="top">
	<i class="fa-solid fa-arrow-left"></i>
</a>
<div id="tooltip-back-{inscription.id}" role="tooltip"
		 class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
	Retour à la page des inscriptions.
	<div class="tooltip-arrow" data-popper-arrow></div>
</div>