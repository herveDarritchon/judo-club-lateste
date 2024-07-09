<script lang="ts">
	import '../app.postcss';
	import {
		AppBar,
		AppShell,
		initializeStores,
		Modal,
		popup,
		type PopupSettings,
		storePopup,
		Toast
	} from '@skeletonlabs/skeleton';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { PUBLIC_BACKEND_API_URL } from '$env/static/public';

	initializeStores();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data;

	const popupAvatarHover: PopupSettings = {
		event: 'hover',
		target: 'popupAvatarHover',
		placement: 'bottom'
	};
</script>

<Toast />
<Modal />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar shadow="shadow-2xl" slotTrail="!space-x-2">
			<!-- Logo -->
			<svelte:fragment slot="lead">
				<a class="flex items-center gap-4" href="/">
					<img src="/favicon.png" alt="Club Sensei" class="w-12 h-12" />
					<span>Club Sensei</span>
				</a>
			</svelte:fragment>
			<!-- Github  -->
			<svelte:fragment slot="trail">
				{#if data.user.id === 0}
					<a type="button" class="btn space-x-2 variant-soft hover:variant-soft-primary" href="/login">
						<span><i class="fa-solid fa-user"></i></span>
						<span>Connexion</span>
					</a>
				{:else}
					<div class="flex-1 flex-col align-middle justify-center content-center [&>*]:pointer-events-none"
							 use:popup={popupAvatarHover}>
						<img class="mx-auto" src="{data.user.avatar_urls['48']}" alt="avatar de l'utilisateur">
						<span>{data.user.slug}</span>
					</div>
					<div class="card p-4 variant-filled-surface" data-popup="popupAvatarHover">
						<span>{data.user.name}</span>
						<div class="arrow variant-filled-secondary" />
					</div>
				{/if}
				<a
					class="btn space-x-4 variant-soft hover:variant-soft-primary"
					href="{PUBLIC_BACKEND_API_URL}/"
					target="_blank"
				>
					<img src="/Logo_Judo_Testerin-Noir.png" alt="Judo Club La Teste" class="w-12 h-12" />
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Slot -->
	<main class="container mx-auto p-10">
		<slot />
	</main>
</AppShell>
