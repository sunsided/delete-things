/** 28 · Washed away: rain falls across the stage and the letters run down and dissolve. */
import { color } from '../../design/tokens.ts';
import { h, place, rnd, split } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { CARD, CLEAR, INK } from '../particles.ts';

export default {
	badge: 'Washed away',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const W = stage.clientWidth;
		const H = stage.clientHeight;
		const floor = H - 16;
		for (let i = 0; i < 46; i++) {
			const l = rnd(8, 16);
			const d = place(
				h('i', {
					width: '1.5px',
					height: l + 'px',
					background: color.rain,
					opacity: 0,
					borderRadius: '1px'
				}),
				rnd(0, W),
				-20
			);
			stage.append(d);
			A(
				d,
				[
					{ opacity: 0.8, transform: 'translateY(0)' },
					{ opacity: 0.8, transform: `translateY(${floor + 10}px)` }
				],
				{
					duration: rnd(450, 650),
					delay: rnd(0, 1500),
					easing: 'cubic-bezier(.5,0,1,.6)'
				}
			);
		}
		for (let i = 0; i < 8; i++) {
			const e = place(
				h('i', {
					width: '30px',
					height: '8px',
					borderRadius: '50%',
					border: `1.5px solid ${color.rain}`,
					boxSizing: 'border-box',
					opacity: 0
				}),
				rnd(20, W - 50),
				floor - 4
			);
			stage.append(e);
			A(
				e,
				[
					{ opacity: 0.8, transform: 'scale(.2)' },
					{ opacity: 0, transform: 'scale(1.4)' }
				],
				{
					duration: 600,
					delay: rnd(500, 1900)
				}
			);
		}
		await wait(500);
		const pieces: HTMLElement[] = [b.icon, ...split(b.text)];
		A(
			b,
			[
				{ borderColor: INK, background: CARD },
				{ borderColor: 'rgba(125,167,196,.5)', background: CLEAR, offset: 0.6 },
				{ borderColor: CLEAR, background: CLEAR, transform: 'translateY(14px) scaleY(.9)' }
			],
			1200
		);
		await Promise.all(
			pieces.map((p) =>
				A(
					p,
					[
						{ transform: 'translateY(0) scaleY(1)', filter: 'blur(0)', opacity: 1 },
						{
							transform: `translateY(${rnd(4, 10)}px) scaleY(1.3)`,
							filter: 'blur(1px)',
							opacity: 0.9,
							offset: 0.4
						},
						{
							transform: `translateY(${rnd(50, 70)}px) scaleY(2.6)`,
							filter: 'blur(4px)',
							opacity: 0
						}
					],
					{ duration: 1100, delay: rnd(0, 400), easing: 'cubic-bezier(.5,0,.8,.7)' }
				)
			)
		);
	})
} satisfies Effect;
