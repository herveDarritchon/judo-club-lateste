<script lang="ts">

	export let data;

</script>

<div class="space-y-10">
	<!-- Header -->
	<header class="flex justify-between items-center">
		<h1 class="h1">Affiche Membre</h1>
		<i class="fa-solid fa-person text-6xl"></i>
	</header>
	<!-- Divider -->
	<hr />
	<!-- Component -->
	<h3>{data.member.subscription_name}</h3>
</div>
