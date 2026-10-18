/**
 * 59 · Screensaver corner: it bounces around the stage like an old screensaver, changing
 * colour at every wall, until it lands exactly in the corner.
 */
import { color, font } from '../../design/tokens.ts';
import { at, h } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { burst, GOLD, GREEN, INK, RED, RED_TEXT, ring } from '../particles.ts';

const SCALE = 0.7;
/** Border and text colour after each bounce. Red text uses its AA step; the border keeps red. */
const COLS: [string, string][] = [
	[INK, INK],
	[RED, RED_TEXT],
	[color.teal, color.teal],
	[GREEN, GREEN],
	[color.purple, color.purple]
];
/** The moments it meets a wall, x or y, where the colour changes. */
const TS = [0, 0.2, 1 / 3, 0.6, 1];

/**
 * Folds a straight line back into [-m, m], as a bounce between two walls would. A path of
 * 5m in x and 3m in y bounces three times and ends in the top-right corner.
 */
const fold = (u: number, m: number) => {
	const v = (((u + m) % (4 * m)) + 4 * m) % (4 * m);
	return v < 2 * m ? v - m : 3 * m - v;
};

export default {
	badge: 'Worth the wait',
	setup: simple(async (ctx, b) => {
		const { stage, A } = ctx;
		const W = stage.clientWidth;
		const H = stage.clientHeight;
		const mx = W / 2 - (b.offsetWidth * SCALE) / 2 - 4;
		const my = H / 2 - (b.offsetHeight * SCALE) / 2 - 4;
		await A(b, [{ transform: 'scale(1)' }, { transform: `scale(${SCALE})` }], 200);
		const k = TS.map((t, i) => ({
			offset: t,
			transform: `translate(${fold(5 * mx * t, mx)}px,${fold(3 * my * t, my)}px) scale(${SCALE})`,
			borderColor: COLS[i][0],
			color: COLS[i][1]
		}));
		await A(b, k, { duration: 2600, easing: 'linear' });
		const cx = W / 2 + mx;
		const cy = H / 2 - my;
		ring(ctx, cx, cy, GOLD, 120);
		burst(ctx, cx, cy, 16, [GOLD, RED, color.teal, GREEN], [30, 90]);
		const c = at(
			stage,
			h('div', { font: `700 20px/1 ${font.sans}`, color: INK, letterSpacing: '.02em' }, 'CORNER!'),
			W / 2,
			H / 2
		);
		await A(
			c,
			[
				{ opacity: 0, transform: 'scale(.5) rotate(-6deg)' },
				{ opacity: 1, transform: 'scale(1.1) rotate(-4deg)', offset: 0.4 },
				{ opacity: 1, transform: 'scale(1) rotate(-4deg)', offset: 0.8 },
				{ opacity: 0, transform: 'scale(1) rotate(-4deg)' }
			],
			1100
		);
		await A(b, [{ opacity: 1 }, { opacity: 0 }], 200);
	})
} satisfies Effect;
