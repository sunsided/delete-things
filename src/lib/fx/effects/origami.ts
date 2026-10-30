/**
 * 79 · Folded away: the button folds in half, then in half again, then once more, and the
 * little square left over is tucked away out of sight.
 */
import { rel, S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { INK } from '../particles.ts';

export default {
	badge: 'Folded',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const H = stage.clientHeight;
		S(b, { width: r.w + 'px' });
		A(b.icon, [{ opacity: 1 }, { opacity: 0 }], 150);
		await A(b.text, [{ opacity: 1 }, { opacity: 0 }], 150);
		// Each fold: a turn on its edge to show the crease, then the halved shape.
		const crease = (from: string, mid: string, to: string) =>
			A(
				b,
				[
					{ transform: from, boxShadow: 'none' },
					{ transform: mid, boxShadow: `inset 0 0 0 40px rgba(29,27,24,.12)`, offset: 0.5 },
					{ transform: to, boxShadow: 'none' }
				],
				{ duration: 420, easing: 'cubic-bezier(.6,0,.4,1)' }
			);
		const P = 'perspective(300px)';
		await crease(`${P} scale(1,1)`, `${P} rotateX(70deg) scale(1,.75)`, `${P} scale(1,.5)`);
		await wait(120);
		await crease(`${P} scale(1,.5)`, `${P} rotateY(70deg) scale(.75,.5)`, `${P} scale(.5,.5)`);
		await wait(120);
		await crease(`${P} scale(.5,.5)`, `${P} rotateY(-70deg) scale(.38,.5)`, `${P} scale(.25,.5)`);
		await wait(300);
		await A(
			b,
			[
				{ transform: `${P} scale(.25,.5)`, borderColor: INK },
				{ transform: `${P} translateY(-6px) scale(.25,.5)`, offset: 0.3 },
				{ transform: `${P} translateY(${H}px) scale(.25,.5) rotate(20deg)`, borderColor: INK }
			],
			{ duration: 700, easing: 'cubic-bezier(.5,0,.8,.5)' }
		);
	})
} satisfies Effect;
