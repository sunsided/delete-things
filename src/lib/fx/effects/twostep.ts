/**
 * 22 · Are you sure? (actually good UX): the button gives way to a "Delete this file?"
 * prompt with Cancel and Yes, delete. Cancel puts the button back.
 */
import { font } from '../../design/tokens.ts';
import { h } from '../dom.ts';
import type { Effect } from '../engine.ts';
import { btn, setBusy } from '../parts.ts';
import { CARD, INK, LINE, MUTE, RED } from '../particles.ts';

const SPRING = 'cubic-bezier(.3,1.4,.5,1)';

export default {
	badge: 'Deleted',
	setup: (ctx) => {
		const { stage, A, wait } = ctx;
		const b = btn();
		stage.append(b);
		const ghost = h(
			'button',
			{
				height: '48px',
				padding: '0 18px',
				border: `1.5px solid ${LINE}`,
				borderRadius: '10px',
				background: CARD,
				color: INK,
				font: `500 15px/1 ${font.sans}`,
				cursor: 'pointer'
			},
			'Cancel'
		);
		ghost.type = 'button';
		const yes = h(
			'button',
			{
				height: '48px',
				padding: '0 18px',
				border: `1.5px solid ${RED}`,
				borderRadius: '10px',
				background: RED,
				color: '#fff',
				font: `600 15px/1 ${font.sans}`,
				cursor: 'pointer'
			},
			'Yes, delete'
		);
		yes.type = 'button';
		const q = h(
			'div',
			{ font: `500 12px/1 ${font.mono}`, color: MUTE, textAlign: 'center' },
			'Delete this file?'
		);
		const grp = h(
			'div',
			{ display: 'none', flexDirection: 'column', alignItems: 'center', gap: '12px' },
			[q, h('div', { display: 'flex', gap: '8px' }, [ghost, yes])]
		);
		grp.setAttribute('role', 'group');
		grp.setAttribute('aria-label', 'Delete this file?');
		stage.append(grp);

		let confirmed = false;
		const open = async () => {
			if (ctx.busy) return;
			ctx.busy = true;
			setBusy(b, true);
			const hadFocus = stage.contains(document.activeElement);
			await A(
				b,
				[
					{ opacity: 1, transform: 'scale(1)' },
					{ opacity: 0, transform: 'scale(.9)' }
				],
				140
			);
			b.style.display = 'none';
			grp.style.display = 'flex';
			// The focused button just vanished; Cancel is the safe place to land.
			if (hadFocus) ghost.focus();
			A(
				q,
				[
					{ opacity: 0, transform: 'translateY(6px)' },
					{ opacity: 1, transform: 'none' }
				],
				250
			);
			A(
				ghost,
				[
					{ opacity: 0, transform: 'translateX(40px)' },
					{ opacity: 1, transform: 'none' }
				],
				{
					duration: 320,
					easing: SPRING
				}
			);
			A(
				yes,
				[
					{ opacity: 0, transform: 'translateX(-40px)' },
					{ opacity: 1, transform: 'none' }
				],
				{
					duration: 320,
					easing: SPRING
				}
			);
		};
		const cancel = async () => {
			if (confirmed) return;
			const hadFocus = grp.contains(document.activeElement);
			await A(grp, [{ opacity: 1 }, { opacity: 0 }], 150);
			grp.style.display = 'none';
			grp.getAnimations({ subtree: true }).forEach((a) => a.cancel());
			b.style.display = 'inline-flex';
			if (hadFocus) b.focus();
			// Armed before the spring, not after: a quick second Enter must not be swallowed.
			ctx.busy = false;
			setBusy(b, false);
			A(
				b,
				[
					{ opacity: 0, transform: 'scale(.9)' },
					{ opacity: 1, transform: 'scale(1)' }
				],
				{
					duration: 300,
					easing: 'cubic-bezier(.3,1.6,.5,1)'
				}
			);
		};
		const confirm = async () => {
			if (confirmed) return;
			confirmed = true;
			ghost.disabled = true;
			A(q, [{ opacity: 1 }, { opacity: 0 }], 150);
			A(ghost, [{ opacity: 1 }, { opacity: 0, transform: 'translateX(30px)' }], 200);
			await A(
				yes,
				[
					{ transform: 'scale(1)' },
					{ transform: 'scale(.92)', offset: 0.3 },
					{ transform: 'scale(0)', opacity: 0 }
				],
				{
					duration: 380,
					easing: 'cubic-bezier(.5,0,.7,.4)'
				}
			);
			ctx.finish();
		};

		b.addEventListener('click', open);
		ghost.addEventListener('click', cancel);
		yes.addEventListener('click', confirm);
		ctx.play = async () => {
			await open();
			await wait(700);
			confirm();
		};
	}
} satisfies Effect;
