/**
 * 57 · Congratulations!: a party hat, a headline and confetti cannons, for deleting one file.
 * Then it pops.
 */
import { color, font } from '../../design/tokens.ts';
import { at, h, place, rel, rnd } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { burst, GOLD, GREEN, INK, MUTE, ORANGE, RED, ring } from '../particles.ts';

const COLS = [RED, GOLD, color.teal, GREEN, ORANGE];

export default {
	badge: null,
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const W = stage.clientWidth;
		const H = stage.clientHeight;
		const hat = place(
			h('i', {
				width: '22px',
				height: '28px',
				background: `repeating-linear-gradient(135deg,${GOLD} 0 5px,${RED} 5px 10px)`,
				clipPath: 'polygon(50% 0,100% 100%,0 100%)'
			}),
			r.x + 8,
			r.y - 24
		);
		stage.append(hat);
		await A(
			hat,
			[
				{ transform: 'translateY(-60px) rotate(-30deg)', opacity: 0 },
				{ transform: 'rotate(-14deg)', opacity: 1 }
			],
			{ duration: 400, easing: 'cubic-bezier(.3,1.5,.5,1)' }
		);
		const big = at(
			stage,
			h(
				'div',
				{ font: `700 22px/1 ${font.sans}`, color: INK, letterSpacing: '-.02em', opacity: 0 },
				'Congratulations!'
			),
			W / 2,
			32
		);
		const sub = at(
			stage,
			h(
				'div',
				{ font: `400 12px/1 ${font.mono}`, color: MUTE, opacity: 0, whiteSpace: 'nowrap' },
				'You deleted 1 file. A personal best.'
			),
			W / 2,
			H - 24
		);
		[big, sub].forEach((e, i) =>
			A(
				e,
				[
					{ opacity: 0, transform: 'scale(.6)' },
					{ opacity: 1, transform: 'scale(1)' }
				],
				{ duration: 400, delay: i * 150, easing: 'cubic-bezier(.3,1.6,.5,1)' }
			)
		);
		// A cannon in each bottom corner, firing up and inwards.
		for (const side of [0, 1])
			for (let i = 0; i < 24; i++) {
				const w = rnd(4, 8);
				const hh = rnd(3, 6);
				const p = place(
					h('i', { width: w + 'px', height: hh + 'px', background: COLS[i % 5] }),
					side ? W - 10 : 10,
					H - 10
				);
				stage.append(p);
				const vx = (side ? -1 : 1) * rnd(40, W * 0.55);
				const vy = -rnd(100, 190);
				A(
					p,
					[
						{ transform: 'translate(0,0) rotate(0)', opacity: 1 },
						{
							transform: `translate(${vx * 0.6}px,${vy}px) rotate(${rnd(-300, 300)}deg)`,
							opacity: 1,
							offset: 0.45
						},
						{
							transform: `translate(${vx}px,${vy + rnd(90, 150)}px) rotate(${rnd(-600, 600)}deg)`,
							opacity: 0
						}
					],
					{ duration: rnd(1200, 1700), easing: 'cubic-bezier(.2,.6,.4,1)' }
				);
			}
		await A(
			b,
			[
				{ transform: 'translateY(0)' },
				{ transform: 'translateY(-10px)', offset: 0.25 },
				{ transform: 'translateY(0)', offset: 0.5 },
				{ transform: 'translateY(-6px)', offset: 0.75 },
				{ transform: 'translateY(0)' }
			],
			800
		);
		await wait(500);
		b.style.visibility = 'hidden';
		hat.remove();
		ring(ctx, r.cx, r.cy, GOLD, 90);
		burst(ctx, r.cx, r.cy, 14, COLS, [30, 70]);
		await wait(1000);
		return null;
	})
} satisfies Effect;
