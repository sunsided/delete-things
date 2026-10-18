/** 13 · Eraser: a pink eraser scrubs the button away, shedding crumbs. */
import { h, place, rel, rnd } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { INK } from '../particles.ts';

const T = 1300;
const N = 11;

export default {
	badge: 'Erased',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const er = place(
			h(
				'i',
				{
					width: '40px',
					height: '22px',
					borderRadius: '4px',
					background: '#e9a596',
					border: `1.5px solid ${INK}`,
					boxSizing: 'border-box',
					overflow: 'hidden'
				},
				h('i', {
					display: 'block',
					width: '15px',
					height: '100%',
					background: '#efe9dc',
					borderRight: `1.5px solid ${INK}`
				})
			),
			0,
			0,
			{ opacity: 0 }
		);
		stage.append(er);
		// Zig-zag stroke points: odd strokes reach up and ahead, even ones come back down.
		const k: Keyframe[] = [];
		for (let i = 0; i <= N; i++) {
			const x = r.x - 6 + r.w * (i / N) + (i % 2 ? 16 : -4);
			const y = r.cy + (i % 2 ? -14 : 4);
			k.push({ transform: `translate(${x - 20}px,${y - 11}px) rotate(-18deg)`, opacity: 1 });
		}
		await A(
			er,
			[{ transform: `translate(${r.x - 60}px,${r.cy - 50}px) rotate(-30deg)`, opacity: 0 }, k[0]],
			250
		);
		A(b, [{ clipPath: 'inset(-3px -3px -3px 0%)' }, { clipPath: 'inset(-3px -3px -3px 100%)' }], {
			duration: T,
			easing: 'linear'
		});
		for (let i = 0; i < 18; i++) {
			const s = rnd(2, 3.5);
			const p = place(
				h('i', {
					width: s + 'px',
					height: s + 'px',
					borderRadius: '1px',
					background: i % 3 ? '#d98b7b' : INK,
					opacity: 0
				}),
				r.x + r.w * (i / 18) + rnd(-4, 4),
				r.cy + rnd(0, 12)
			);
			stage.append(p);
			A(
				p,
				[
					{ opacity: 1, transform: 'translate(0,0)' },
					{
						opacity: 0,
						transform: `translate(${rnd(-10, 10)}px,${rnd(30, 60)}px) rotate(${rnd(-90, 90)}deg)`
					}
				],
				{ duration: 700, delay: (T * i) / 18, easing: 'cubic-bezier(.5,0,.9,.6)' }
			);
		}
		await A(er, k, { duration: T, easing: 'linear' });
		await A(
			er,
			[k[N], { transform: `translate(${r.r + 40}px,${r.cy - 50}px) rotate(10deg)`, opacity: 0 }],
			350
		);
		await wait(300);
	})
} satisfies Effect;
