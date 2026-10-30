/**
 * 65 · Helpful assistant: a chat bubble answers the click at length, declines, and then does
 * it anyway.
 */
import { font } from '../../design/tokens.ts';
import { at, h, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { hide } from '../kit.ts';
import { CARD, INK, LINE, MUTE } from '../particles.ts';

const REPLIES = [
	'Great question! Deleting a file is a nuanced decision with many factors to consider.',
	'I’m not able to delete files.',
	'…I deleted it.'
];

export default {
	badge: 'Done, apparently',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const W = stage.clientWidth;
		await hide(ctx, b);
		const text = h('span');
		const bubble = at(
			stage,
			h(
				'div',
				{
					width: Math.min(W - 40, 240) + 'px',
					height: '100px',
					boxSizing: 'border-box',
					padding: '10px 12px',
					background: CARD,
					color: INK,
					border: `1.5px solid ${LINE}`,
					borderRadius: '12px 12px 12px 3px',
					font: `400 13px/1.4 ${font.sans}`
				},
				[
					h(
						'div',
						{ font: `500 11px/1 ${font.mono}`, color: MUTE, marginBottom: '6px' },
						'Assistant'
					),
					text
				]
			),
			W / 2,
			r.cy
		);
		await A(
			bubble,
			[
				{ opacity: 0, transform: 'translateY(8px)' },
				{ opacity: 1, transform: 'none' }
			],
			220
		);
		for (const [i, reply] of REPLIES.entries()) {
			text.textContent = '';
			const words = reply.split(' ');
			for (const [j, w] of words.entries()) {
				text.textContent += (j ? ' ' : '') + w;
				await wait(i === 0 ? 70 : 110);
			}
			await wait(i === 1 ? 1100 : 800);
		}
		await A(bubble, [{ opacity: 1 }, { opacity: 0 }], 200);
	})
} satisfies Effect;
