/** 35 · Struck by lightning: a bolt hits, the button chars, smokes and crumbles into ash. */
import { color } from '../../design/tokens.ts';
import { h, jit, place, rel, rnd } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { CARD, GOLD, INK } from '../particles.ts';

export default {
	badge: 'Fried',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const flash = place(h('i', { background: '#fff', opacity: 0 }), 0, 0, {
			width: '100%',
			height: '100%'
		});
		const bolt = place(
			h('i', {
				width: '44px',
				background: GOLD,
				clipPath: 'polygon(58% 0,18% 54%,46% 54%,28% 100%,84% 38%,56% 38%,78% 0)',
				filter: 'drop-shadow(0 0 6px rgba(255,190,60,.9))',
				opacity: 0
			}),
			r.cx - 22,
			0,
			{ height: r.y + 16 + 'px' }
		);
		stage.append(flash, bolt);
		await wait(150);
		A(
			flash,
			[{ opacity: 0 }, { opacity: 0.85 }, { opacity: 0 }, { opacity: 0.6 }, { opacity: 0 }],
			{
				duration: 320,
				easing: 'linear'
			}
		);
		A(
			bolt,
			[
				{ opacity: 0 },
				{ opacity: 1 },
				{ opacity: 0.2 },
				{ opacity: 1 },
				{ opacity: 1, offset: 0.8 },
				{ opacity: 0 }
			],
			{
				duration: 420,
				easing: 'linear'
			}
		);
		await wait(120);
		A(stage, jit(6, 3), { duration: 220, easing: 'linear' });
		// The icon draws in currentColor, so charring the text colour chars the icon too.
		await A(
			b,
			[
				{ background: CARD, color: INK, borderColor: INK },
				{ background: color.char, color: color.ash, borderColor: color.char }
			],
			{ duration: 120, easing: 'steps(1)' }
		);
		for (let i = 0; i < 6; i++) {
			const s = rnd(12, 20);
			const p = place(
				h('i', {
					width: s + 'px',
					height: s + 'px',
					borderRadius: '50%',
					background: '#9c958a',
					filter: 'blur(3px)',
					opacity: 0
				}),
				r.x + rnd(10, r.w - 20),
				r.y - 6
			);
			stage.append(p);
			A(
				p,
				[
					{ opacity: 0.6, transform: 'translateY(0) scale(.5)' },
					{ opacity: 0, transform: `translate(${rnd(-10, 10)}px,-50px) scale(1.6)` }
				],
				{ duration: 1100, delay: i * 90 }
			);
		}
		await wait(600);
		const c = 6;
		const ps: Promise<void>[] = [];
		for (let y = 0; y < r.h; y += c)
			for (let x = 0; x < r.w; x += c) {
				if (Math.random() < 0.45) continue;
				const s = rnd(2, 4.5);
				const p = place(
					h('i', {
						width: s + 'px',
						height: s + 'px',
						background: Math.random() < 0.5 ? color.char : color.ash,
						opacity: 0
					}),
					r.x + x,
					r.y + y
				);
				stage.append(p);
				ps.push(
					A(
						p,
						[
							{ opacity: 1, transform: 'translate(0,0)' },
							{
								opacity: 0,
								transform: `translate(${rnd(-8, 8)}px,${stage.clientHeight - r.y - y - 12}px)`
							}
						],
						{
							duration: rnd(500, 800),
							delay: (r.h - y) * 8 + rnd(0, 150),
							easing: 'cubic-bezier(.5,0,1,.5)'
						}
					)
				);
			}
		A(b, [{ clipPath: 'inset(0 -2px 0% -2px)' }, { clipPath: 'inset(0 -2px 100% -2px)' }], {
			duration: r.h * 8 + 200,
			easing: 'linear'
		});
		await Promise.all(ps);
	})
} satisfies Effect;
