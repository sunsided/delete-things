/** 34 · Quicksand: a band of sand rises and the button sinks into it with a dying wobble. */
import { color } from '../../design/tokens.ts';
import { h, place, rel, rnd } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';

export default {
	badge: 'Swallowed',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const surf = r.cy + 10;
		const H = stage.clientHeight;
		const sand = place(
			h('i', {
				left: 0,
				right: 0,
				background: `radial-gradient(#cdb685 1px,transparent 1.2px) 0 0/6px 6px, ${color.sand}`,
				borderTop: `2px solid ${color.sandEdge}`,
				opacity: 0
			}),
			0,
			surf,
			{ width: '100%', height: H - surf + 'px' }
		);
		stage.insertBefore(sand, b);
		await A(
			sand,
			[
				{ opacity: 0, transform: 'translateY(20px)' },
				{ opacity: 1, transform: 'none' }
			],
			350
		);
		// Sampled ease-in-out sink with a decaying wobble; the clip keeps everything below the surface hidden.
		const above = r.b - surf;
		const D = r.h + 14 - above;
		const k: Keyframe[] = [];
		for (let i = 0; i <= 20; i++) {
			const t = i / 20;
			const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
			const y = D * e;
			k.push({
				transform: `translateY(${y}px) rotate(${Math.sin(t * Math.PI * 6) * 4 * (1 - t)}deg)`,
				clipPath: `inset(-4px -4px ${Math.min(r.h + 4, Math.max(0, above + y))}px -4px)`
			});
		}
		for (let i = 0; i < 7; i++) {
			const s = rnd(4, 8);
			const p = place(
				h('i', {
					width: s + 'px',
					height: s + 'px',
					borderRadius: '50%',
					border: `1.5px solid ${color.sandDark}`,
					boxSizing: 'border-box',
					opacity: 0
				}),
				r.cx + rnd(-r.w / 2, r.w / 2),
				surf - s / 2
			);
			stage.append(p);
			A(
				p,
				[
					{ opacity: 0, transform: 'scale(.2)' },
					{ opacity: 1, transform: 'scale(1)', offset: 0.7 },
					{ opacity: 0, transform: 'scale(1.5)' }
				],
				{ duration: 500, delay: 900 + i * 180 }
			);
		}
		await A(b, k, { duration: 1800, easing: 'linear' });
		b.style.visibility = 'hidden';
		await wait(500);
		await A(sand, [{ opacity: 1 }, { opacity: 0 }], 300);
	})
} satisfies Effect;
