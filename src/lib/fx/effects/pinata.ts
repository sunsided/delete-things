/**
 * 73 · Piñata: it is strung up, swings, takes two whacks that only make it swing harder, and
 * bursts on the third.
 */
import { color } from '../../design/tokens.ts';
import { h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { burst, GOLD, GREEN, INK, LINE, ORANGE, RED, ring } from '../particles.ts';

const COLS = [RED, GOLD, color.teal, GREEN, ORANGE];

export default {
	badge: 'Smashed',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const string = place(h('i', { width: '1.5px', background: INK }), r.cx - 0.75, 0, {
			height: r.y + 'px'
		});
		const stick = place(
			h('i', {
				width: '70px',
				height: '8px',
				background: color.sandDark,
				border: `1.5px solid ${INK}`,
				borderRadius: '4px',
				boxSizing: 'border-box',
				transformOrigin: '100% 50%'
			}),
			r.x - 66,
			r.cy - 4
		);
		stage.append(string, stick);
		// The string and the button swing together from the top of the stage.
		const pivot = `${r.w / 2}px ${-r.y}px`;
		b.style.transformOrigin = pivot;
		string.style.transformOrigin = '50% 0';
		await A(string, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], 250);
		const swing = (deg: number, ms: number) =>
			Promise.all(
				[b, string].map((e) =>
					A(
						e,
						[
							{ transform: 'rotate(0)' },
							{ transform: `rotate(${-deg}deg)`, offset: 0.25 },
							{ transform: `rotate(${deg * 0.7}deg)`, offset: 0.6 },
							{ transform: `rotate(${-deg * 0.3}deg)`, offset: 0.85 },
							{ transform: 'rotate(0)' }
						],
						{ duration: ms, easing: 'ease-in-out' }
					)
				)
			);
		const whack = () =>
			A(
				stick,
				[
					{ transform: 'translateX(-30px) rotate(-30deg)', opacity: 1 },
					{ transform: 'translateX(2px) rotate(0)', offset: 0.6 },
					{ transform: 'translateX(-30px) rotate(-30deg)' }
				],
				{ duration: 320, easing: 'cubic-bezier(.5,0,.3,1)' }
			);
		await A(stick, [{ opacity: 0 }, { opacity: 1 }], 150);
		for (const deg of [6, 12]) {
			await whack();
			ring(ctx, r.x, r.cy, LINE, 40);
			await swing(deg, 900);
			await wait(150);
		}
		await A(
			stick,
			[
				{ transform: 'translateX(-30px) rotate(-30deg)' },
				{ transform: 'translateX(6px) rotate(4deg)' }
			],
			{ duration: 200, easing: 'cubic-bezier(.6,0,.9,.4)' }
		);
		b.style.visibility = 'hidden';
		A(string, [{ transform: 'scaleY(1)' }, { transform: 'scaleY(.3)', opacity: 0 }], 400);
		ring(ctx, r.cx, r.cy, GOLD, 110);
		burst(ctx, r.cx, r.cy, 34, COLS, [50, 130]);
		await wait(250);
		await A(stick, [{ opacity: 1 }, { opacity: 0 }], 300);
		await wait(600);
	})
} satisfies Effect;
