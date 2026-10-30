/**
 * 80 · Cut, not deleted: a ⌘X keycap presses, the button is cut out along a dashed line and
 * clipped to a clipboard, where it waits for a paste.
 */
import { color, font } from '../../design/tokens.ts';
import { at, h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { say, unsay } from '../kit.ts';
import { CARD, INK, LINE } from '../particles.ts';

export default {
	badge: 'Cut',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const W = stage.clientWidth;
		const key = at(
			stage,
			h(
				'div',
				{
					padding: '6px 9px',
					background: CARD,
					color: INK,
					border: `1.5px solid ${INK}`,
					borderBottomWidth: '4px',
					borderRadius: '6px',
					font: `600 13px/1 ${font.mono}`
				},
				'⌘ X'
			),
			r.cx,
			r.y - 30
		);
		await A(
			key,
			[
				{ opacity: 0, transform: 'translateY(-8px)' },
				{ opacity: 1, transform: 'none' }
			],
			200
		);
		await A(
			key,
			[
				{ transform: 'none', borderBottomWidth: '4px' },
				{ transform: 'translateY(3px)', borderBottomWidth: '1.5px', offset: 0.4 },
				{ transform: 'none', borderBottomWidth: '4px' }
			],
			260
		);
		const dash = place(
			h('i', {
				width: r.w + 12 + 'px',
				height: r.h + 12 + 'px',
				border: `1.5px dashed ${INK}`,
				borderRadius: '13px',
				boxSizing: 'border-box'
			}),
			r.x - 6,
			r.y - 6
		);
		stage.append(dash);
		await A(
			dash,
			[
				{ opacity: 0, transform: 'scale(1.1)' },
				{ opacity: 1, transform: 'scale(1)' }
			],
			260
		);
		A(key, [{ opacity: 1 }, { opacity: 0 }], 200);
		await wait(300);
		// The clipboard, top right, which the button flies into.
		const cbw = 46;
		const cbh = 58;
		const cx = W - cbw / 2 - 16;
		const cy = cbh / 2 + 16;
		const board = place(
			h(
				'i',
				{
					width: cbw + 'px',
					height: cbh + 'px',
					background: color.sandDark,
					border: `1.5px solid ${INK}`,
					borderRadius: '5px',
					boxSizing: 'border-box'
				},
				h('i', {
					position: 'absolute',
					left: '12px',
					top: '-5px',
					width: '20px',
					height: '9px',
					background: LINE,
					border: `1.5px solid ${INK}`,
					borderRadius: '3px',
					boxSizing: 'border-box'
				})
			),
			cx - cbw / 2,
			cy - cbh / 2
		);
		stage.append(board);
		// Clipped on top of the board, not slipped behind it.
		b.style.zIndex = '1';
		await A(
			board,
			[
				{ opacity: 0, transform: 'translateY(-10px)' },
				{ opacity: 1, transform: 'none' }
			],
			250
		);
		const s = 34 / r.w;
		const T = `translate(${cx - r.cx}px,${cy + 4 - r.cy}px) scale(${s}) rotate(-90deg)`;
		A(dash, [{ opacity: 1 }, { opacity: 0 }], 200);
		await A(
			b,
			[
				{ transform: 'none' },
				{ transform: 'translate(0,-8px) rotate(-4deg)', offset: 0.25 },
				{ transform: T }
			],
			{
				duration: 650,
				easing: 'cubic-bezier(.5,0,.3,1)'
			}
		);
		const n = say(ctx, 'saved for later. you’re welcome.', W / 2, stage.clientHeight - 24);
		await wait(1300);
		unsay(ctx, n);
		await Promise.all([b, board].map((e) => A(e, [{ opacity: 1 }, { opacity: 0 }], 250)));
	})
} satisfies Effect;
