<script lang="ts">

	//Import local datatable components
	import ThSort from '$lib/components/ThSort.svelte';
	import ThFilter from '$lib/components/ThFilter.svelte';
	import Search from '$lib/components/Search.svelte';
	import RowsPerPage from '$lib/components/RowsPerPage.svelte';
	import RowCount from '$lib/components/RowCount.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	//Import handler from SSD
	import { DataHandler } from '@vincjo/datatables';
	import type { Inscription } from '$lib/data/models/Inscription';
	import { getModalStore, getToastStore, type ModalSettings, popup, type ToastSettings } from '@skeletonlabs/skeleton';
	import { HttpAuthenticatedClient } from '$lib/http/HttpAuthenticatedClient';
	import { StorageService } from '$lib/storage/StorageService';
	import { HttpMethod } from '$lib/http/HttpMethod';
	import { destroy } from '../../routes/inscriptions/store';
	import ThRenewalFilter from '$lib/components/ThRenewalFilter.svelte';

	//Load remote data
	export let subscriptions: Inscription[] = [];
	let tableElement;

	const modalStore = getModalStore();

	const handler = new DataHandler(subscriptions, { rowsPerPage: 10 });

	$: subscriptions, handler.setRows(subscriptions);
	$: subscriptions, update();

	const update = () => {
		if (tableElement) {
			const scrollTopValue = tableElement?.parentNode?.scrollTop;
			handler.setRows(subscriptions);
			setTimeout(() => {
				if (tableElement?.parentNode != null) {
					console.log('scrollTopValue', scrollTopValue);
					tableElement.parentNode.scrollTop = scrollTopValue;
				}
			}, 20);
		}
	};

	const rows = handler.getRows();

	const toastStore = getToastStore();
	const selected = handler.getSelected();
	const isAllSelected = handler.isAllSelected();

	function checkBoxWithDate(value: boolean, date: string) {
		return value ? 'Oui le ' + date : 'Non';
	}

	function checkBox(value: boolean) {
		return value ? 'Oui' : 'Non';
	}

	function confirmDelete(subscriptionId: number, subscription: Inscription) {
		const modal: ModalSettings = {
			type: 'confirm',
			// Data
			title: 'Confirmation',
			body: `Est ce que vous voulez supprimer l'inscription de ${subscription.subscription_name} ?`,
			response: (r: boolean) => {
				if (r) {
					_deleteSubscriptionBy(subscriptionId, subscription);
				}
			}
		};
		modalStore.trigger(modal);
	}

	async function _deleteSubscriptionBy(subscriptionId: number, subscription: Inscription) {
		let t: ToastSettings;
		try {
			await new HttpAuthenticatedClient('http://localhost:8888/judolateste', new StorageService(localStorage), fetch)
				.request('/wp-json/associationManagement/v1/subscriptions/' + subscriptionId, HttpMethod.DELETE);
			t = {
				message: 'Suppression réussie de l\'inscription de ' + subscription.subscription_name,
				background: 'variant-filled-primary',
				hideDismiss: true,
				timeout: 3000
			};
			toastStore.trigger(t);
			destroy(subscription);
		} catch (error: any) {
			const message = `Erreur lors de la suppression de l'inscription ${subscriptionId} avec comme cause ${error.message}`;
			console.error(message, error);
			throw new Error(message);
		}
	}

	function createAndOpenPdf(row: Inscription) {
		const docDefinition = {
			content: [
				{
					text: [
						{ text: 'Fiche de membre de ', style: 'header' },
						{ text: row.subscription_name, style: 'header_label' }
					], alignment: 'center', margin: [0, 90, 0, 80]
				},
				{
					columns: [
						{
							width: '33%',
							text: [
								{ text: 'Activité: ', style: 'label' },
								{ text: row.activity, style: 'subheader' }
							]
						},
						{
							width: '33%',
							text: [
								{ text: 'Dojo: ', style: 'label' },
								{ text: row.dojo, style: 'subheader' }
							]
						},
						{
							width: '33%',
							text: [
								{ text: 'Ceinture: ', style: 'label' },
								{ text: row.judo_belt, style: 'subheader' }
							]
						}
					], margin: [0, 20, 0, 20]
				},
				{
					columns: [
						{
							width: '33%',
							text: [
								{ text: 'Date de Naissance: ', style: 'label' },
								{ text: row.birthday, style: 'subheader' }
							]
						},
						{
							width: '33%',
							text: [
								{ text: 'Lieu de Naissance: ', style: 'label' },
								{ text: row.birth_place, style: 'subheader' }
							]
						},
						{
							width: '33%',
							text: [
								{ text: 'Genre: ', style: 'label' },
								{ text: row.sex, style: 'subheader' }
							]
						}
					], margin: [0, 20, 0, 20]
				},
				{
					columns: [
						{
							width: '50%',
							text: [
								{ text: 'Adresse: ', style: 'label' },
								{ text: row.postal_address, style: 'subheader' }
							]
						},
						{
							width: '50%',
							text: [
								{ text: 'Email: ', style: 'label' },
								{ text: row.email_address, style: 'subheader' }
							]
						}
					], margin: [0, 20, 0, 20]
				},
				{
					columns: [
						{
							width: '50%',
							text: [
								{ text: 'Téléphone: ', style: 'label' },
								{ text: row.telephone_number, style: 'subheader' }
							]
						},
						{
							width: '50%',
							text: [
								{ text: 'Contacts: ', style: 'label' },
								{ text: row.emergency_contacts, style: 'subheader' }
							]
						}
					], margin: [0, 20, 0, 20]
				},
				{
					text: [

						{ text: 'Commentaire:\n', style: 'label' },
						{ text: row.comments, style: 'subheader' }
					], margin: [0, 25, 0, 25]
				},
				{
					columns: [
						{
							width: '50%',
							text: [
								{ text: 'Paiement: ', style: 'label' },
								{ text: checkBox(row.licence_fee_paid), style: 'subheader' }
							]
						},
						{
							width: '50%',
							text: [
								{ text: 'Autorisation de pratique: ', style: 'label' },
								{ text: checkBox(row.activity_authorization), style: 'subheader' }
							]
						}
					], margin: [0, 20, 0, 20]
				},
				{
					columns: [
						{
							width: '50%',
							text: [
								{ text: 'Certificat médical: ', style: 'label' },
								{ text: checkBox(row.medical_certificate), style: 'subheader' }
							]
						},
						{
							width: '50%',
							text: [
								{ text: 'Extranet: ', style: 'label' },
								{
									text: checkBoxWithDate(row.extranet_validation_check, row.extranet_validation_date),
									style: 'subheader'
								}
							]
						}
					], margin: [0, 20, 0, 20]
				},
				{
					text: [
						{ text: 'Date de validation de la demande: ' },
						{ text: row.extranet_validation_date }
					],
					style: ['quote', 'small']
				}
			],
			styles: {
				header: {
					fontSize: 16,
					bold: true
				},
				header_label: {
					fontSize: 18,
					bold: false
				},
				subheader: {
					fontSize: 12,
					bold: false
				},
				label: {
					fontSize: 11,
					bold: true
				},
				quote: {
					italics: true
				},
				small: {
					fontSize: 8
				}
			}
		};

		pdfMake.createPdf(docDefinition).open();
	}

	function isReadyToBecomeAMember(row: Inscription) {
		return isReadyForExtranet(row) && row.extranet_validation_check;
	}

	function isReadyForExtranet(row: Inscription) {
		return row.medical_certificate && row.licence_fee_paid;
	}

	function buildSubscriptionState(row: Inscription) {
		switch (row.subscription_state) {
			case 1:
				return `
<div class="not-started">
	<span><i class="fa-solid fa-temperature-empty"></i>
	</span><span class="label">Non débuté</span>
</div>
`;
			case 2:
				if (isReadyToBecomeAMember(row)) {
					return `
<div class="finished">
	<span><i class="fa-solid fa-temperature-full"></i></span>
	<span class="label">À valider</span>
</div>`;
				} else if (isReadyForExtranet(row)) {
					return `
<div class="to-extranet">
	<span><i class="fa-solid fa-temperature-three-quarters"></i></span>
	<span class="label">À inscrire extranet</span>
</div>`;
				} else {
					return `
<div class="started">
	<span><i class="fa-solid fa-temperature-quarter"></i></span>
	<span class="label">En cours</span>
</div>
`;
				}
			default:
				return `
<div class="unknown">
	<span><i class="fa-solid fa-triangle-exclamation"></i></span>
	<span class="label">Statut inconnu</span>
</div>`;
		}
	}

