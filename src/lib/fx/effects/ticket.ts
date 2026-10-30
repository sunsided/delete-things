/**
 * 76 · Won’t fix: the click files a ticket. It is triaged, assigned, blocked, reassigned and
 * closed as won’t fix, and then the cleanup job deletes the file anyway.
 */
import { font } from '../../design/tokens.ts';
import { at, h, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { hide } from '../kit.ts';
import { CARD, GREEN, INK, LINE, MUTE, RED_TEXT } from '../particles.ts';

/** Status, its colour (text on the light ground), and who has it. */
const STEPS: [string, string, string][] = [
	['Open', INK, 'Unassigned'],
	['Triage', INK, 'You'],
	['In progress', INK, 'Someone'],
	['Blocked', RED_TEXT, 'Someone else'],
	['Backlog', MUTE, 'Nobody'],
	['Won’t fix', RED_TEXT, 'Nobody'],
	['Done', GREEN, 'cleanup-bot']
];

export default {
	badge: 'Closed',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		await hide(ctx, b);
		const pill = h('span', {
			padding: '3px 7px',
			border: '1.5px solid currentColor',
			borderRadius: '10px',
			font: `600 11px/1 ${font.mono}`
		});
		const who = h('span', { font: `400 11px/1 ${font.mono}`, color: MUTE });
		const set = ([s, c, w]: (typeof STEPS)[number]) => {
			pill.textContent = s;
			pill.style.color = c;
			who.textContent = w;
		};
		set(STEPS[0]);
		const card = at(
			stage,
			h(
				'div',
				{
					width: '220px',
					boxSizing: 'border-box',
					padding: '12px 14px',
					background: CARD,
					border: `1.5px solid ${LINE}`,
					borderRadius: '8px',
					display: 'flex',
					flexDirection: 'column',
					gap: '8px'
				},
				[
					h('div', { font: `500 11px/1 ${font.mono}`, color: MUTE }, 'DEL-4012'),
					h('div', { font: `600 14px/1.2 ${font.sans}`, color: INK }, 'Delete this file'),
					h(
						'div',
						{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' },
						[pill, who]
					)
				]
			),
			r.cx,
			r.cy
		);
		await A(
			card,
			[
				{ opacity: 0, transform: 'translateY(10px) rotate(-2deg)' },
				{ opacity: 1, transform: 'none' }
			],
			{ duration: 300, easing: 'cubic-bezier(.3,1.4,.5,1)' }
		);
		for (const [i, step] of STEPS.entries()) {
			set(step);
			A(pill, [{ transform: 'scale(1.15)' }, { transform: 'scale(1)' }], {
				duration: 260,
				easing: 'cubic-bezier(.3,1.6,.5,1)'
			});
			await wait(i === STEPS.length - 2 ? 900 : 520);
		}
		await wait(600);
		await A(
			card,
			[
				{ opacity: 1, transform: 'none' },
				{ opacity: 0, transform: 'translateY(-10px)' }
			],
			220
		);
	})
} satisfies Effect;
