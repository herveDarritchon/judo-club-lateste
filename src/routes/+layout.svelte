<script lang="ts">
	import '../app.postcss';
	import {
		AppBar,
		AppShell,
		getModalStore, getToastStore,
		initializeStores,
		Modal,
		type ModalSettings,
		popup,
		type PopupSettings,
		storePopup,
		Toast, type ToastSettings
	} from '@skeletonlabs/skeleton';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { PUBLIC_BACKEND_API_URL } from '$env/static/public';
	import type { User } from '$lib/models/User';
	import { HttpAuthenticatedClient } from '$lib/http/HttpAuthenticatedClient';
	import { StorageService } from '$lib/storage/StorageService';
	import { HttpMethod } from '$lib/http/HttpMethod';
	import { JWTAuthBody } from '$lib/security/body/JWTAuthBody';
	import { JWTAuthHeaders } from '$lib/security/header/JWTAuthHeader';
	import { JWTAuthNoCookies } from '$lib/security/cookie/JWTAuthCookie';
	import { DeviceFingerPrint } from '$lib/security/fingerPrint/DeviceFingerPrint';
	import { goto } from '$app/navigation';
	import { destroy } from './inscriptions/store';

	initializeStores();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	const toastStore = getToastStore();

	export let data;

	const popupAvatarHover: PopupSettings = {
		event: 'hover',
		target: 'popupAvatarHover',
		placement: 'top'
	};

	const modalStore = getModalStore();

	async function _logoutUser(user: User) {
		let t: ToastSettings;
		const storageService = new StorageService(localStorage);
		const body = { device: await new DeviceFingerPrint(storageService).get() };
		try {
			await new HttpAuthenticatedClient(PUBLIC_BACKEND_API_URL, storageService, fetch)
				.request('/wp-json/associationManagement/v1/admin/users/me/logout', HttpMethod.POST, new JWTAuthBody(body), new JWTAuthHeaders(), new JWTAuthNoCookies());
			storageService.remove(HttpAuthenticatedClient.AUTH_TOKEN_KEY);
				t = {
				message: user.slug +  ', vous êtes bien déconnecté de l\'application.',
				background: 'variant-filled-primary',
				hideDismiss: true,
				timeout: 3000
			};
			toastStore.trigger(t);
			await goto('/login');
		} catch (e) {
			console.warn('Erreur lors du logout du Current User:', e);
			t = {
				message: user.slug +  ', erreur lors de votre déconnexion de l\'application.',
				background: 'variant-filled-error',
				hideDismiss: true,
				timeout: 3000
			};
			toastStore.trigger(t);
		}
	}

	function _logoutUserHandler(user: User) {
		const deconnectionModal: ModalSettings = {
			type: 'confirm',
			// Data
			title: 'Déconnexion',
			body: `${user.slug}, voulez-vous vous déconnecter ?`,
			response: (r: boolean) => {
				if (r) {
					_logoutUser(user);
				}
			}
		};
		modalStore.trigger(deconnectionModal);
	}


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
					<button
						type="button"
						class="btn-icon btn-icon-xl variant-filled-error [&>*]:pointer-events-none"
						on:click="{() => _logoutUserHandler(data.user)}"
						use:popup={popupAvatarHover}>
						<img class="mx-auto" src="{data.user.avatar_urls['48']}" alt="avatar de l'utilisateur">
					</button>
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
