import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import purgeCss from 'vite-plugin-tailwind-purgecss';

export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	test: {
		globals: true,
		environment: 'node',
		coverage: {
			provider: 'istanbul',
			reporter: ['text', 'lcov'], // Utiliser 'text' pour afficher dans la console et 'lcov' pour les rapports HTML
			include: ['src/**/*.{ts,tsx}'], // Dossiers et fichiers à inclure dans la couverture
			exclude: ['**/*.spec.ts', '**/*.test.ts'], // Dossiers et fichiers à exclure
		},
		include: [
			'src/**/*.{test,spec}.{js,ts}',
			'tests/**/*.{test,spec}.{js,ts}'
		]
	}
});
