/**
 * 77 · Overinflated: a pump puffs it up in three strokes, each a little rounder and a little
 * pinker than the last, until it pops.
 */
import { color } from '../../design/tokens.ts';
import { h, place, rel, S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { burst, CARD, INK, LINE, RED, ring } from '../particles.ts';

/** Scale, corner radius and ground after each stroke. */
const PUFFS: [number, string, string][] = [
	[1.15, '18px', color.hover],
	[1.32, '28px', color.fill],
	[1.5, '40px', '#eeb2a2']
];

export default {
	badge: 'Popped',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const W = stage.clientWidth;
		S(b, { width: r.w + 'px' });
		const hose = place(
			h('i', { height: '3px', background: INK, borderRadius: '2px' }),
			r.r,
			r.cy - 1.5,
			{
				width: W - r.r - 30 + 'px'
			}
		);
		const handle = h('i', {
			position: 'absolute',
			left: '-8px',
			top: '-26px',
			width: '24px',
			height: '4px',
			background: INK,
			borderRadius: '2px'
		});
		const rod = h('i', {
			position: 'absolute',
			left: '2px',
			top: '-24px',
			width: '4px',
			height: '24px',
			background: INK
		});
		const plunger = h('i', { position: 'absolute', inset: 0 }, [rod, handle]);
		const pump = place(
			h(
				'i',
				{
					width: '10px',
					height: '44px',
					background: LINE,
					border: `1.5px solid ${INK}`,
					borderRadius: '3px',
					boxSizing: 'border-box'
				},
				plunger
			),
			W - 32,
			r.cy - 12
		);
		stage.insertBefore(hose, b);
		stage.append(pump);
		await Promise.all([hose, pump].map((e) => A(e, [{ opacity: 0 }, { opacity: 1 }], 250)));
		let prev: Keyframe = { transform: 'scale(1)', borderRadius: '10px', background: CARD };
		for (const [s, rad, bg] of PUFFS) {
			await A(plunger, [{ transform: 'translateY(0)' }, { transform: 'translateY(18px)' }], {
				duration: 260,
				easing: 'cubic-bezier(.6,0,.4,1)'
			});
			const next = { transform: `scale(${s})`, borderRadius: rad, background: bg };
			A(plunger, [{ transform: 'translateY(18px)' }, { transform: 'translateY(0)' }], 300);
			await A(
				b,
				[prev, { ...next, transform: `scale(${s + 0.06},${s - 0.04})`, offset: 0.6 }, next],
				{
					duration: 420,
					easing: 'cubic-bezier(.3,1.4,.5,1)'
				}
			);
			prev = next;
			await wait(200);
		}
		// The last one is too much: it trembles first.
		await A(
			b,
			Array.from({ length: 9 }, (_, i) => ({
				...prev,
				transform: `scale(${1.5 + (i % 2 ? 0.03 : 0)})`
			})),
			{ duration: 500, easing: 'linear' }
		);
		b.style.visibility = 'hidden';
		A(hose, [{ opacity: 1 }, { opacity: 0 }], 300);
		A(pump, [{ opacity: 1 }, { opacity: 0 }], 300);
		ring(ctx, r.cx, r.cy, RED, 150);
		await burst(ctx, r.cx, r.cy, 20, [color.fill, RED, INK], [50, 110]);
	})
} satisfies Effect;
