/**
 * The Lab a page's stages share, passed down through Svelte context. A stage rendered on
 * its own (a story, a test) gets a private one instead.
 */
import { getContext, setContext } from 'svelte';
import { Lab } from '$lib/fx/lab';
import type { FxConfig } from '$lib/fx/engine';

const key = Symbol('lab');

export function provideLab(config?: Partial<FxConfig>): Lab {
	return setContext(key, new Lab(config));
}

export function useLab(): Lab {
	return getContext<Lab | undefined>(key) ?? new Lab();
}
