/**
 * 36 · Type to confirm (actually good UX): the button stays disabled until the input reads
 * "delete"; then a click or Enter deletes.
 */
import { font } from '../../design/tokens.ts';
import { h, S } from '../dom.ts';
import type { Effect } from '../engine.ts';
import { btn, setBusy } from '../parts.ts';
import { CARD, INK, LINE, MUTE, RED } from '../particles.ts';

const WORD = 'delete';

export default {
	badge: 'Deleted',
	setup: (ctx) => {
		const { stage, A, wait } = ctx;
		const cap = h('div', { font: `500 12px/1.3 ${font.mono}`, color: MUTE }, [
			'Type ',
			h(
				'span',
				{ color: INK, background: '#ece6da', padding: '1px 5px', borderRadius: '3px' },
				WORD
			),
			' to confirm'
		]);
		const inp = h('input', {
			width: '190px',
			height: '40px',
			boxSizing: 'border-box',
			border: `1.5px solid ${LINE}`,
			borderRadius: '8px',
			background: '#fff',
			padding: '0 12px',
			font: `500 14px/1 ${font.mono}`,
			color: INK,
			outline: 'none'
		});
		inp.type = 'text';
		inp.placeholder = WORD;
		inp.autocomplete = 'off';
		inp.spellcheck = false;
		inp.setAttribute('aria-label', 'Type delete to confirm');
		const b = btn();
		S(b, { width: '190px', opacity: 0.35, cursor: 'not-allowed' });
		b.disabled = true;
		const col = h(
			'div',
			{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' },
			[cap, inp, b]
		);
		stage.append(col);

		const ok = () => inp.value.trim().toLowerCase() === WORD;
		const update = () => {
			const g = ok();
			b.disabled = !g;
			// The icon draws in currentColor, so it follows the button's colour.
			S(b, {
				opacity: g ? 1 : 0.35,
				cursor: g ? 'pointer' : 'not-allowed',
				background: g ? RED : CARD,
				borderColor: g ? RED : INK,
				color: g ? '#fff' : INK
			});
			inp.style.borderColor = g ? RED : LINE;
		};
		inp.addEventListener('input', update);
		inp.addEventListener('focus', () => {
			if (!ok()) inp.style.borderColor = INK;
		});
		inp.addEventListener('blur', () => {
			if (!ok()) inp.style.borderColor = LINE;
		});

		const go = async () => {
			if (ctx.busy || !ok()) return;
			ctx.busy = true;
			setBusy(b, true);
			inp.disabled = true;
			A(cap, [{ opacity: 1 }, { opacity: 0 }], 200);
			A(
				inp,
				[
					{ opacity: 1, transform: 'none' },
					{ opacity: 0, transform: 'translateY(6px)' }
				],
				250
			);
			await A(
				b,
				[
					{ transform: 'scale(1)' },
					{ transform: 'scale(.94)', offset: 0.3 },
					{ transform: 'scale(0)', opacity: 0 }
				],
				{
					duration: 420,
					easing: 'cubic-bezier(.5,0,.7,.4)'
				}
			);
			ctx.finish();
		};
		b.addEventListener('click', go);
		inp.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') go();
		});
		ctx.play = async () => {
			if (ctx.busy) return;
			inp.value = '';
			for (const ch of WORD) {
				inp.value += ch;
				update();
				await wait(90);
			}
			await wait(300);
			go();
		};
	}
} satisfies Effect;
