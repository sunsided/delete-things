/** 56 · Five more minutes: it dozes off, the alarm goes off, and it leaves, grumbling. */
import { font } from '../../design/tokens.ts';
import { h, jit, place, rel, S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { say, unsay } from '../kit.ts';
import { MUTE, RED_TEXT } from '../particles.ts';

const TILT = 'rotate(-8deg) translateY(4px) scale(.96)';

export default {
	badge: 'Up and gone',
	setup: simple(async (ctx, b) => {
		const { stage, A, sp } = ctx;
		const r = rel(stage, b);
		S(b, { minWidth: r.w + 'px', transformOrigin: '50% 100%' });
		b.text.textContent = '5 more min';
		await A(b, [{ transform: 'none' }, { transform: TILT }], {
			duration: 500,
			easing: 'cubic-bezier(.4,0,.6,1)'
		});
		const breathe = b.animate(
			[{ transform: TILT }, { transform: 'rotate(-8deg) translateY(4px) scale(.98,.92)' }],
			{ duration: 700 / sp(), iterations: Infinity, direction: 'alternate' }
		);
		await Promise.all(
			[0, 1, 2, 3].map((i) => {
				const z = place(
					h(
						'i',
						{
							font: `600 ${12 + i * 4}px/1 ${font.mono}`,
							fontStyle: 'normal',
							color: MUTE,
							opacity: 0
						},
						'z'
					),
					r.r - 12,
					r.y - 8
				);
				stage.append(z);
				return A(
					z,
					[
						{ opacity: 0, transform: 'translate(0,0)' },
						{ opacity: 1, offset: 0.3 },
						{ opacity: 0, transform: `translate(${14 + i * 6}px,${-30 - i * 10}px)` }
					],
					{ duration: 1100, delay: i * 350 }
				);
			})
		);
		breathe.cancel();
		const al = say(ctx, 'BEEP BEEP BEEP', r.cx, r.y - 22, { color: RED_TEXT, fontWeight: '700' });
		b.text.textContent = 'ugh, FINE';
		await A(b, jit(10, 3), { duration: 500, easing: 'linear' });
		unsay(ctx, al);
		await A(
			b,
			[
				{ transform: 'none' },
				{ transform: 'translateY(-14px)', offset: 0.3 },
				{ transform: `translate(${stage.clientWidth}px,-14px)` }
			],
			{ duration: 700, easing: 'cubic-bezier(.5,0,.8,.5)' }
		);
	})
} satisfies Effect;
