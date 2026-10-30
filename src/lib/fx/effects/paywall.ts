/**
 * 60 · Premium deletion: deleting is a Pro feature. Upgrade or not, it ends in a free trial
 * that expires immediately.
 */
import { font } from '../../design/tokens.ts';
import { at, h, rel, S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { hide } from '../kit.ts';
import { INK, LINE, MUTE, RED_TEXT } from '../particles.ts';

export default {
	badge: 'Deleted (trial)',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const hadFocus = stage.contains(document.activeElement);
		const r = rel(stage, b);
		await hide(ctx, b);
		const up = h(
			'button',
			{
				height: '34px',
				padding: '0 14px',
				border: 'none',
				borderRadius: '8px',
				background: RED_TEXT,
				color: '#fff',
				font: `600 13px/1 ${font.sans}`,
				cursor: 'pointer',
				touchAction: 'manipulation'
			},
			'Upgrade'
		);
		const no = h(
			'button',
			{
				height: '34px',
				padding: '0 8px',
				border: 'none',
				background: 'none',
				color: MUTE,
				font: `500 13px/1 ${font.sans}`,
				cursor: 'pointer',
				textDecoration: 'underline',
				textUnderlineOffset: '3px',
				touchAction: 'manipulation'
			},
			'No thanks'
		);
		up.type = no.type = 'button';
		const title = h(
			'div',
			{ font: `600 15px/1.25 ${font.sans}`, color: INK },
			'Deleting is a Pro feature'
		);
		const sub = h(
			'div',
			{ font: `400 12px/1.4 ${font.sans}`, color: MUTE },
			'$4.99/mo · cancel anytime*'
		);
		const fine = h('div', { font: `400 10px/1 ${font.mono}`, color: MUTE }, '*you can’t');
		const m = at(
			stage,
			h(
				'div',
				{
					display: 'flex',
					flexDirection: 'column',
					gap: '8px',
					padding: '16px',
					width: '232px',
					boxSizing: 'border-box',
					background: '#fff',
					border: `1px solid ${LINE}`,
					borderRadius: '12px',
					boxShadow: '0 8px 24px rgba(29,27,24,.08)'
				},
				[
					title,
					sub,
					h('div', { display: 'flex', gap: '6px', alignItems: 'center', marginTop: '4px' }, [
						up,
						no
					]),
					fine
				]
			),
			r.cx,
			r.cy
		);
		if (hadFocus) no.focus({ preventScroll: true });
		A(
			m,
			[
				{ opacity: 0, transform: 'translateY(10px) scale(.96)' },
				{ opacity: 1, transform: 'none' }
			],
			{ duration: 300, easing: 'cubic-bezier(.3,1.4,.5,1)' }
		);
		// No answer is also an answer: after 2.6s it picks No thanks for you.
		const pick = await new Promise<'up' | 'no'>((ok) => {
			up.addEventListener('click', () => ok('up'));
			no.addEventListener('click', () => ok('no'));
			wait(2600).then(() => ok('no'));
		});
		up.disabled = no.disabled = true;
		S(up, { opacity: 0.4 });
		S(no, { opacity: 0.4 });
		title.textContent = pick === 'up' ? 'lol, no. Free trial it is.' : 'Fine. Here’s a free trial.';
		sub.textContent = '1 deletion · expires immediately';
		await wait(1200);
		await A(
			m,
			[
				{ opacity: 1, transform: 'none' },
				{ opacity: 0, transform: 'scale(.92)' }
			],
			200
		);
	})
} satisfies Effect;
