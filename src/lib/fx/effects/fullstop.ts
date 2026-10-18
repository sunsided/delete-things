/** 38 · Full stop: the button shrinks to a dot, hops, and becomes the full stop of "Deleted". */
import { font } from '../../design/tokens.ts';
import { h, place, rel, S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { CARD, INK } from '../particles.ts';

export default {
	badge: null,
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		A(b.icon, [{ opacity: 1 }, { opacity: 0 }], 180);
		await A(b.text, [{ opacity: 1 }, { opacity: 0 }], 180);
		await A(
			b,
			[
				{
					width: r.w + 'px',
					height: r.h + 'px',
					padding: '0 22px',
					borderRadius: '10px',
					background: CARD
				},
				{
					width: '6px',
					height: '6px',
					padding: '0',
					borderRadius: '50%',
					background: INK,
					borderWidth: '0px'
				}
			],
			{ duration: 480, easing: 'cubic-bezier(.6,0,.2,1)' }
		);
		await A(
			b,
			[
				{ transform: 'translateY(0)' },
				{ transform: 'translateY(-30px)', offset: 0.45, easing: 'cubic-bezier(.55,0,1,.45)' },
				{ transform: 'translateY(4px)', offset: 0.8 },
				{ transform: 'translateY(0)' }
			],
			{ duration: 500, easing: 'cubic-bezier(0,.55,.45,1)' }
		);
		const t = h(
			'div',
			{
				font: `600 22px/1 ${font.sans}`,
				color: INK,
				letterSpacing: '-.01em',
				whiteSpace: 'nowrap',
				clipPath: 'inset(0 0 0 100%)'
			},
			'Deleted'
		);
		place(t, 0, 0);
		stage.append(t);
		const tb = t.getBoundingClientRect();
		// Right edge 1px left of the dot, baseline roughly on the dot's bottom.
		S(t, { left: r.cx - 3 - tb.width - 1 + 'px', top: r.cy + 3 - tb.height * 0.86 + 'px' });
		await A(t, [{ clipPath: 'inset(-4px 0 -4px 100%)' }, { clipPath: 'inset(-4px 0 -4px 0%)' }], {
			duration: 450,
			easing: 'cubic-bezier(.3,0,.2,1)'
		});
		await wait(800);
		return null;
	})
} satisfies Effect;
