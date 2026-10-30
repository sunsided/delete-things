/**
 * 43 · Cookie consent: a cookie banner wants an answer first. Accepting turns the button into
 * a cookie, which crumbles.
 */
import { color, font } from '../../design/tokens.ts';
import { h, jit, rel, S } from '../dom.ts';
import type { Effect } from '../engine.ts';
import { btn, setBusy } from '../parts.ts';
import { burst, CARD, INK } from '../particles.ts';

const CHIPS = [
	[12, 12],
	[29, 9],
	[21, 25],
	[34, 30],
	[11, 33]
];

export default {
	badge: 'Cookies accepted',
	setup: (ctx) => {
		const { stage, A, wait } = ctx;
		const b = btn();
		stage.append(b);

		const play = async (auto = false) => {
			if (ctx.busy) return;
			ctx.busy = true;
			setBusy(b, true);
			const hadFocus = stage.contains(document.activeElement);
			const r = rel(stage, b);
			const acc = h(
				'button',
				{
					height: '30px',
					padding: '0 12px',
					border: 'none',
					borderRadius: '6px',
					background: color.redOnDark,
					color: INK,
					font: `600 12px/1 ${font.sans}`,
					cursor: 'pointer',
					flex: 'none',
					touchAction: 'manipulation'
				},
				'Accept'
			);
			acc.type = 'button';
			const ban = h(
				'div',
				{
					position: 'absolute',
					left: '12px',
					right: '12px',
					bottom: '12px',
					display: 'flex',
					alignItems: 'center',
					gap: '10px',
					padding: '9px 9px 9px 14px',
					background: INK,
					color: CARD,
					borderRadius: '8px',
					font: `400 12px/1.35 ${font.sans}`
				},
				[h('span', { flex: '1' }, 'We use cookies to delete this button.'), acc]
			);
			stage.append(ban);
			// Armed before the slide-in, so an early press of Accept is not lost.
			const accepted = new Promise<void>((ok) =>
				acc.addEventListener('click', () => ok(), { once: true })
			);
			if (hadFocus) acc.focus({ preventScroll: true });
			await A(ban, [{ transform: 'translateY(80px)' }, { transform: 'none' }], {
				duration: 350,
				easing: 'cubic-bezier(.3,1.3,.5,1)'
			});
			await (auto ? Promise.race([accepted, wait(900)]) : accepted);
			acc.disabled = true;
			A(ban, [{ transform: 'none' }, { transform: 'translateY(90px)' }], 300);
			S(b, { width: r.w + 'px' });
			A(b.icon, [{ opacity: 1 }, { opacity: 0 }], 150);
			await A(b.text, [{ opacity: 1 }, { opacity: 0 }], 150);
			await A(
				b,
				[
					{
						width: r.w + 'px',
						height: '48px',
						padding: '0 22px',
						borderRadius: '10px',
						background: CARD,
						borderColor: INK
					},
					{
						width: '52px',
						height: '52px',
						padding: '0',
						borderRadius: '50%',
						background: color.cookie,
						borderColor: color.cookieEdge
					}
				],
				{ duration: 420, easing: 'cubic-bezier(.3,1.3,.5,1)' }
			);
			for (const [x, y] of CHIPS)
				b.append(
					h('i', {
						position: 'absolute',
						left: x + 'px',
						top: y + 'px',
						width: '7px',
						height: '6px',
						borderRadius: '50%',
						background: color.cookieChip
					})
				);
			await wait(350);
			await A(b, jit(7, 2), { duration: 240, easing: 'linear' });
			b.style.visibility = 'hidden';
			await burst(ctx, r.cx, r.cy, 22, [color.cookie, '#a8743f', color.cookieChip], [18, 70]);
			ctx.finish();
		};

		b.addEventListener('click', () => play());
		ctx.play = () => play(true);
	}
} satisfies Effect;
