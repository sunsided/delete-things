/**
 * 06 · Undo window (actually good UX). Deletes at once, then offers four seconds to take
 * it back. The countdown pauses while the pointer or focus is on the toast, so a keyboard
 * or a slow hand still reaches Undo. In production, commit the real delete only when the
 * window closes.
 */
import { color, font } from '../../design/tokens.ts';
import { h } from '../dom.ts';
import type { Effect } from '../engine.ts';
import { btn, setBusy } from '../parts.ts';
import { CARD, GREEN, INK } from '../particles.ts';

const N = 4;

export default {
	badge: 'Gone for good',
	setup: (ctx) => {
		const { stage, A, sp } = ctx;
		const b = btn();
		stage.append(b);
		const play = async () => {
			if (ctx.busy) return;
			ctx.busy = true;
			setBusy(b, true);
			await A(
				b,
				[
					{ opacity: 1, transform: 'scale(1)' },
					{ opacity: 0, transform: 'scale(.92)' }
				],
				180
			);
			b.style.display = 'none';

			const num = h(
				'span',
				{ font: `500 12px/1 ${font.mono}`, color: '#a8a196', minWidth: '18px' },
				N + 's'
			);
			const ub = h(
				'button',
				{
					border: 'none',
					background: 'none',
					padding: '8px 6px',
					font: `600 14px/1 ${font.sans}`,
					color: color.redOnDark,
					cursor: 'pointer',
					textDecoration: 'underline',
					textUnderlineOffset: '3px'
				},
				'Undo'
			);
			ub.type = 'button';
			const bar = h('i', {
				position: 'absolute',
				left: 0,
				bottom: 0,
				height: '3px',
				width: '100%',
				background: color.redOnDark,
				transformOrigin: 'left'
			});
			const toast = h(
				'div',
				{
					position: 'relative',
					display: 'flex',
					alignItems: 'center',
					gap: '12px',
					height: '48px',
					padding: '0 8px 0 16px',
					background: INK,
					color: CARD,
					borderRadius: '10px',
					overflow: 'hidden',
					font: `500 14px/1 ${font.sans}`,
					whiteSpace: 'nowrap'
				},
				[h('span', null, 'File deleted'), num, ub, bar]
			);
			toast.setAttribute('role', 'status');
			stage.append(toast);
			A(
				toast,
				[
					{ opacity: 0, transform: 'translateY(8px) scale(.96)' },
					{ opacity: 1, transform: 'none' }
				],
				{
					duration: 320,
					easing: 'cubic-bezier(.3,1.4,.5,1)'
				}
			);
			// Move focus to Undo when the delete came from the keyboard: the button that had it
			// is gone, and Undo is the one thing worth reaching.
			if (stage.contains(document.activeElement) || document.activeElement === document.body)
				ub.focus();

			// The bar is the clock: the seconds shown are read off it, so pausing it pauses both.
			const ba = bar.animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], {
				duration: (N * 1000) / sp(),
				fill: 'forwards'
			});
			const total = (N * 1000) / sp();
			const tick = setInterval(() => {
				const left = Math.ceil((total - Number(ba.currentTime ?? 0)) / (1000 / sp()));
				num.textContent = Math.max(0, left) + 's';
			}, 100);
			let hover = false;
			let focus = false;
			const sync = () => (hover || focus ? ba.pause() : ba.play());
			toast.addEventListener('pointerenter', () => ((hover = true), sync()));
			toast.addEventListener('pointerleave', () => ((hover = false), sync()));
			toast.addEventListener('focusin', () => ((focus = true), sync()));
			toast.addEventListener('focusout', () => ((focus = false), sync()));

			const res = await new Promise<'gone' | 'undo'>((ok) => {
				ba.onfinish = () => ok('gone');
				ub.onclick = () => ok('undo');
				ctx.signal.addEventListener('abort', () => clearInterval(tick), { once: true });
			});
			clearInterval(tick);
			ba.pause();
			if (res === 'undo') {
				await A(toast, [{ opacity: 1 }, { opacity: 0, transform: 'translateY(6px)' }], 200);
				toast.remove();
				b.style.display = 'inline-flex';
				b.focus();
				// Armed again at once, so the restored button takes a click during its spring.
				ctx.busy = false;
				setBusy(b, false);
				await A(
					b,
					[
						{ opacity: 0, transform: 'scale(.9)' },
						{ opacity: 1, transform: 'scale(1)' }
					],
					{
						duration: 420,
						easing: 'cubic-bezier(.3,1.6,.5,1)'
					}
				);
				const n = h(
					'div',
					{
						position: 'absolute',
						left: '50%',
						bottom: '34px',
						transform: 'translateX(-50%)',
						font: `500 12px/1 ${font.mono}`,
						color: GREEN,
						whiteSpace: 'nowrap'
					},
					'restored — nothing was lost'
				);
				n.setAttribute('role', 'status');
				stage.append(n);
				A(
					n,
					[
						{ opacity: 0 },
						{ opacity: 1, offset: 0.15 },
						{ opacity: 1, offset: 0.8 },
						{ opacity: 0 }
					],
					2200
				).then(() => n.remove());
			} else {
				await A(
					toast,
					[
						{ transform: 'scale(1)', opacity: 1 },
						{ transform: 'scaleX(.5) scaleY(.1)', opacity: 0 }
					],
					{
						duration: 360,
						easing: 'cubic-bezier(.6,0,.8,.4)'
					}
				);
				ctx.finish();
			}
		};
		b.addEventListener('click', play);
		ctx.play = play;
	}
} satisfies Effect;
