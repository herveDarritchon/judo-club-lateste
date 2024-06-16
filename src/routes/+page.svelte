<script>
import { page } from '$app/stores';
</script>

<h1>Bienvenue sur le site d'administration du Judo Club</h1>

<ul>
	<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
		<a href="/">Home</a>
	</li>
	<li aria-current={$page.url.pathname === '/inscriptions' ? 'page' : undefined}>
		<a href="/inscriptions">Inscriptions</a>
	</li>
	<li aria-current={$page.url.pathname.startsWith('/membres') ? 'page' : undefined}>
		<a href="/membres">Membres</a>
	</li>
</ul>