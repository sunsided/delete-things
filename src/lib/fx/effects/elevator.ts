/**
 * 75 · Going down: lift doors close on the button, the floor display counts down past the
 * basement and keeps going, a ding, and the doors open on nothing.
 */
import { color, font } from '../../design/tokens.ts';
import { h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { CARD, INK } from '../particles.ts';

const FLOORS = ['G', '-1', '-2', '-3', '-7', '-19', '-404', '∞'];

export default {
	badge: 'Gone down',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const pad = 10;
		const fw = r.w + pad * 2;
		const fh = r.h + pad * 2;
		const fx = r.x - pad;
		const fy = r.y - pad;
		const frame = place(
			h('i', {
				width: fw + 'px',
				height: fh + 'px',
				border: `1.5px solid ${INK}`,
				borderRadius: '4px',
				boxSizing: 'border-box'
			}),
			fx,
			fy
		);
		const door = (left: boolean) =>
			place(
				h('i', {
					width: fw / 2 + 'px',
					height: fh + 'px',
					background: color.steel,
					border: `1.5px solid ${INK}`,
					boxSizing: 'border-box',
					transform: `translateX(${left ? -fw / 2 : fw / 2}px)`,
					opacity: 0
				}),
				left ? fx : fx + fw / 2,
				fy
			);
		const dl = door(true);
		const dr = door(false);
		const show = h(
			'div',
			{
				minWidth: '44px',
				padding: '4px 6px',
				background: INK,
				color: color.redOnDark,
				borderRadius: '3px',
				font: `600 12px/1 ${font.mono}`,
				textAlign: 'center',
				boxSizing: 'border-box'
			},
			'G'
		);
		show.setAttribute('aria-hidden', 'true');
		place(show, r.cx - 22, fy - 28);
		stage.append(frame, show, dl, dr);
		await Promise.all([frame, show].map((e) => A(e, [{ opacity: 0 }, { opacity: 1 }], 250)));
		await wait(250);
		const close = (open: boolean) =>
			Promise.all(
				[dl, dr].map((d, i) => {
					const out = `translateX(${i ? fw / 2 : -fw / 2}px)`;
					return A(
						d,
						[
							{ transform: open ? 'none' : out, opacity: 1 },
							{ transform: open ? out : 'none', opacity: 1 }
						],
						{ duration: 520, easing: 'cubic-bezier(.5,0,.3,1)' }
					);
				})
			);
		await close(false);
		b.style.visibility = 'hidden';
		for (const [i, f] of FLOORS.entries()) {
			show.textContent = f;
			await wait(i < 3 ? 380 : 220);
		}
		await wait(300);
		show.style.color = CARD;
		show.textContent = 'ding';
		await wait(400);
		await close(true);
		await wait(500);
		await Promise.all(
			[frame, show, dl, dr].map((e) => A(e, [{ opacity: 1 }, { opacity: 0 }], 250))
		);
	})
} satisfies Effect;
