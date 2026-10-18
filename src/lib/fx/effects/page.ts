/**
 * 41 · Delete the page: every block on the page falls off the bottom, a fixed overlay says the
 * page is gone, then "Just kidding." and everything springs back.
 */
import { font } from '../../design/tokens.ts';
import { h, jit, rnd } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { INK, MUTE, RED } from '../particles.ts';

export default {
	badge: 'Nothing was harmed',
	setup: simple(
		async (ctx, b) => {
			const { stage, A, wait } = ctx;
			const main = stage.closest('main') ?? document.body;
			const els = [...main.children].flatMap((c) =>
				c.tagName === 'SECTION' ? [...c.children] : [c]
			);
			const fall = new Map<Element, string>();
			const msg = h(
				'div',
				{ font: `600 clamp(28px,4vw,44px)/1.1 ${font.sans}`, color: INK, letterSpacing: '-.02em' },
				'This page has been deleted.'
			);
			const sub = h('div', { font: `500 13px/1 ${font.mono}`, color: MUTE }, '0 items remaining');
			const o = h(
				'div',
				{
					position: 'fixed',
					inset: 0,
					zIndex: 9999,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '14px',
					pointerEvents: 'none',
					textAlign: 'center',
					padding: '24px'
				},
				[msg, sub]
			);
			// These animations live outside the stage, so a reset would not clear them: put the page
			// back and drop the overlay if the cycle is aborted midway.
			const restore = () => {
				o.remove();
				els.forEach((e) => e.getAnimations().forEach((a) => a.cancel()));
				main.getAnimations().forEach((a) => a.cancel());
			};
			ctx.signal.addEventListener('abort', restore, { once: true });

			await A(main, jit(10, 3), { duration: 400, easing: 'linear' });
			const vh = innerHeight;
			await Promise.all(
				els.map((e) => {
					const t = e.getBoundingClientRect().top;
					const to = `translateY(${Math.max(200, vh - t + 120)}px) rotate(${rnd(-28, 28)}deg)`;
					fall.set(e, to);
					return A(e, [{ transform: 'none' }, { transform: to }], {
						duration: rnd(700, 950),
						delay: Math.max(0, Math.min(vh, t)) * 0.35 + rnd(0, 160),
						easing: 'cubic-bezier(.55,0,1,.45)'
					});
				})
			);
			document.body.append(o);
			await A(o, [{ opacity: 0 }, { opacity: 1 }], 300);
			await wait(1400);
			await A(
				msg,
				[
					{ transform: 'scale(1)', opacity: 1 },
					{ transform: 'scale(.9)', opacity: 0 }
				],
				160
			);
			msg.textContent = 'Just kidding.';
			msg.style.color = RED;
			sub.textContent = 'restoring everything…';
			await A(
				msg,
				[
					{ transform: 'scale(1.3) rotate(-4deg)', opacity: 0 },
					{ transform: 'scale(1) rotate(-2deg)', opacity: 1 }
				],
				{ duration: 380, easing: 'cubic-bezier(.3,1.6,.5,1)' }
			);
			await wait(600);
			A(o, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, delay: 200 }).then(() => o.remove());
			await Promise.all(
				els.map((e, i) =>
					A(e, [{ transform: fall.get(e) }, { transform: 'none' }], {
						duration: 720,
						delay: i * 28,
						easing: 'cubic-bezier(.3,1.25,.5,1)'
					})
				)
			);
			els.forEach((e) => e.getAnimations().forEach((a) => a.cancel()));
			main.getAnimations().forEach((a) => a.cancel());
			await A(
				b,
				[
					{ opacity: 1, transform: 'scale(1)' },
					{ opacity: 0, transform: 'scale(.9)' }
				],
				200
			);
			// From here on the page is whole; only the overlay may still be fading.
			ctx.signal.removeEventListener('abort', restore);
			ctx.signal.addEventListener('abort', () => o.remove(), { once: true });
		},
		{ label: 'Delete page' }
	)
} satisfies Effect;
