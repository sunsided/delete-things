/** 03 · Shredder: the button collapses into a slot that shreds a document into falling strips. */
import { h, jit, place, rel, rnd } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { doc } from '../parts.ts';
import { CARD, INK } from '../particles.ts';

const T = 1200;

export default {
	badge: 'Shredded',
	setup: simple(async (ctx, b) => {
		const { stage, A, sp } = ctx;
		const r = rel(stage, b);
		A(b.icon, [{ opacity: 1 }, { opacity: 0 }], 200);
		await A(b.text, [{ opacity: 1 }, { opacity: 0 }], 200);
		await A(
			b,
			[
				{ height: r.h + 'px', background: CARD, borderRadius: '10px' },
				{ height: '10px', background: INK, borderRadius: '5px' }
			],
			{ duration: 350, easing: 'cubic-bezier(.5,0,.2,1)' }
		);
		const d = doc();
		const dx = r.cx - 11;
		place(d, dx, r.cy - 70);
		stage.insertBefore(d, b);
		const p = A(
			d,
			[
				{ transform: 'translateY(-30px)', opacity: 0, clipPath: 'inset(0 0 0px 0)' },
				{ transform: 'translateY(0)', opacity: 1, clipPath: 'inset(0 0 0px 0)', offset: 0.25 },
				{ transform: 'translateY(42px)', opacity: 1, clipPath: 'inset(0 0 0px 0)', offset: 0.45 },
				{ transform: 'translateY(70px)', opacity: 1, clipPath: 'inset(0 0 28px 0)' }
			],
			{ duration: T, easing: 'linear' }
		);
		const strips = Array.from({ length: 5 }, (_, i) => {
			const s = place(
				h('i', {
					width: '3.6px',
					height: '28px',
					background: '#fff',
					borderLeft: `1px solid ${INK}`,
					borderRight: `1px solid ${INK}`,
					boxSizing: 'border-box',
					transformOrigin: 'top'
				}),
				dx + i * 4.6,
				r.cy + 5
			);
			stage.append(s);
			A(s, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], {
				duration: T * 0.55,
				delay: T * 0.45,
				easing: 'linear',
				fill: 'both'
			});
			return s;
		});
		b.animate(jit(10, 1), { duration: 120 / sp(), iterations: Math.ceil(T / 120) });
		await p;
		d.remove();
		await Promise.all(
			strips.map((s, i) =>
				A(
					s,
					[
						{ transform: 'translateY(0) rotate(0)', opacity: 1 },
						{
							transform: `translate(${rnd(-14, 14)}px,${rnd(70, 100)}px) rotate(${rnd(-50, 50)}deg)`,
							opacity: 0
						}
					],
					{ duration: 700, delay: i * 60, easing: 'cubic-bezier(.5,0,.9,.6)' }
				)
			)
		);
		await A(b, [{ opacity: 1 }, { opacity: 0, transform: 'scaleX(.6)' }], 250);
	})
} satisfies Effect;
