/** 12 · Short fuse: a spark runs down a lit fuse and the button detonates. */
import { at, h, jit, place, rel, rnd } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { burst, CARD, GOLD, INK, LINE, ORANGE, RED, ring } from '../particles.ts';

const T = 1000;
const FLASH = '#fff3c4';

export default {
	badge: 'Detonated',
	setup: simple(async (ctx, b) => {
		const { stage, A } = ctx;
		const r = rel(stage, b);
		const x0 = Math.max(10, r.x - 70);
		const len = r.x - x0;
		const y = r.cy;
		const cord = place(
			h('i', {
				width: len + 'px',
				height: '2px',
				background: INK,
				transformOrigin: 'right',
				borderRadius: '1px'
			}),
			x0,
			y - 1
		);
		stage.insertBefore(cord, b);
		await A(cord, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], 220);
		const spark = place(
			h('i', {
				width: '8px',
				height: '8px',
				borderRadius: '50%',
				background: GOLD,
				boxShadow: '0 0 10px 3px rgba(240,150,40,.85)'
			}),
			x0 - 4,
			y - 4
		);
		stage.append(spark);
		spark.animate([{ transform: 'scale(.7)' }, { transform: 'scale(1.4)' }], {
			duration: 70,
			iterations: Infinity,
			direction: 'alternate'
		});
		A(cord, [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], {
			duration: T,
			easing: 'linear'
		});
		for (let i = 0; i < 14; i++) {
			const p = place(
				h('i', { width: '2px', height: '2px', background: i % 2 ? ORANGE : GOLD, opacity: 0 }),
				x0 + len * (i / 14),
				y
			);
			stage.append(p);
			A(
				p,
				[
					{ opacity: 1, transform: 'translate(0,0)' },
					{ opacity: 0, transform: `translate(${rnd(-14, 6)}px,${rnd(-22, 10)}px)` }
				],
				{ duration: 400, delay: (T * i) / 14 }
			);
		}
		await A(spark, [{ left: x0 - 4 + 'px' }, { left: r.x - 4 + 'px' }], {
			duration: T,
			easing: 'linear'
		});
		await A(b, jit(14, 3), { duration: 380, easing: 'linear' });
		await A(b, [{ background: CARD }, { background: FLASH }], 80);
		b.style.visibility = 'hidden';
		spark.remove();
		cord.remove();
		const puff = at(
			stage,
			h('i', {
				width: '90px',
				height: '90px',
				borderRadius: '50%',
				background: `radial-gradient(circle,${FLASH} 0 30%,rgba(240,164,58,.5) 55%,rgba(240,164,58,0) 70%)`
			}),
			r.cx,
			r.cy
		);
		A(
			puff,
			[
				{ transform: 'scale(.2)', opacity: 1 },
				{ transform: 'scale(1.6)', opacity: 0 }
			],
			{ duration: 500 }
		);
		ring(ctx, r.cx, r.cy, ORANGE, 150);
		A(stage, jit(8, 4), { duration: 300, easing: 'linear' });
		await burst(ctx, r.cx, r.cy, 26, [INK, RED, ORANGE, LINE], [50, 150]);
	})
} satisfies Effect;
