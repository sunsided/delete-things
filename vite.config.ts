import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { designTokens } from './vite/plugins.ts';

/**
 * Ports are fixed and distinct from the sibling sites (web-again on 5173/4173/6006, defx on
 * 4183/6016), so all of them can run side by side: dev :5193, preview :4193, Storybook :6026.
 */
export default defineConfig({
	server: { port: 5193, strictPort: true },
	preview: { port: 4193, strictPort: true },
	plugins: [
		designTokens(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// fallback: undefined + strict means a route that fails to prerender fails the build.
			adapter: adapter({ fallback: undefined, strict: true }),
			// Relative asset and link URLs: the same build works at the root of a domain, under
			// /delete-things/ on GitHub Pages, or copied into another site's lab folder.
			paths: { base: (process.env.BASE_PATH ?? '') as '' | `/${string}`, relative: true },
			prerender: { handleHttpError: 'fail', handleMissingId: 'fail' }
		})
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'unit',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}', 'vite/**/*.{test,spec}.ts'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			},
			{
				// The effects are Web Animations, layout measurements and pointer events. A DOM
				// shim has none of those, so component tests run in a real Chromium.
				extends: './vite.config.ts',
				test: {
					name: 'component',
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					browser: {
						enabled: true,
						headless: true,
						provider: playwright(),
						instances: [{ browser: 'chromium' }]
					}
				}
			}
		]
	}
});
