/**
 * 66 · Spin for it: the label turns into a slot reel. It lands on Keep, thinks about it, and
 * clicks one further to Delete.
 */
import { font } from '../../design/tokens.ts';
import { h, rel, S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { hide } from '../kit.ts';
import { burst, GOLD, INK, RED } from '../particles.ts';

const WORDS = ['Delete', 'Archive', 'Maybe', 'Keep'];
const ROW = 20;
/** Full turns before it settles on Keep, the last word of the last turn; Delete is next. */
const TURNS = 5;

export default {
	badge: 'The reel has spoken',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		S(b, { width: r.w + 'px' });
		const reel = h(
			'span',
			{ display: 'flex', flexDirection: 'column', alignItems: 'center' },
			Array.from({ length: (TURNS + 1) * WORDS.length + 1 }, (_, i) =>
				h('span', { height: ROW + 'px', lineHeight: ROW + 'px' }, WORDS[i % WORDS.length])
			)
		);
		const win = h(
			'span',
			{
				display: 'inline-block',
				height: ROW + 'px',
				minWidth: '58px',
				overflow: 'hidden',
				font: `500 15px/1 ${font.sans}`,
				textAlign: 'center'
			},
			reel
		);
		win.setAttribute('aria-hidden', 'true');
		await A(b.text, [{ opacity: 1 }, { opacity: 0 }], 120);
		b.text.replaceWith(win);
		const keep = (TURNS * WORDS.length + 3) * ROW;
		await A(
			reel,
			[
				{ transform: 'translateY(0)' },
				{ transform: `translateY(${-keep - 6}px)`, offset: 0.92 },
				{ transform: `translateY(${-keep}px)` }
			],
			{ duration: 2200, easing: 'cubic-bezier(.15,.6,.2,1)' }
		);
		await wait(700);
		// One more click, very small and very deliberate.
		await A(
			reel,
			[{ transform: `translateY(${-keep}px)` }, { transform: `translateY(${-keep - ROW}px)` }],
			{ duration: 500, easing: 'cubic-bezier(.6,0,.3,1)' }
		);
		await wait(250);
		await A(
			b,
			[{ transform: 'scale(1)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }],
			260
		);
		await wait(250);
		await hide(ctx, b);
		await burst(ctx, r.cx, r.cy, 14, [GOLD, RED, INK], [30, 70]);
	})
} satisfies Effect;
