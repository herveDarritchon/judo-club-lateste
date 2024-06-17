<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

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
				<a type="button" class="btn space-x-2 variant-soft hover:variant-soft-primary" href="/login">
					<span><i class="fa-solid fa-user"></i></span>
					<span>Connexion</span>
				</a>
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
