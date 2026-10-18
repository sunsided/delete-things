/**
 * Vite plugins shared by the app build and Storybook.
 *
 * They live outside vite.config.ts so .storybook/main.ts can import them without pulling
 * in the SvelteKit plugin: Storybook needs the generated token CSS too, and a second copy
 * would drift.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import type { Plugin } from 'vite';
import { toCss } from '../src/lib/design/tokens.ts';

/**
 * Writes src/lib/design/tokens.css from tokens.ts. Vite restarts the dev server whenever
 * a config dependency changes, so the generated file stays fresh without a watcher.
 */
export function designTokens(): Plugin {
	const out = 'src/lib/design/tokens.css';
	const write = () => {
		const css = toCss() + '\n';
		if (!existsSync(out) || readFileSync(out, 'utf8') !== css) writeFileSync(out, css);
	};
	// At config time as well as in buildStart: svelte-check and the first CSS import can
	// both run before any build hook does.
	write();
	return { name: 'design-tokens', buildStart: write };
}
