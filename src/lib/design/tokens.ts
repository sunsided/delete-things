/**
 * The design tokens, as data.
 *
 * Values are the handoff's (design/README.md, "Design tokens") and are final. They live here
 * rather than in a hand-written stylesheet because two things read them: the generated
 * tokens.css that the components style with, and the effect engine in $lib/fx, which feeds
 * colours straight into Web Animations keyframes, where a `var()` cannot be interpolated.
 *
 * tokens.css is written by the Vite plugin in vite/plugins.ts and is gitignored.
 */

export const color = {
	/** Page background. */
	page: '#f4f1ea',
	/** Cards and buttons. */
	card: '#fbf9f4',
	/** Card outlines. */
	cardBorder: '#e3ddd1',
	/** Stage dot grid. */
	dot: '#e2dccf',
	/** Floor lines, muted borders. */
	line: '#d9d2c4',
	/** Text, outlines, icons. */
	ink: '#1d1b18',
	/** Header lede. */
	body: '#5f5a51',
	/** Card descriptions. */
	muted: '#6b665d',
	/**
	 * Eyebrow, card meta, footer. The handoff's #8a8478 is 3.3:1 on the page ground, short of
	 * WCAG AA for 11–12px text; this is the same hue darkened to 4.6:1.
	 */
	mono: '#716c62',
	/** Primary accent, for shapes: rings, blades, fills without text. */
	red: '#d4462f',
	/**
	 * The accent where it carries text: red labels, and red grounds with light text on them.
	 * The handoff's red is 3.9:1 there; this darker step clears AA at 4.5:1 and up.
	 */
	redText: '#c53f29',
	/** Accent on a dark ground (the undo toast). */
	redOnDark: '#f39a83',
	/** Success badge. Darkened from the handoff's #3f8f5a (3.5:1) to pass AA as 14px text. */
	green: '#367b4d',
	/** Fire and sparks. */
	orange: '#f0a43a',
	/** Spark core. */
	gold: '#ffd27a',
	/** Button hover. */
	hover: '#f6e9e4',
	/** Hold-to-confirm and slide-to-delete fill. */
	fill: '#f2d0c6',

	// Volume II
	sand: '#e2cfa3',
	sandDark: '#b89c62',
	sandEdge: '#c9ad74',
	ice: '#8fb8c8',
	iceGround: '#e4f0f4',
	iceText: '#4f8599',
	teal: '#2a9fb0',
	rain: '#7da7c4',
	char: '#2b2620',
	ash: '#6b655b',
	vacuum: '#e9e3d6',
	curtain: '#b8392a',
	confirmGround: '#eef5ef',

	// Volume III
	/** The screensaver's last colour. */
	purple: '#7a5cc4',
	cookie: '#c9955a',
	cookieEdge: '#8a5a2b',
	cookieChip: '#4a2c17',
	cardboard: '#c9a46b',
	cardboardFlap: '#b58d55',
	tape: 'rgba(240,228,190,.92)',
	droplet: '#9cc3d5',
	dropletLight: '#cfe1e9',

	// Volume IV
	/** The cat's arm, its tabby stripes and its paw pad. */
	fur: '#e3a868',
	furStripe: '#c98a4b',
	furBean: '#e9a3a8',
	/** The saucer and its tractor beam. */
	saucer: '#9aa3ab',
	beam: 'rgba(255,210,122,.45)',
	/** Elevator doors, the magnet's poles. */
	steel: '#bdb8ad',
	/** Success text on the ink ground (the terminal). */
	greenOnDark: '#8fd19e'
} as const;

export type ColorToken = keyof typeof color;

export const font = {
	sans: "'Instrument Sans', system-ui, sans-serif",
	mono: "'IBM Plex Mono', ui-monospace, monospace"
} as const;

export const radius = {
	/** Buttons and the toast. */
	button: '10px',
	/** Cards. */
	card: '14px',
	/** The rubber stamp. */
	stamp: '6px'
} as const;

/**
 * Breakpoints, the same as defx: sm below 760px (phones), md below 1024px (tablets). CSS
 * writes them literally, `@media (width < 760px)`, since a media query cannot read a custom
 * property; this is the record of what they are.
 */
export const breakpoints = { sm: 760, md: 1024 } as const;

/** The page column. */
export const pageMax = '1320px';

/** The default easing of every effect, unless a timeline says otherwise. */
export const ease = 'cubic-bezier(.2,.7,.2,1)';

const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());

/** The stylesheet the Vite plugin writes: every token as a custom property on :root. */
export function toCss(): string {
	const lines = [
		'/* Generated from src/lib/design/tokens.ts by vite/plugins.ts. Do not edit. */',
		':root {',
		...Object.entries(color).map(([k, v]) => `\t--${kebab(k)}: ${v};`),
		...Object.entries(font).map(([k, v]) => `\t--font-${k}: ${v};`),
		...Object.entries(radius).map(([k, v]) => `\t--radius-${k}: ${v};`),
		`\t--page-max: ${pageMax};`,
		`\t--ease: ${ease};`,
		'}'
	];
	return lines.join('\n');
}