</script>

<div class=" overflow-x-auto space-y-4">
	<!-- Header -->
	<header class="flex justify-between gap-4">
		<Search {handler} />
		<RowsPerPage {handler} />
	</header>
	<!-- Table -->
	<table class="table table-hover table-compact w-full table-auto" bind:this={tableElement}>
		<thead>
		<tr>
			<ThSort {handler} orderBy="licence_renewal_type">Mode</ThSort>
			<ThSort {handler} orderBy="subscription_state">État</ThSort>
			<ThSort {handler} orderBy="subscription_name">Nom</ThSort>
			<ThSort {handler} orderBy="activity">Activité</ThSort>
			<ThSort {handler} orderBy="dojo">Dojo</ThSort>
			<ThSort {handler} orderBy="birthday">Date de naissance</ThSort>
			<ThSort {handler} orderBy="telephone_number">Téléphone</ThSort>
			<ThSort {handler} orderBy="email_address">Email</ThSort>
			<td>Actions</td>
		</tr>
		<tr>
			<ThRenewalFilter {handler} filterBy="licence_renewal_type" />
			<ThFilter {handler} filterBy="subscription_state" />
			<ThFilter {handler} filterBy="subscription_name" />
			<ThFilter {handler} filterBy="activity" />
			<ThFilter {handler} filterBy="dojo" />
			<ThFilter {handler} filterBy="birthday" />
			<ThFilter {handler} filterBy="telephone_number" />
			<ThFilter {handler} filterBy="email_address" />
			<td></td>
		</tr>
		</thead>
		<tbody>
		{#each $rows as row}
			<tr>
				<td>
					<button type="button"
									class="btn variant-filled [&>*]:pointer-events-none"
									use:popup={{ event: 'hover', target: 'renewal-' + row.id, placement: 'top' }}>
						{#if row.licence_renewal_type === 'Première'}
							<i class="fa-solid fa-person-walking-arrow-right"></i>
						{:else}
							<i class="fa fa-refresh" aria-hidden="true"></i>
						{/if}
					</button>
					<div class="card p-4 variant-filled-surface" data-popup="renewal-{row.id}">
						{row.licence_renewal_type}
						<div class="arrow variant-filled-secondary" />
					</div>
				</td>
				<td class="subscription-status-label">{ @html buildSubscriptionState(row) }</td>
				<td>{row.subscription_name}</td>
				<td>{row.activity}</td>
				<td>{row.dojo}</td>
				<td>{row.birthday}</td>
				<td>{row.telephone_number}</td>
				<td>{row.email_address}</td>
				<td class="row-auto">
					<a class="btn-icon btn-icon-sm variant-filled [&>*]:pointer-events-none"
						 use:popup={{ event: 'hover', target: 'display-' + row.id, placement: 'left' }}
						 href="/inscriptions/{row.id}/display">
						<i class="fa-solid fa-display"></i>
					</a>
					<div class="card p-4 variant-filled-surface" data-popup="display-{row.id}">
						Voir l'inscription complète de {row.subscription_name}
						<div class="arrow variant-filled-secondary" />
					</div>
					<a class="btn-icon btn-icon-sm variant-filled [&>*]:pointer-events-none"
						 use:popup={{ event: 'hover', target: 'edit-' + row.id, placement: 'left' }}
						 href="/inscriptions/{row.id}/edit">
						<i class="fa-solid fa-pen-to-square"></i>
					</a>
					<div class="card p-4 variant-filled-surface" data-popup="edit-{row.id}">
						Editer pour modification l'inscription de {row.subscription_name}
						<div class="arrow variant-filled-secondary" />
					</div>
					<button
						type="button"
						class="btn-icon btn-icon-sm variant-filled [&>*]:pointer-events-none"
						on:click={() => createAndOpenPdf(row)}
						use:popup={{ event: 'hover', target: 'pdf-' + row.id, placement: 'left' }}>
						<i class="fa-solid fa-file-pdf"></i>
					</button>
					<div class="card p-4 variant-filled-surface" data-popup="pdf-{row.id}">
						Générer le pdf de l'inscription de {row.subscription_name} pour impression
						<div class="arrow variant-filled-secondary" />
					</div>
					<button
						type="button"
						class="btn-icon btn-icon-sm variant-filled-error [&>*]:pointer-events-none"
						on:click="{() => confirmDelete(row.id, row)}"
						use:popup={{ event: 'hover', target: 'delete-' + row.id, placement: 'left' }}>
						<i class="fa-solid fa-trash"></i>
					</button>
					<div class="card p-4 variant-filled-error" data-popup="delete-{row.id}">
						Supprimer l'inscription de {row.subscription_name}.
						<div class="arrow variant-filled-secondary" />
					</div>
				</td>
			</tr>
		{/each}
		</tbody>
	</table>
	<!-- Footer -->
	<footer class="flex justify-between">
		<RowCount {handler} />
		<Pagination {handler} />
	</footer>
</div>

<style lang="scss">
  td {
    text-align: center;
  }

  td.subscription-status-label {
    :global( span.label ) {
      margin-left: 0.5rem;
    }

    :global(div) {
      border-radius: 5px;
    }

    :global(div.not-started) {
      background-color: #cce5ff;
      color: #004085;
    }

    :global(div.started) {
      background-color: #fff3cd;
      color: #856404;
    }

    :global(div.to-extranet) {
      background-color: #beeac9;
      color: #3a814b;
    }

    :global(div.finished) {
			background-color: #3b6746;
			color: #113c1b;
    }

    :global(div.unknown) {
      background-color: #f8d7da;
      color: #721c24;
    }
  }

</style>