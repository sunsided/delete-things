/** 23 · Robot vacuum: a top-down robot vacuum drives across the stage and sucks the button up. */
import { color } from '../../design/tokens.ts';
import { h, place, rel, rnd, S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { GREEN, INK } from '../particles.ts';

const D = 46;
const T = 1600;

/** A 14px cross-shaped side brush. */
const brush = () =>
	h('i', { position: 'absolute', width: '14px', height: '14px' }, [
		h('i', {
			position: 'absolute',
			left: '6px',
			top: 0,
			width: '2px',
			height: '14px',
			background: INK,
			borderRadius: '1px'
		}),
		h('i', {
			position: 'absolute',
			top: '6px',
			left: 0,
			height: '2px',
			width: '14px',
			background: INK,
			borderRadius: '1px'
		})
	]);

export default {
	badge: 'Vacuumed',
	setup: simple(async (ctx, b) => {
		const { stage, A } = ctx;
		const r = rel(stage, b);
		const W = stage.clientWidth;
		const x0 = W + D;
		const x1 = -D;
		const b1 = brush();
		const b2 = brush();
		S(b1, { left: '-4px', top: '-2px' });
		S(b2, { left: '-4px', bottom: '-2px' });
		const led = h('i', {
			position: 'absolute',
			left: '35px',
			top: '21px',
			width: '4px',
			height: '4px',
			borderRadius: '50%',
			background: GREEN
		});
		const bot = place(
			h('i', { width: D + 'px', height: D + 'px' }, [
				b1,
				b2,
				h('i', {
					position: 'absolute',
					inset: 0,
					borderRadius: '50%',
					background: color.vacuum,
					border: `2px solid ${INK}`,
					boxSizing: 'border-box'
				}),
				// The bumper: a thick ring clipped to its front (left) arc.
				h('i', {
					position: 'absolute',
					left: '2px',
					top: '2px',
					width: D - 4 + 'px',
					height: D - 4 + 'px',
					borderRadius: '50%',
					boxSizing: 'border-box',
					border: `5px solid ${color.ash}`,
					clipPath: 'inset(0 62% 0 0)'
				}),
				h('i', {
					position: 'absolute',
					left: '27px',
					top: '15px',
					width: '5px',
					height: '16px',
					borderRadius: '3px',
					background: INK
				}),
				led
			]),
			0,
			r.cy - D / 2
		);
		[b1, b2].forEach((x, i) =>
			x.animate([{ transform: 'rotate(0)' }, { transform: `rotate(${i ? -360 : 360}deg)` }], {
				duration: 300,
				iterations: Infinity
			})
		);
		stage.append(bot);
		led.animate([{ opacity: 1 }, { opacity: 0.3 }], {
			duration: 300,
			iterations: Infinity,
			direction: 'alternate'
		});
		const span = x0 - x1;
		const o0 = (x0 - r.r) / span;
		const o1 = (x0 - r.x) / span;
		const pathK: Keyframe[] = [];
		for (let i = 0; i <= 12; i++) {
			const t = i / 12;
			const cx = x0 - span * t;
			pathK.push({
				transform: `translateX(${cx - D / 2}px) translateY(${Math.sin(t * Math.PI * 8) * 1}px) rotate(${Math.sin(t * Math.PI * 4) * 4}deg)`
			});
		}
		A(
			b,
			[
				{ clipPath: 'inset(-3px 0px -3px -3px)', offset: 0 },
				{ clipPath: 'inset(-3px 0px -3px -3px)', offset: o0 },
				{ clipPath: `inset(-3px ${r.w + 3}px -3px -3px)`, offset: o1 },
				{ clipPath: `inset(-3px ${r.w + 3}px -3px -3px)`, offset: 1 }
			],
			{ duration: T, easing: 'linear' }
		);
		for (let i = 0; i < 14; i++) {
			const px = r.x + rnd(0, r.w);
			const py = r.cy + rnd(-r.h / 2 - 6, r.h / 2 + 6);
			const t = (x0 - px) / span;
			const s = rnd(2, 3.5);
			const p = place(
				h('i', {
					width: s + 'px',
					height: s + 'px',
					background: i % 2 ? INK : '#cfc7b8',
					borderRadius: '1px',
					opacity: 0
				}),
				px,
				py
			);
			stage.insertBefore(p, bot);
			A(
				p,
				[
					{ opacity: 1, transform: 'scale(1)' },
					{
						opacity: 1,
						transform: `translate(${rnd(-6, -2)}px,${(r.cy - py) * 0.6}px) scale(1)`,
						offset: 0.6
					},
					{ opacity: 0, transform: `translate(-10px,${(r.cy - py) * 0.8}px) scale(.2)` }
				],
				{ duration: 220, delay: Math.max(0, T * t - 260), easing: 'cubic-bezier(.6,0,.9,.5)' }
			);
		}
		await A(bot, pathK, { duration: T, easing: 'linear' });
	})
} satisfies Effect;
