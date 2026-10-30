/**
 * 78 · Now you see it: a cloth drops over the button, a wand taps it twice with a sparkle,
 * and the cloth is whisked away from an empty stage.
 */
import { color, font } from '../../design/tokens.ts';
import { at, h, place, rel, rnd } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { GOLD, INK } from '../particles.ts';

export default {
	badge: 'Ta-da',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const W = stage.clientWidth;
		const cw = r.w + 36;
		const ch = r.h + 30;
		const cloth = place(
			h('i', {
				width: cw + 'px',
				height: ch + 'px',
				background: `repeating-linear-gradient(90deg,${color.curtain} 0 14px,#a23224 14px 16px)`,
				border: `1.5px solid ${INK}`,
				borderRadius: '40% 40% 6px 6px / 30% 30% 6px 6px',
				boxSizing: 'border-box'
			}),
			r.cx - cw / 2,
			r.b - ch + 2
		);
		stage.append(cloth);
		await A(
			cloth,
			[
				{ transform: `translateY(${-r.b - 10}px)`, opacity: 1 },
				{ transform: 'translateY(4px) scale(1.04,.96)', offset: 0.8 },
				{ transform: 'none' }
			],
			{ duration: 600, easing: 'cubic-bezier(.5,0,.6,1)' }
		);
		b.style.visibility = 'hidden';
		const wand = place(
			h('i', {
				width: '70px',
				height: '6px',
				background: `linear-gradient(90deg,${INK} 0 78%,#fff 78%)`,
				border: `1px solid ${INK}`,
				borderRadius: '3px',
				transformOrigin: '0 50%'
			}),
			r.cx - cw / 2 - 70,
			r.y - 24
		);
		stage.append(wand);
		await A(
			wand,
			[
				{ opacity: 0, transform: 'rotate(-30deg)' },
				{ opacity: 1, transform: 'rotate(-10deg)' }
			],
			250
		);
		const sparkle = (x: number, y: number) => {
			for (let i = 0; i < 6; i++) {
				const s = place(
					h('i', {
						width: '6px',
						height: '6px',
						background: GOLD,
						clipPath: 'polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)'
					}),
					x - 3,
					y - 3
				);
				stage.append(s);
				const a = (i / 6) * Math.PI * 2;
				A(
					s,
					[
						{ transform: 'translate(0,0) scale(.4)', opacity: 1 },
						{
							transform: `translate(${Math.cos(a) * rnd(14, 26)}px,${Math.sin(a) * rnd(14, 26)}px) scale(1.4) rotate(90deg)`,
							opacity: 0
						}
					],
					{ duration: 500, easing: 'cubic-bezier(.1,.8,.3,1)' }
				).then(() => s.remove());
			}
		};
		for (let i = 0; i < 2; i++) {
			await A(
				wand,
				[
					{ transform: 'rotate(-10deg)' },
					{ transform: 'rotate(18deg)' },
					{ transform: 'rotate(-10deg)' }
				],
				{
					duration: 360,
					easing: 'cubic-bezier(.5,0,.5,1)'
				}
			);
			sparkle(r.cx - cw / 2 + 4, r.y + 4);
			await wait(200);
		}
		await wait(250);
		A(wand, [{ opacity: 1 }, { opacity: 0 }], 250);
		await A(
			cloth,
			[
				{ transform: 'none' },
				{ transform: 'translateY(-14px) rotate(-4deg)', offset: 0.3 },
				{ transform: `translate(${W}px,-80px) rotate(30deg)` }
			],
			{ duration: 700, easing: 'cubic-bezier(.5,0,.7,.4)' }
		);
		const t = at(
			stage,
			h('div', { font: `700 18px/1 ${font.sans}`, color: INK, opacity: 0 }, 'ta-da!'),
			r.cx,
			r.cy
		);
		await A(
			t,
			[
				{ opacity: 0, transform: 'scale(.6)' },
				{ opacity: 1, transform: 'scale(1)', offset: 0.3 },
				{ opacity: 1, transform: 'scale(1)', offset: 0.8 },
				{ opacity: 0, transform: 'scale(1)' }
			],
			1000
		);
	})
} satisfies Effect;
