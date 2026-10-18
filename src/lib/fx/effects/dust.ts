/** 04 · Turn to dust: the button is wiped away left to right as it crumbles into drifting dust. */
import { h, place, rel, rnd } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { INK } from '../particles.ts';

const C = 5;
const T = 900;

export default {
	badge: 'Dusted',
	setup: simple(async (ctx, b) => {
		const { stage, A } = ctx;
		const r = rel(stage, b);
		const cols = Math.ceil(r.w / C);
		const rows = Math.ceil(r.h / C);
		const ps: Promise<void>[] = [];
		for (let y = 0; y < rows; y++)
			for (let x = 0; x < cols; x++) {
				if (Math.random() < 0.35) continue;
				const edge = y === 0 || y === rows - 1 || x === 0 || x === cols - 1;
				const col = edge || Math.random() < 0.16 ? INK : '#cfc7b8';
				const s = rnd(2.5, 4.5);
				const p = place(
					h('i', {
						width: s + 'px',
						height: s + 'px',
						background: col,
						opacity: 0,
						borderRadius: '1px'
					}),
					r.x + x * C,
					r.y + y * C
				);
				stage.append(p);
				ps.push(
					A(
						p,
						[
							{ opacity: 1, transform: 'translate(0,0) rotate(0)' },
							{
								opacity: 0,
								transform: `translate(${rnd(30, 120)}px,${rnd(-80, 10)}px) rotate(${rnd(-180, 180)}deg) scale(.4)`
							}
						],
						{
							duration: rnd(700, 1150),
							delay: (x / cols) * T + rnd(0, 120),
							easing: 'cubic-bezier(.2,.6,.4,1)'
						}
					)
				);
			}
		A(b, [{ clipPath: 'inset(-2px -2px -2px 0%)' }, { clipPath: 'inset(-2px -2px -2px 100%)' }], {
			duration: T + 120,
			easing: 'linear'
		});
		await Promise.all(ps);
	})
} satisfies Effect;
