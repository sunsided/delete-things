/** 05 · Crumple & toss: the button crumples into a paper ball and arcs into a bin. */
import { place, rel, S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { trash } from '../parts.ts';
import { CARD, INK } from '../particles.ts';

export default {
	badge: 'Binned',
	setup: simple(async (ctx, b) => {
		const { stage, A } = ctx;
		const r = rel(stage, b);
		const bx = r.cx + 92;
		S(b, { width: r.w + 'px' });
		A(b.icon, [{ opacity: 1 }, { opacity: 0 }], 150);
		await A(b.text, [{ opacity: 1 }, { opacity: 0 }], 150);
		const bin = trash(INK);
		place(bin, bx - 7, r.cy - 8, { opacity: 0 });
		stage.append(bin);
		A(
			bin,
			[
				{ opacity: 0, transform: 'scale(2.6) translateY(4px)' },
				{ opacity: 1, transform: 'scale(2.6)' }
			],
			320
		);
		await A(
			b,
			[
				{
					width: r.w + 'px',
					padding: '0 22px',
					borderRadius: '10px',
					transform: 'rotate(0) scale(1)',
					background: CARD
				},
				{
					width: '64px',
					padding: '0',
					borderRadius: '40% 60% 45% 55%',
					transform: 'rotate(30deg) scale(.9)',
					background: '#ece6da',
					offset: 0.5
				},
				{
					width: '48px',
					padding: '0',
					borderRadius: '48% 52% 42% 58%',
					transform: 'rotate(220deg) scale(.55)',
					background: '#e2dbcc'
				}
			],
			{ duration: 620, easing: 'cubic-bezier(.6,0,.3,1)' }
		);
		A(bin.lid, [{ transform: 'rotate(0)' }, { transform: 'rotate(-50deg)' }], 200);
		// A parabola sampled into keyframes, so a linear timing traces the arc.
		const k: Keyframe[] = [];
		for (let i = 0; i <= 10; i++) {
			const t = i / 10;
			k.push({
				transform: `translate(${(bx - r.cx) * t}px,${-300 * t * (1 - t) - 14 * t}px) rotate(${220 + t * 400}deg) scale(.55)`
			});
		}
		k.push({ transform: `translate(${bx - r.cx}px,6px) rotate(640deg) scale(.4)`, opacity: 0 });
		await A(b, k, { duration: 650, easing: 'linear' });
		await A(bin.lid, [{ transform: 'rotate(-50deg)' }, { transform: 'rotate(0)' }], {
			duration: 200,
			easing: 'cubic-bezier(.3,1.8,.5,1)'
		});
		await A(
			bin,
			[
				{ transform: 'scale(2.6) rotate(0)' },
				{ transform: 'scale(2.6) rotate(-8deg)' },
				{ transform: 'scale(2.6) rotate(6deg)' },
				{ transform: 'scale(2.6) rotate(0)' }
			],
			300
		);
		await A(
			bin,
			[
				{ opacity: 1, transform: 'scale(2.6)' },
				{ opacity: 0, transform: 'scale(2.2)' }
			],
			250
		);
	})
} satisfies Effect;
