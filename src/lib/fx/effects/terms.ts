/**
 * 71 · Terms of deletion: forty pages of terms scroll past at reading speed (someone's), the
 * box ticks itself, and the button goes.
 */
import { font } from '../../design/tokens.ts';
import { at, h, rel, rnd } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { hide } from '../kit.ts';
import { CARD, INK, LINE, MUTE } from '../particles.ts';
import { check } from '../parts.ts';

export default {
	badge: 'Agreed',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const W = stage.clientWidth;
		await hide(ctx, b);
		const lines = h(
			'i',
			{ display: 'flex', flexDirection: 'column', gap: '5px' },
			Array.from({ length: 60 }, (_, i) =>
				h('i', {
					height: '3px',
					width: (i % 9 === 8 ? rnd(20, 50) : rnd(70, 100)) + '%',
					background: LINE,
					borderRadius: '2px'
				})
			)
		);
		const scroll = h(
			'div',
			{
				height: '76px',
				overflow: 'hidden',
				padding: '8px 10px',
				border: `1.5px solid ${LINE}`,
				borderRadius: '6px',
				background: CARD
			},
			lines
		);
		const box = h('span', {
			display: 'inline-grid',
			placeItems: 'center',
			width: '14px',
			height: '14px',
			border: `1.5px solid ${INK}`,
			borderRadius: '3px',
			boxSizing: 'border-box'
		});
		const tick = h(
			'div',
			{
				display: 'flex',
				alignItems: 'center',
				gap: '8px',
				font: `400 12px/1.2 ${font.sans}`,
				color: INK
			},
			[box, 'I have read the terms']
		);
		const card = at(
			stage,
			h(
				'div',
				{
					width: Math.min(W - 40, 220) + 'px',
					display: 'flex',
					flexDirection: 'column',
					gap: '8px'
				},
				[
					h('div', { font: `500 11px/1 ${font.mono}`, color: MUTE }, 'Terms of Deletion, v41.2'),
					scroll,
					tick
				]
			),
			W / 2,
			r.cy
		);
		await A(card, [{ opacity: 0 }, { opacity: 1 }], 200);
		await A(lines, [{ transform: 'translateY(0)' }, { transform: `translateY(${76 - 480}px)` }], {
			duration: 1600,
			easing: 'cubic-bezier(.6,0,.4,1)'
		});
		await wait(250);
		const c = check();
		c.style.transform = 'scale(.7)';
		box.replaceWith(c);
		await A(c, [{ transform: 'scale(0)' }, { transform: 'scale(.7)' }], {
			duration: 260,
			easing: 'cubic-bezier(.3,1.6,.5,1)'
		});
		await wait(600);
		await A(card, [{ opacity: 1 }, { opacity: 0 }], 200);
	})
} satisfies Effect;
