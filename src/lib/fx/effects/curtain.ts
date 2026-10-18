/** 30 · Magic trick: red curtains close over the button and open on an empty stage. */
import { color } from '../../design/tokens.ts';
import { h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { GOLD, INK, RED } from '../particles.ts';

const SWEEP = 'cubic-bezier(.5,0,.3,1)';

export default {
	badge: 'Ta-da',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const x0 = r.x - 26;
		const half = r.cx - x0;
		const top = r.y - 26;
		const ht = r.h + 52;
		const drape = `repeating-linear-gradient(90deg,${color.curtain} 0 7px,${RED} 7px 14px)`;
		const L = place(
			h('i', {
				width: half + 'px',
				height: ht + 'px',
				background: drape,
				transformOrigin: '0 50%',
				transform: 'scaleX(0)',
				borderRadius: '0 0 6px 0'
			}),
			x0,
			top
		);
		const R = place(
			h('i', {
				width: half + 'px',
				height: ht + 'px',
				background: drape,
				transformOrigin: '100% 50%',
				transform: 'scaleX(0)',
				borderRadius: '0 0 0 6px'
			}),
			r.cx,
			top
		);
		const val = place(
			h('i', { width: half * 2 + 12 + 'px', height: '10px', background: INK, borderRadius: '3px' }),
			x0 - 6,
			top - 6
		);
		stage.append(L, R, val);
		await A(
			val,
			[
				{ opacity: 0, transform: 'translateY(-10px)' },
				{ opacity: 1, transform: 'none' }
			],
			250
		);
		await Promise.all(
			[L, R].map((e) =>
				A(e, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
					duration: 500,
					easing: SWEEP
				})
			)
		);
		b.style.visibility = 'hidden';
		await wait(450);
		await Promise.all(
			[L, R].map((e) =>
				A(e, [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], {
					duration: 550,
					easing: SWEEP
				})
			)
		);
		for (let i = 0; i < 8; i++) {
			const a = (i / 8) * Math.PI * 2;
			const p = place(
				h('i', { width: '5px', height: '5px', background: GOLD, transform: 'rotate(45deg)' }),
				r.cx - 2,
				r.cy - 2
			);
			stage.append(p);
			A(
				p,
				[
					{ transform: 'translate(0,0) rotate(45deg) scale(0)', opacity: 1 },
					{
						transform: `translate(${Math.cos(a) * 40}px,${Math.sin(a) * 28}px) rotate(45deg) scale(1)`,
						opacity: 0
					}
				],
				600
			);
		}
		A(val, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, delay: 300 });
	})
} satisfies Effect;
