import type { StorybookConfig } from '@storybook/sveltekit';
import { designTokens } from '../vite/plugins.ts';

/**
 * The token plugin is shared with vite.config.ts rather than restated: without it
 * Storybook starts with no tokens.css on disk, since the file is generated and gitignored.
 */
const config: StorybookConfig = {
	framework: { name: '@storybook/sveltekit', options: {} },
	core: { disableTelemetry: true },
	stories: ['../src/lib/**/*.mdx', '../src/lib/**/*.stories.@(ts|svelte)'],
	staticDirs: ['../static'],
	addons: ['@storybook/addon-svelte-csf', '@storybook/addon-docs', '@storybook/addon-a11y'],
	viteFinal: (cfg) => ({
		...cfg,
		plugins: [...(cfg.plugins ?? []), designTokens()]
	})
};

export default config;
