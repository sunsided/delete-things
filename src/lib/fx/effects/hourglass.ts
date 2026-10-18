/** 24 · Sands of time: the button turns to sand and drains into a pile, which blows away. */
import { color } from '../../design/tokens.ts';
import { h, place, rel, rnd } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { CARD, INK } from '../particles.ts';

const T = 1700;

export default {
	badge: 'Time’s up',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const floor = stage.clientHeight - 16;
		A(b.icon, [{ opacity: 1 }, { opacity: 0 }], 250);
		await A(
			b,
			[
				{ background: CARD, borderColor: INK, color: INK },
				{ background: color.sand, borderColor: color.sandDark, color: '#8a6f3d' }
			],
			350
		);
		const stream = place(
			h('i', {
				width: '2px',
				background: color.sandEdge,
				transformOrigin: 'top',
				transform: 'scaleY(0)'
			}),
			r.cx - 1,
			r.b,
			{ height: floor - r.b + 'px' }
		);
		const pile = place(
			h('i', {
				width: '110px',
				height: '30px',
				background: color.sand,
				clipPath: 'polygon(50% 0,100% 100%,0 100%)',
				transformOrigin: '50% 100%',
				transform: 'scale(.2,0)'
			}),
			r.cx - 55,
			floor - 30
		);
		stage.append(stream, pile);
		await A(stream, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], {
			duration: 200,
			easing: 'cubic-bezier(.5,0,1,.5)'
		});
		A(b, [{ clipPath: 'inset(0% -2px -2px -2px)' }, { clipPath: 'inset(100% -2px -2px -2px)' }], {
			duration: T,
			easing: 'cubic-bezier(.3,0,.7,1)'
		});
		for (let i = 0; i < 24; i++) {
			const p = place(
				h('i', { width: '2px', height: '2px', background: color.sandDark, opacity: 0 }),
				r.cx + rnd(-3, 3),
				r.b
			);
			stage.append(p);
			A(
				p,
				[
					{ opacity: 1, transform: 'translateY(0)' },
					{ opacity: 1, transform: `translate(${rnd(-6, 6)}px,${floor - r.b - 6}px)` }
				],
				{ duration: 380, delay: (i * T) / 24, easing: 'cubic-bezier(.5,0,1,.5)' }
			);
		}
		await A(pile, [{ transform: 'scale(.2,0)' }, { transform: 'scale(1,1)' }], {
			duration: T + 200,
			easing: 'cubic-bezier(.2,.5,.5,1)'
		});
		A(
			stream,
			[
				{ transform: 'scaleY(1)', transformOrigin: 'bottom' },
				{ transform: 'scaleY(0)', transformOrigin: 'bottom' }
			],
			200
		);
		await wait(250);
		await A(
			pile,
			[
				{ transform: 'scale(1,1)', opacity: 1 },
				{ transform: 'translateX(60px) scale(1.4,.3)', opacity: 0 }
			],
			{ duration: 600, easing: 'cubic-bezier(.5,0,.8,.6)' }
		);
	})
} satisfies Effect;
