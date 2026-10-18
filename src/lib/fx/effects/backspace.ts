/** 09 · Backspace: a caret deletes the label letter by letter, then types "gone." */
import { font } from '../../design/tokens.ts';
import { h, rel, S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { INK, LINE, MUTE, RED } from '../particles.ts';

export default {
	badge: null,
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		S(b, { minWidth: r.w + 'px' });
		const caret = h('i', {
			display: 'inline-block',
			width: '1.5px',
			height: '18px',
			background: RED,
			marginLeft: '-9px'
		});
		b.append(caret);
		caret.animate([{ opacity: 1 }, { opacity: 0 }], {
			duration: 900,
			iterations: Infinity,
			easing: 'steps(2,jump-none)'
		});
		await wait(500);
		const t = b.text;
		while (t.textContent) {
			t.textContent = t.textContent.slice(0, -1);
			await wait(75);
		}
		await A(
			b.icon,
			[
				{ opacity: 1, transform: 'scale(1)' },
				{ opacity: 0, transform: 'scale(0)' }
			],
			160
		);
		b.icon.style.display = 'none';
		caret.style.marginLeft = '-8px';
		await wait(350);
		S(t, { font: `500 15px/1 ${font.mono}`, color: MUTE });
		for (const ch of 'gone.') {
			t.textContent += ch;
			await wait(110);
		}
		A(b, [{ borderColor: INK }, { borderColor: LINE }], 300);
		await wait(400);
		return null;
	})
} satisfies Effect;
