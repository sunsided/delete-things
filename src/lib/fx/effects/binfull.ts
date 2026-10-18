/**
 * 61 · Bin is full: the first throw bounces off the pile. The bin compacts its junk, and the
 * second throw goes in.
 */
import { h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { arc, say, toBall, unsay } from '../kit.ts';
import { trash } from '../parts.ts';
import { INK, RED_TEXT } from '../particles.ts';

/** The three documents sticking out of the bin: x, y offsets and tilt. */
const JUNK = [
	[-12, -4, -22],
	[-1, -12, 6],
	[9, -5, 24]
];

/** A path of points as ball keyframes, spinning 36° per point. */
const ball = (pts: ReturnType<typeof arc>, rot0: number): Keyframe[] =>
	pts.map(([x, y], i) => ({
		transform: `translate(${x}px,${y}px) rotate(${rot0 + i * 36}deg) scale(.55)`
	}));

export default {
	badge: 'Compacted',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const bx = r.cx + 92;
		const top = r.cy - 22;
		const dx = bx - r.cx;
		const bin = trash(INK);
		place(bin, bx - 7, r.cy - 8, { transform: 'scale(2.6)', opacity: 0 });
		bin.lid.style.transform = 'rotate(-28deg)';
		const junk = JUNK.map(([x, y, a]) =>
			place(
				h('i', {
					width: '14px',
					height: '18px',
					background: '#fff',
					border: `1.5px solid ${INK}`,
					borderRadius: '2px',
					boxSizing: 'border-box',
					opacity: 0
				}),
				bx - 7 + x,
				top + y - 8,
				{ transform: `rotate(${a}deg)` }
			)
		);
		stage.append(...junk, bin);
		[bin, ...junk].forEach((e) => A(e, [{ opacity: 0 }, { opacity: 1 }], 300));
		await toBall(ctx, b, r.w);
		// Up onto the pile, then back down to where it started.
		const t1 = arc(0, 0, dx, -40, 70).concat(arc(dx, -40, 0, 0, 50).slice(1));
		A(
			junk[1],
			[
				{ transform: 'rotate(6deg)' },
				{ transform: 'rotate(-10deg)' },
				{ transform: 'rotate(6deg)' }
			],
			{
				duration: 300,
				delay: 520
			}
		);
		await A(b, ball(t1, 220), { duration: 1150, easing: 'linear' });
		const s = say(ctx, 'bin is full', bx, top - 34, { color: RED_TEXT });
		await wait(500);
		unsay(ctx, s);
		await Promise.all(
			junk.map((j, i) =>
				A(j, [{ opacity: 1 }, { opacity: 0, transform: 'translateY(16px) scale(.3)' }], {
					duration: 300,
					delay: i * 60
				})
			)
		);
		await A(
			bin,
			[{ transform: 'scale(2.6)' }, { transform: 'scale(2.9,2)' }, { transform: 'scale(2.6)' }],
			{
				duration: 320,
				easing: 'cubic-bezier(.3,0,.5,1)'
			}
		);
		const k2 = ball(arc(0, 0, dx, 4, 80), 220 + 20 * 36);
		k2[k2.length - 1].opacity = 0;
		await A(b, k2, { duration: 650, easing: 'linear' });
		await A(bin.lid, [{ transform: 'rotate(-28deg)' }, { transform: 'rotate(0)' }], {
			duration: 200,
			easing: 'cubic-bezier(.3,1.8,.5,1)'
		});
		await A(bin, [{ opacity: 1 }, { opacity: 0 }], 250);
	})
} satisfies Effect;
