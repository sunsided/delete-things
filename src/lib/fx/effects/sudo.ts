/**
 * 64 · Permission denied: the button turns into a terminal. rm is refused, sudo asks for a
 * password, and then it is removed.
 */
import { color, font } from '../../design/tokens.ts';
import { at, h, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { hide } from '../kit.ts';
import { CARD, INK } from '../particles.ts';

export default {
	badge: 'Removed',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const W = stage.clientWidth;
		await hide(ctx, b);
		const term = at(
			stage,
			h('div', {
				width: Math.min(W - 32, 260) + 'px',
				height: '120px',
				boxSizing: 'border-box',
				padding: '12px 14px',
				background: INK,
				color: CARD,
				borderRadius: '8px',
				font: `400 12px/1.6 ${font.mono}`,
				whiteSpace: 'pre',
				overflow: 'hidden'
			}),
			W / 2,
			r.cy
		);
		await A(
			term,
			[
				{ opacity: 0, transform: 'scale(.9)' },
				{ opacity: 1, transform: 'scale(1)' }
			],
			{ duration: 220, easing: 'cubic-bezier(.3,1.4,.5,1)' }
		);
		const line = (c: string = CARD) => {
			const l = h('div', { color: c, minHeight: '19px' });
			term.append(l);
			return l;
		};
		const type = async (l: HTMLElement, s: string, ms = 55) => {
			for (const c of s) {
				l.textContent += c;
				await wait(ms);
			}
		};
		await type(line(), '$ rm file');
		await wait(250);
		line(color.redOnDark).textContent = 'rm: Permission denied';
		await wait(700);
		await type(line(), '$ sudo !!');
		await wait(200);
		const pw = line();
		pw.textContent = '[sudo] password: ';
		await wait(300);
		await type(pw, '••••••••', 90);
		await wait(350);
		line(color.greenOnDark).textContent = 'removed ‘file’';
		await wait(800);
		await A(term, [{ opacity: 1 }, { opacity: 0 }], 200);
	})
} satisfies Effect;
