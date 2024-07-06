<script lang="ts">
	import '../app.postcss';
	import { AppBar, AppShell, Modal, Toast } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();

	export let data;

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
					<div class="flex-1 flex-col align-middle justify-center content-center"
							 data-tooltip-target="tooltip-username">
						<img class="mx-auto" src="{data.user.avatar_urls['48']}" alt="avatar de l'utilisateur">
						<span>{data.user.slug}</span>
					</div>
					<div id="tooltip-username" role="tooltip"
							 class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
						{data.user.name}
						<div class="tooltip-arrow" data-popper-arrow></div>
					</div>
				{/if}
				<a
					class="btn space-x-4 variant-soft hover:variant-soft-primary"
					href="http://localhost:8888/judolateste/"
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
