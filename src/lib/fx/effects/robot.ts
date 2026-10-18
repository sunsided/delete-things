/**
 * 45 · Prove you're human: an "I'm not a robot" box. Ticking it spins, fails because the tick
 * came too fast, then lets it through anyway.
 */
import { font } from '../../design/tokens.ts';
import { at, h, rel, S } from '../dom.ts';
import type { Effect } from '../engine.ts';
import { hide, say, unsay } from '../kit.ts';
import { btn, setBusy } from '../parts.ts';
import { GREEN, INK, LINE, RED, RED_TEXT } from '../particles.ts';

export default {
	badge: 'Probably human',
	setup: (ctx) => {
		const { stage, A, wait, sp } = ctx;
		const b = btn();
		stage.append(b);

		const play = async (auto = false) => {
			if (ctx.busy) return;
			ctx.busy = true;
			setBusy(b, true);
			const hadFocus = stage.contains(document.activeElement);
			const r = rel(stage, b);
			await hide(ctx, b);
			const cb = h('button', {
				position: 'relative',
				width: '24px',
				height: '24px',
				border: `2px solid ${INK}`,
				borderRadius: '4px',
				background: '#fff',
				cursor: 'pointer',
				padding: 0,
				flex: 'none',
				boxSizing: 'border-box',
				touchAction: 'manipulation'
			});
			cb.type = 'button';
			cb.setAttribute('role', 'checkbox');
			cb.setAttribute('aria-checked', 'false');
			cb.setAttribute('aria-label', 'I’m not a robot');
			const tx = h(
				'span',
				{ flex: '1', font: `500 14px/1.2 ${font.sans}`, color: INK },
				'I’m not a robot'
			);
			tx.setAttribute('aria-live', 'polite');
			const card = at(
				stage,
				h(
					'div',
					{
						display: 'flex',
						alignItems: 'center',
						gap: '12px',
						width: '236px',
						boxSizing: 'border-box',
						padding: '14px 16px',
						background: '#fff',
						border: `1px solid ${LINE}`,
						borderRadius: '6px'
					},
					[cb, tx]
				),
				r.cx,
				r.cy
			);
			if (hadFocus) cb.focus();
			A(
				card,
				[
					{ opacity: 0, transform: 'translateY(8px)' },
					{ opacity: 1, transform: 'none' }
				],
				250
			);
			await new Promise<void>((ok) => {
				cb.addEventListener('click', () => ok(), { once: true });
				if (auto) wait(700).then(ok);
			});
			cb.setAttribute('aria-disabled', 'true');
			S(cb, {
				border: `2px solid ${LINE}`,
				borderTopColor: INK,
				borderRadius: '50%',
				cursor: 'default'
			});
			const spin = cb.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], {
				duration: 600 / sp(),
				iterations: Infinity
			});
			await wait(1100);
			spin.cancel();
			S(cb, { border: `2px solid ${RED}`, borderRadius: '4px' });
			tx.textContent = 'You clicked too fast.';
			const n1 = say(ctx, 'suspiciously robotic', r.cx, r.cy + 46, { color: RED_TEXT });
			await wait(1300);
			unsay(ctx, n1);
			tx.textContent = 'I’m not a robot';
			cb.setAttribute('aria-checked', 'true');
			S(cb, { border: `2px solid ${GREEN}`, background: GREEN });
			cb.append(
				h('i', {
					position: 'absolute',
					left: '7px',
					top: '3px',
					width: '5px',
					height: '10px',
					borderRight: '2px solid #fff',
					borderBottom: '2px solid #fff',
					transform: 'rotate(45deg)'
				})
			);
			const n2 = say(ctx, 'fine, we’ll allow it', r.cx, r.cy + 46);
			await wait(900);
			unsay(ctx, n2);
			await A(card, [{ opacity: 1 }, { opacity: 0 }], 200);
			ctx.finish();
		};

		b.addEventListener('click', () => play());
		ctx.play = () => play(true);
	}
} satisfies Effect;
