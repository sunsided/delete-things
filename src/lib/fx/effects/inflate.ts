/**
 * 77 · Overinflated: a floor pump puffs it up in three strokes. Each one leaves it taller,
 * rounder and pinker than the last, until it trembles and pops.
 */
import { color } from '../../design/tokens.ts';
import { h, place, rel, S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { burst, CARD, INK, LINE, RED, ring } from '../particles.ts';

/**
 * Width and height scale, corner radius and ground after each stroke. Height grows faster
 * than width, so the button bulges into a balloon instead of zooming.
 */
const PUFFS: [number, number, string, string][] = [
	[1.08, 1.3, '18px', color.hover],
	[1.16, 1.65, '32px', color.fill],
	[1.24, 2, '50%', '#eeb2a2']
];
const STROKE = 16;

export default {
	badge: 'Popped',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const W = stage.clientWidth;
		S(b, { width: r.w + 'px' });

		// The floor pump: a barrel on a foot plate, a rod and a T handle that slide in and out.
		const px = W - 36;
		const top = r.cy - 18;
		const rod = h('i', {
			position: 'absolute',
			left: '5px',
			top: '-22px',
			width: '4px',
			height: '30px',
			background: INK
		});
		const handle = h('i', {
			position: 'absolute',
			left: '-6px',
			top: '-26px',
			width: '26px',
			height: '5px',
			background: INK,
			borderRadius: '3px'
		});
		const plunger = h('i', { position: 'absolute', inset: 0 }, [rod, handle]);
		const barrel = h('i', {
			position: 'absolute',
			inset: 0,
			background: LINE,
			border: `1.5px solid ${INK}`,
			borderRadius: '3px',
			boxSizing: 'border-box'
		});
		const foot = h('i', {
			position: 'absolute',
			left: '-8px',
			bottom: '-4px',
			width: '30px',
			height: '4px',
			background: INK,
			borderRadius: '2px'
		});
		// The rod goes behind the barrel, so a stroke pushes it in rather than across.
		const pump = place(h('i', { width: '14px', height: '52px' }, [plunger, barrel, foot]), px, top);

		// The hose runs from the barrel to the button's right edge and stays on it while the
		// button grows: anchored at the pump, it scales towards it.
		const len = px - r.r;
		const hose = place(
			h('i', {
				height: '3px',
				background: INK,
				borderRadius: '2px',
				transformOrigin: '100% 50%'
			}),
			r.r,
			r.cy - 1.5,
			{ width: len + 'px' }
		);
		const reach = (sx: number) => `scaleX(${(px - (r.cx + (r.w / 2) * sx)) / len})`;

		stage.insertBefore(hose, b);
		stage.append(pump);
		await Promise.all([hose, pump].map((e) => A(e, [{ opacity: 0 }, { opacity: 1 }], 250)));

		let prev: Keyframe = { transform: 'scale(1,1)', borderRadius: '10px', background: CARD };
		let sx0 = 1;
		for (const [sx, sy, rad, bg] of PUFFS) {
			await A(plunger, [{ transform: 'translateY(0)' }, { transform: `translateY(${STROKE}px)` }], {
				duration: 260,
				easing: 'cubic-bezier(.6,0,.4,1)'
			});
			const next: Keyframe = { transform: `scale(${sx},${sy})`, borderRadius: rad, background: bg };
			const o = { duration: 420, easing: 'cubic-bezier(.3,1.4,.5,1)' };
			A(plunger, [{ transform: `translateY(${STROKE}px)` }, { transform: 'translateY(0)' }], 300);
			A(hose, [{ transform: reach(sx0) }, { transform: reach(sx) }], o);
			await A(
				b,
				[prev, { ...next, transform: `scale(${sx + 0.05},${sy - 0.08})`, offset: 0.6 }, next],
				o
			);
			prev = next;
			sx0 = sx;
			await wait(220);
		}
		// One stroke too many: it strains, trembling, before it gives.
		const [sx, sy] = PUFFS[PUFFS.length - 1];
		await A(
			b,
			Array.from({ length: 11 }, (_, i) => ({
				...prev,
				transform: `scale(${sx + (i % 2 ? 0.03 : 0)},${sy + (i % 2 ? 0.05 : 0)})`
			})),
			{ duration: 600, easing: 'linear' }
		);
		b.style.visibility = 'hidden';
		// The hose loses its balloon and snaps back towards the pump.
		A(
			hose,
			[
				{ transform: reach(sx), opacity: 1 },
				{ transform: 'scaleX(.3)', opacity: 0 }
			],
			{
				duration: 300,
				easing: 'cubic-bezier(.2,.8,.3,1)'
			}
		);
		A(pump, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, delay: 200 });
		ring(ctx, r.cx, r.cy, RED, 160);
		await burst(ctx, r.cx, r.cy, 24, ['#eeb2a2', color.fill, RED, INK], [50, 120]);
	})
} satisfies Effect;
