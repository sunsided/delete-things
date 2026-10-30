/**
 * 67 · Zipped: a zip runs along the button's middle and the slider pulls it shut, left to
 * right, until only the closed teeth are left. Then those go too.
 */
import { h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { INK, LINE } from '../particles.ts';

/** The button's outline with the zip closed up to p (0–100): a clip-path polygon. */
const shut = (p: number) =>
	`polygon(0% 50%, ${p}% 50%, ${p}% 0%, 100% 0%, 100% 100%, ${p}% 100%, ${p}% 50%, 0% 50%)`;

export default {
	badge: 'Zipped',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const teeth = place(
			h('i', {
				width: r.w + 'px',
				height: '6px',
				background: `repeating-linear-gradient(90deg,${INK} 0 3px,transparent 3px 6px)`,
				transformOrigin: '0 50%'
			}),
			r.x,
			r.cy - 3
		);
		const slider = place(
			h('i', {
				width: '14px',
				height: '18px',
				background: LINE,
				border: `1.5px solid ${INK}`,
				borderRadius: '3px 3px 7px 7px',
				boxSizing: 'border-box'
			}),
			r.x - 10,
			r.cy - 7
		);
		stage.append(teeth, slider);
		await A(teeth, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], 300);
		await A(slider, [{ opacity: 0 }, { opacity: 1 }], 150);
		const D = 1300;
		const easing = 'cubic-bezier(.5,0,.5,1)';
		A(slider, [{ transform: 'translateX(0)' }, { transform: `translateX(${r.w + 4}px)` }], {
			duration: D,
			easing
		});
		await A(b, [{ clipPath: shut(0) }, { clipPath: shut(100) }], { duration: D, easing });
		b.style.visibility = 'hidden';
		await wait(300);
		await A(
			slider,
			[
				{ transform: `translateX(${r.w + 4}px)` },
				{ transform: `translateX(${r.w + 4}px) translateY(-8px)`, offset: 0.3 },
				{ transform: `translateX(${r.w + 4}px) translateY(-8px)`, opacity: 0 }
			],
			300
		);
		await A(
			teeth,
			[
				{ transform: 'scaleX(1)', opacity: 1 },
				{ transform: 'scaleX(0)', opacity: 0 }
			],
			{ duration: 400, easing: 'cubic-bezier(.6,0,.8,.4)' }
		);
	})
} satisfies Effect;
