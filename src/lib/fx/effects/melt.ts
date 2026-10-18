/** 14 · Meltdown: the button fills with ink, drips, and sags into a puddle that fades. */
import { h, place, rel, rnd } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { CARD, INK } from '../particles.ts';

export default {
	badge: 'Melted',
	setup: simple(async (ctx, b) => {
		const { stage, A } = ctx;
		const r = rel(stage, b);
		b.style.transformOrigin = '50% 100%';
		A(b.icon, [{ opacity: 1 }, { opacity: 0 }], 200);
		await A(
			b,
			[
				{ background: CARD, color: INK },
				{ background: INK, color: INK }
			],
			350
		);
		const drips = Array.from({ length: 7 }, (_, i) => {
			const w = rnd(6, 12);
			const x = r.x + 8 + (r.w - 16 - w) * (i / 6) + rnd(-3, 3);
			const d = place(
				h('i', {
					width: w + 'px',
					height: '44px',
					background: INK,
					borderRadius: `0 0 ${w}px ${w}px`,
					transformOrigin: 'top',
					transform: 'scaleY(0)'
				}),
				x,
				r.b - 6
			);
			stage.insertBefore(d, b);
			return d;
		});
		for (const d of drips)
			A(d, [{ transform: 'scaleY(0)' }, { transform: `scaleY(${rnd(0.35, 1.3)})` }], {
				duration: rnd(900, 1300),
				delay: rnd(0, 300),
				easing: 'cubic-bezier(.5,0,.5,1)'
			});
		await A(
			b,
			[
				{ transform: 'scale(1,1)', borderRadius: '10px' },
				{ transform: 'scale(1.03,.8)', borderRadius: '10px 10px 16px 16px', offset: 0.4 },
				{ transform: 'scale(1.18,.1)', borderRadius: '50%' }
			],
			{ duration: 1500, easing: 'cubic-bezier(.5,0,.6,1)' }
		);
		await Promise.all([
			...drips.map((d, i) =>
				A(
					d,
					[{ opacity: 1 }, { opacity: 0, transform: `translateY(${rnd(40, 70)}px) scaleY(.6)` }],
					{ duration: 500, delay: i * 40, easing: 'cubic-bezier(.5,0,.9,.6)' }
				)
			),
			A(b, [{ opacity: 1 }, { opacity: 0 }], 500)
		]);
	})
} satisfies Effect;
