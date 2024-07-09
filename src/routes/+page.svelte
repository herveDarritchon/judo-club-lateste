<script lang="ts">

	import {
		PUBLIC_BACKEND_API_URL,
	} from '$env/static/public';

</script>

<div class="space-y-10">
	<header class="flex justify-center items-center gap-10">
		<img class="w-48" src="logo-app.webp" alt="Post" />
	</header>
	<!-- CTA -->
	<div class="text-center">
		<a class="btn variant-filled" href="{PUBLIC_BACKEND_API_URL}/" target="_blank">
			Pour se rendre sur le site du Judo &rarr;
		</a>
	</div>
	<!-- Links -->
	<div class="max-w-[600px] mx-auto grid grid-cols-1 gap-4">
		<!-- Inscriptions -->
		<a class="card card-hover overflow-hidden" href="/inscriptions">
			<header class="flex justify-between items-center p-4">
				<h3 class="h3"><i class="fa-brands fa-wpforms mr-1"></i> Inscriptions</h3>
				<h3 class="h3">&rarr;</h3>
			</header>
			<hr class="hr" />
			<div class="p-4 space-y-4">
				<article>
					<p>La liste des Inscriptions en cours à traiter.</p>
				</article>
			</div>
		</a>
		<!-- Membres -->
		<a class="card card-hover overflow-hidden" href="/membres">
			<header class="flex justify-between items-center p-4">
				<h3 class="h3"><i class="fa-solid fa-person mr-1"></i> Membres</h3>
				<h3 class="h3">&rarr;</h3>
			</header>
			<hr class="hr" />
			<div class="p-4 space-y-4">
				<article>
					<p>
						La liste des membres de la saison en cours (2023/2024).
					</p>
				</article>
			</div>
		</a>
		<!-- Historique -->
		<a class="card card-hover overflow-hidden" href="/">
			<header class="flex justify-between items-center p-4">
				<h3 class="h3"><i class="fa-solid fa-box-archive mr-1"></i> Historique (en construction)</h3>
				<h3 class="h3">&rarr;</h3>
			</header>
			<hr class="hr" />
			<div class="p-4 space-y-4">
				<article>
					<p>
						Pour avoir accés aux saisons précédentes (membres).
					</p>
				</article>
			</div>
		</a>
	</div>
	<!-- Credit -->
	<footer class="text-center">
		<small>
			<span class="opacity-60">Si vous souhaitez vous rendre directement sur la </span>
			<a class="anchor" href="{PUBLIC_BACKEND_API_URL}/wp-admin/" target="_blank">partie administration</a>
			<span class="opacity-60"> du site du Judo Club.</span>
		</small>
	</footer>
</div>
