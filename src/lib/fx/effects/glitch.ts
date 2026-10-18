/** 15 · Glitch & CRT off: red and teal clones tear through the button, then it powers off. */
import { color } from '../../design/tokens.ts';
import { at, h, place, rel, rnd, S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { INK, RED } from '../particles.ts';

const N = 14;

export default {
	badge: 'Signal lost',
	setup: simple(async (ctx, b) => {
		const { stage, A } = ctx;
		const r = rel(stage, b);
		const mk = (c: string) => {
			const k = b.cloneNode(true) as HTMLButtonElement;
			k.tabIndex = -1;
			k.setAttribute('aria-hidden', 'true');
			place(k, r.x, r.y, {
				width: r.w + 'px',
				height: r.h + 'px',
				margin: 0,
				color: c,
				borderColor: c,
				background: 'transparent',
				mixBlendMode: 'multiply',
				opacity: 0.85
			});
			stage.append(k);
			return k;
		};
		const c1 = mk(RED);
		const c2 = mk(color.teal);
		const fr = (): Keyframe[] =>
			Array.from({ length: N }, () => {
				const a = rnd(0, 70);
				return {
					transform: `translate(${rnd(-7, 7)}px,${rnd(-2, 2)}px)`,
					clipPath: `inset(${a}% 0 ${Math.max(0, 100 - a - rnd(12, 45))}% 0)`
				};
			});
		const steps = { duration: 700, easing: `steps(${N})` };
		await Promise.all([
			A(c1, fr(), steps),
			A(c2, fr(), steps),
			A(
				b,
				Array.from({ length: N }, (_, i) => ({
					transform: i % 3 ? `translateX(${rnd(-3, 3)}px) skewX(${rnd(-10, 10)}deg)` : 'none'
				})),
				steps
			)
		]);
		const off: Keyframe[] = [
			{ transform: 'scale(1,1)', filter: 'brightness(1)' },
			{ transform: 'scale(1.1,.04)', filter: 'brightness(2)', offset: 0.5 },
			{ transform: 'scale(0,.04)' }
		];
		for (const c of [c1, c2]) S(c, { clipPath: 'none' });
		await Promise.all(
			[b, c1, c2].map((e) => A(e, off, { duration: 380, easing: 'cubic-bezier(.7,0,.3,1)' }))
		);
		const dot = at(
			stage,
			h('i', {
				width: '6px',
				height: '6px',
				borderRadius: '50%',
				background: '#fff',
				boxShadow: `0 0 10px 3px ${INK}`
			}),
			r.cx,
			r.cy
		);
		await A(
			dot,
			[
				{ opacity: 1, transform: 'scale(1)' },
				{ opacity: 0, transform: 'scale(0)' }
			],
			380
		);
	})
} satisfies Effect;
