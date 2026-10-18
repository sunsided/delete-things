/** 17 · Burn after reading: a glowing edge burns the button away from the bottom up. */
import { h, place, rel, rnd, S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { GOLD, ORANGE, RED } from '../particles.ts';

const T = 1500;

export default {
	badge: 'Burned',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		S(b, { overflow: 'hidden' });
		const char = h('i', {
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			height: '100%',
			background:
				'linear-gradient(to top,#2b1a10 0%,rgba(80,40,20,.7) 14%,rgba(120,60,20,.25) 32%,rgba(0,0,0,0) 50%)',
			opacity: 0,
			pointerEvents: 'none'
		});
		b.append(char);
		const edge = place(
			h('i', {
				width: r.w + 6 + 'px',
				height: '4px',
				borderRadius: '2px',
				background: `linear-gradient(90deg,${ORANGE},${RED},${GOLD},${ORANGE},${RED})`,
				boxShadow: '0 0 10px 3px rgba(240,140,40,.7)'
			}),
			r.x - 3,
			r.b - 3
		);
		stage.append(edge);
		A(b, [{ clipPath: 'inset(-2px -2px 0% -2px)' }, { clipPath: 'inset(-2px -2px 100% -2px)' }], {
			duration: T,
			easing: 'linear'
		});
		A(
			char,
			[
				{ opacity: 0, transform: 'translateY(0)' },
				{ opacity: 1, transform: `translateY(-${r.h * 0.1}px)`, offset: 0.1 },
				{ opacity: 1, transform: `translateY(-${r.h}px)` }
			],
			{ duration: T, easing: 'linear' }
		);
		edge.animate([{ filter: 'brightness(1)' }, { filter: 'brightness(1.4)' }], {
			duration: 90,
			iterations: Infinity,
			direction: 'alternate'
		});
		for (let i = 0; i < 28; i++) {
			const t = Math.random();
			const s = rnd(2, 3.5);
			const p = place(
				h('i', {
					width: s + 'px',
					height: s + 'px',
					borderRadius: '50%',
					background: [ORANGE, RED, GOLD][i % 3],
					boxShadow: `0 0 4px ${ORANGE}`,
					opacity: 0
				}),
				r.x + rnd(0, r.w),
				r.b - r.h * t
			);
			stage.append(p);
			A(
				p,
				[
					{ opacity: 1, transform: 'translate(0,0)' },
					{ opacity: 0, transform: `translate(${rnd(-14, 14)}px,${-rnd(25, 65)}px)` }
				],
				{ duration: rnd(600, 1000), delay: t * T, easing: 'cubic-bezier(.2,.6,.4,1)' }
			);
		}
		for (let i = 0; i < 6; i++) {
			const t = i / 6;
			const p = place(
				h('i', {
					width: '18px',
					height: '18px',
					borderRadius: '50%',
					background: '#bdb5a7',
					filter: 'blur(4px)',
					opacity: 0
				}),
				r.x + rnd(10, r.w - 28),
				r.b - r.h * t - 10
			);
			stage.insertBefore(p, b);
			A(
				p,
				[
					{ opacity: 0.55, transform: 'translateY(0) scale(.6)' },
					{ opacity: 0, transform: `translate(${rnd(-10, 10)}px,-60px) scale(1.8)` }
				],
				{ duration: 1200, delay: t * T }
			);
		}
		await A(
			edge,
			[
				{ transform: 'translateY(0)', opacity: 1 },
				{ transform: `translateY(-${r.h * 0.92}px)`, opacity: 1, offset: 0.92 },
				{ transform: `translateY(-${r.h}px) scaleX(.6)`, opacity: 0 }
			],
			{ duration: T, easing: 'linear' }
		);
		await wait(500);
	})
} satisfies Effect;
