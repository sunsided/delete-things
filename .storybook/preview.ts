import type { Preview } from '@storybook/sveltekit';
import '@fontsource/instrument-sans/400.css';
import '@fontsource/instrument-sans/500.css';
import '@fontsource/instrument-sans/600.css';
import '@fontsource/instrument-sans/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/700.css';
import '../src/lib/design/tokens.css';
import '../src/lib/design/base.css';
import '../src/lib/fx/fx.css';

/**
 * The same stylesheets, in the same order, as the root layout: a story is the page's
 * component on the page's ground, not a lookalike.
 */
/** The breakpoints in tokens.ts (sm < 760px, md < 1024px): targets, and the last pixel before each. */
const viewports = {
	mobile: { name: 'mobile 375', styles: { width: '375px', height: '812px' }, type: 'mobile' },
	smEdge: { name: 'sm-edge 759', styles: { width: '759px', height: '1024px' }, type: 'tablet' },
	tablet: { name: 'tablet 768', styles: { width: '768px', height: '1024px' }, type: 'tablet' },
	mdEdge: { name: 'md-edge 1023', styles: { width: '1023px', height: '768px' }, type: 'tablet' },
	desktop: { name: 'desktop 1280', styles: { width: '1280px', height: '900px' }, type: 'desktop' },
	wide: { name: 'wide 1600', styles: { width: '1600px', height: '1000px' }, type: 'desktop' }
} as const;

const preview: Preview = {
	parameters: {
		a11y: { test: 'error' },
		backgrounds: {
			options: {
				page: { name: 'page', value: '#f4f1ea' },
				card: { name: 'card', value: '#fbf9f4' }
			}
		},
		docs: { story: { inline: true } },
		viewport: { options: viewports },
		controls: { matchers: { color: /(background|color)$/i } }
	},
	initialGlobals: { backgrounds: { value: 'page' } }
};

export default preview;
