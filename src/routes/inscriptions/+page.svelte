<script>
import InscriptionDatatable from '$lib/components/InscriptionDatatable.svelte';
</script>

<svelte:head>
	<title>Inscriptions</title>
	<meta name="description" content="Page pour gérer les inscriptions du club." />
</svelte:head>

<section>
	<h1>
		Liste des <strong>inscriptions</strong> de la saison 2024/2025
	</h1>

	<InscriptionDatatable />

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
