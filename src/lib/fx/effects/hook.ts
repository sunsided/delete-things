/** 40 · Reeled in: a hook drops in on a rope, catches the button and yanks it off the top. */
import { h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { INK } from '../particles.ts';

export default {
	badge: 'Reeled in',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const L = r.y - 6;
		const g = place(
			h('div', { width: '20px', height: L + 20 + 'px', transformOrigin: '50% 0' }, [
				h('i', {
					position: 'absolute',
					left: '9.25px',
					top: 0,
					width: '1.5px',
					height: L + 1 + 'px',
					background: INK
				}),
				h('i', {
					position: 'absolute',
					left: '7px',
					top: L - 3 + 'px',
					width: '6px',
					height: '4px',
					background: INK,
					borderRadius: '1px'
				}),
				// The U, clipped so its right arm ends under the rope and its left arm stays short.
				h('i', {
					position: 'absolute',
					left: '-4.75px',
					top: L - 1 + 'px',
					width: '16px',
					height: '18px',
					border: `2.5px solid ${INK}`,
					borderTop: 'none',
					borderRadius: '0 0 9px 9px',
					boxSizing: 'border-box',
					clipPath: 'polygon(0 30%,50% 30%,50% 0,100% 0,100% 100%,0 100%)'
				})
			]),
			r.cx - 10,
			0
		);
		stage.append(g);
		await A(
			g,
			[
				{ transform: `translateY(-${L + 30}px) rotate(0)` },
				{ transform: 'translateY(0) rotate(4deg)', offset: 0.75 },
				{ transform: 'translateY(0) rotate(-2deg)', offset: 0.9 },
				{ transform: 'translateY(0) rotate(0)' }
			],
			{ duration: 700, easing: 'cubic-bezier(.2,.7,.3,1)' }
		);
		b.style.transformOrigin = '50% 0';
		await A(
			b,
			[
				{ transform: 'rotate(0)' },
				{ transform: 'rotate(5deg)' },
				{ transform: 'rotate(-3deg)' },
				{ transform: 'rotate(0)' }
			],
			{ duration: 400, easing: 'cubic-bezier(.4,0,.6,1)' }
		);
		await wait(120);
		const up = `translateY(-${r.b + 40}px)`;
		await Promise.all([
			A(
				g,
				[
					{ transform: 'translateY(0)' },
					{ transform: 'translateY(10px)', offset: 0.15 },
					{ transform: up }
				],
				{
					duration: 620,
					easing: 'cubic-bezier(.6,0,.9,.4)'
				}
			),
			A(
				b,
				[
					{ transform: 'translateY(0) rotate(0)' },
					{ transform: 'translateY(10px) rotate(-3deg)', offset: 0.15 },
					{ transform: `${up} rotate(8deg)` }
				],
				{ duration: 620, easing: 'cubic-bezier(.6,0,.9,.4)' }
			)
		]);
	})
} satisfies Effect;
