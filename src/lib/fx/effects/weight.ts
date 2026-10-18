/** 37 · One-tonne weight: a 1T weight drops on the button and squashes it flat. */
import { font } from '../../design/tokens.ts';
import { h, jit, place, rel, rnd } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { CARD, INK } from '../particles.ts';

export default {
	badge: 'Flattened',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const sq = 0.16;
		const y2 = r.b - r.h * sq - 62;
		const y1 = r.y - 62;
		const fall = 440;
		const imp = fall * 0.86;
		const w = place(
			h('div', { width: '72px', height: '62px' }, [
				h('i', {
					position: 'absolute',
					left: '24px',
					top: 0,
					width: '24px',
					height: '18px',
					border: `4px solid ${INK}`,
					borderBottom: 'none',
					borderRadius: '12px 12px 0 0',
					boxSizing: 'border-box'
				}),
				h(
					'i',
					{
						position: 'absolute',
						left: 0,
						top: '14px',
						width: '72px',
						height: '48px',
						background: INK,
						clipPath: 'polygon(14% 0,86% 0,100% 100%,0 100%)',
						display: 'grid',
						placeItems: 'center',
						font: `700 15px/1 ${font.mono}`,
						color: CARD,
						fontStyle: 'normal'
					},
					'1T'
				)
			]),
			r.cx - 36,
			0
		);
		stage.append(w);
		A(
			w,
			[
				{ transform: 'translateY(-80px)', easing: 'cubic-bezier(.55,0,1,.45)' },
				{ transform: `translateY(${y1}px)`, offset: 0.86, easing: 'linear' },
				{ transform: `translateY(${y2}px)` }
			],
			{ duration: fall, easing: 'linear' }
		);
		b.style.transformOrigin = '50% 100%';
		await A(b, [{ transform: 'scale(1,1)' }, { transform: `scale(1.18,${sq})` }], {
			duration: fall - imp,
			delay: imp,
			easing: 'cubic-bezier(.2,.8,.3,1)'
		});
		A(stage, jit(7, 4), { duration: 280, easing: 'linear' });
		for (const s of [-1, 1])
			for (let i = 0; i < 5; i++) {
				const z = rnd(10, 18);
				const p = place(
					h('i', {
						width: z + 'px',
						height: z + 'px',
						borderRadius: '50%',
						background: '#d6cfc2',
						opacity: 0
					}),
					r.cx + s * (r.w * 0.55) - z / 2,
					r.b - z
				);
				stage.append(p);
				A(
					p,
					[
						{ opacity: 0.9, transform: 'translate(0,0) scale(.3)' },
						{ opacity: 0, transform: `translate(${s * rnd(20, 60)}px,${-rnd(0, 20)}px) scale(1.4)` }
					],
					{ duration: rnd(600, 900) }
				);
			}
		await A(
			w,
			[
				{ transform: `translateY(${y2}px)` },
				{ transform: `translateY(${y2 - 6}px)`, offset: 0.4 },
				{ transform: `translateY(${y2}px)` }
			],
			{ duration: 260, easing: 'cubic-bezier(.3,0,.5,1)' }
		);
		await wait(500);
		await Promise.all([
			A(w, [{ opacity: 1 }, { opacity: 0 }], 300),
			A(b, [{ opacity: 1 }, { opacity: 0 }], 300)
		]);
	})
} satisfies Effect;
