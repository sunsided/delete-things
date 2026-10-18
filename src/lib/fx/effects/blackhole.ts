/** 07 · Event horizon: a black hole opens behind the button and spirals every letter into it. */
import { h, place, rel, split } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { fadeFrame, INK, RED, ring } from '../particles.ts';

export default {
	badge: 'Consumed',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const pieces: HTMLElement[] = [b.icon, ...split(b.text)];
		const hole = place(
			h('div', {
				width: '64px',
				height: '64px',
				borderRadius: '50%',
				background: `radial-gradient(circle, ${INK} 0 34%, ${RED} 44%, rgba(212,70,47,.25) 58%, rgba(212,70,47,0) 70%)`,
				transform: 'scale(0)'
			}),
			r.cx - 32,
			r.cy - 32
		);
		hole.setAttribute('aria-hidden', 'true');
		stage.insertBefore(hole, b);
		fadeFrame(ctx, b, 300);
		await A(hole, [{ transform: 'scale(0)' }, { transform: 'scale(1)' }], {
			duration: 420,
			easing: 'cubic-bezier(.3,1.4,.5,1)'
		});
		const pulse = hole.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.08)' }], {
			duration: 300,
			iterations: Infinity,
			direction: 'alternate'
		});
		const sr = stage.getBoundingClientRect();
		await Promise.all(
			pieces.map((p, i) => {
				const q = p.getBoundingClientRect();
				const ux = q.left + q.width / 2 - sr.left - r.cx;
				const uy = q.top + q.height / 2 - sr.top - r.cy;
				// The midpoint is the offset turned 90° and scaled .6, which bends the path into a spiral.
				const mx = -ux - uy * 0.6;
				const my = -uy + ux * 0.6;
				return A(
					p,
					[
						{ transform: 'translate(0,0) rotate(0) scale(1)' },
						{ transform: `translate(${mx}px,${my}px) rotate(200deg) scale(.6)`, offset: 0.6 },
						{ transform: `translate(${-ux}px,${-uy}px) rotate(480deg) scale(0)`, opacity: 0 }
					],
					{ duration: 760, delay: i * 55, easing: 'cubic-bezier(.5,0,.9,.5)' }
				);
			})
		);
		pulse.cancel();
		await A(
			hole,
			[
				{ transform: 'scale(1)' },
				{ transform: 'scale(1.3)', offset: 0.3 },
				{ transform: 'scale(0)' }
			],
			{
				duration: 420,
				easing: 'cubic-bezier(.6,0,.4,1)'
			}
		);
		ring(ctx, r.cx, r.cy, RED, 120);
		await wait(250);
	})
} satisfies Effect;
