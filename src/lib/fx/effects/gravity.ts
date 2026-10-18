/** 11 · Gravity: the icon and every letter fall to the floor and bounce. */
import { rnd, split } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { CARD, CLEAR, INK } from '../particles.ts';

const IN = 'cubic-bezier(.55,0,1,.45)';
const OUT = 'cubic-bezier(0,.55,.45,1)';
const FRAME = 'rgba(29,27,24,.12)';

export default {
	badge: 'Dropped',
	setup: simple(async (ctx, b) => {
		const { stage, A } = ctx;
		const pieces: HTMLElement[] = [b.icon, ...split(b.text)];
		const sr = stage.getBoundingClientRect();
		const floor = sr.height - 18;
		await A(
			b,
			[
				{ borderColor: INK, background: CARD },
				{ borderColor: FRAME, background: CLEAR }
			],
			250
		);
		await Promise.all(
			pieces.map((p, i) => {
				const q = p.getBoundingClientRect();
				const d = floor - (q.bottom - sr.top);
				const a = rnd(-35, 35);
				const dr = rnd(-14, 14);
				// [offset, y, rotation, easing into the next keyframe]
				const k: [number, number, number, string?][] = [
					[0, 0, 0, IN],
					[0.5, d, a, OUT],
					[0.66, d - 24, a * 1.3, IN],
					[0.8, d, a * 1.5, OUT],
					[0.9, d - 7, a * 1.6, IN],
					[1, d, a * 1.6]
				];
				return A(
					p,
					k.map(([o, y, r, e]) => ({
						offset: o,
						transform: `translate(${dr * o}px,${y}px) rotate(${r}deg)`,
						easing: e || 'linear'
					})),
					{ duration: 950, delay: i * 80 + rnd(0, 40), easing: 'linear' }
				);
			})
		);
		await A(b, [{ borderColor: FRAME }, { borderColor: 'rgba(29,27,24,0)' }], 250);
	})
} satisfies Effect;
