/** 46 · Achoo: the button winds up, ah… ah… AH…, and sneezes itself out of the frame. */
import { color } from '../../design/tokens.ts';
import { h, place, rel, rnd, S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';

const WINDUP: [string, number, number][] = [
	['ah…', 1.05, -4],
	['ah…!', 1.11, -8],
	['AH…!!', 1.18, -12]
];

export default {
	badge: 'Bless you',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		S(b, { minWidth: r.w + 'px', transformOrigin: '50% 100%' });
		b.icon.style.display = 'none';
		let prev = 'none';
		for (const [l, s, a] of WINDUP) {
			b.text.textContent = l;
			const nx = `scale(${s}) rotate(${a}deg) translateX(-4px)`;
			await A(b, [{ transform: prev }, { transform: nx }], {
				duration: 380,
				easing: 'cubic-bezier(.3,0,.5,1)'
			});
			prev = nx;
			await wait(200);
		}
		await wait(300);
		b.text.textContent = 'CHOO!';
		for (let i = 0; i < 24; i++) {
			const s = rnd(2, 5);
			const p = place(
				h('i', {
					width: s + 'px',
					height: s + 'px',
					borderRadius: '50%',
					background: i % 3 ? color.droplet : color.dropletLight,
					opacity: 0
				}),
				r.r - 6,
				r.cy + rnd(-8, 8)
			);
			stage.append(p);
			A(
				p,
				[
					{ opacity: 1, transform: 'translate(0,0)' },
					{ opacity: 0, transform: `translate(${rnd(60, 160)}px,${rnd(-40, 40)}px)` }
				],
				{ duration: rnd(400, 700), easing: 'cubic-bezier(.1,.8,.3,1)' }
			);
		}
		await A(
			b,
			[
				{ transform: prev },
				{ transform: 'scale(1) rotate(10deg) translateX(10px)', offset: 0.12 },
				{ transform: `translateX(-${r.x + r.w + 60}px) rotate(-30deg)` }
			],
			{ duration: 700, easing: 'cubic-bezier(.2,.7,.4,1)' }
		);
	})
} satisfies Effect;
