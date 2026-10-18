/** 16 · Paper plane: the button folds back and a paper plane loops off to the upper right. */
import { color } from '../../design/tokens.ts';
import { h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { INK } from '../particles.ts';

export default {
	badge: 'Flown off',
	setup: simple(async (ctx, b) => {
		const { stage, A } = ctx;
		const r = rel(stage, b);
		await A(
			b,
			[
				{ transform: 'perspective(500px) rotateX(0)' },
				{ transform: 'perspective(500px) rotateX(78deg) scaleX(.9)' }
			],
			{ duration: 280, easing: 'cubic-bezier(.5,0,.8,.5)' }
		);
		A(
			b,
			[
				{ transform: 'perspective(500px) rotateX(78deg) scaleX(.9)', opacity: 1 },
				{ transform: 'perspective(500px) rotateX(78deg) scale(.15,.5)', opacity: 0 }
			],
			{ duration: 220 }
		);
		const pl = place(
			h('i', { width: '40px', height: '26px' }, [
				h('i', {
					position: 'absolute',
					inset: 0,
					background: INK,
					clipPath: 'polygon(0 0,100% 50%,0 100%,24% 50%)'
				}),
				h('i', {
					position: 'absolute',
					inset: 0,
					background: color.ash,
					clipPath: 'polygon(0 0,100% 50%,24% 50%)'
				})
			]),
			r.cx - 20,
			r.cy - 13
		);
		stage.append(pl);
		await A(
			pl,
			[
				{ transform: 'translate(0,0) rotate(0) scale(.3)', opacity: 0 },
				{ transform: 'translate(0,0) rotate(-8deg) scale(1)', opacity: 1, offset: 0.18 },
				{ transform: 'translate(-14px,6px) rotate(-14deg)', offset: 0.3 },
				{ transform: 'translate(50px,-30px) rotate(-28deg)', offset: 0.5 },
				{ transform: 'translate(90px,-10px) rotate(26deg)', offset: 0.66 },
				{ transform: 'translate(240px,-140px) rotate(-34deg)', opacity: 1 }
			],
			{ duration: 1400, easing: 'cubic-bezier(.4,0,.7,1)' }
		);
	})
} satisfies Effect;
