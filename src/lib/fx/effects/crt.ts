/**
 * 62 · Power off: the button collapses into a bright line, then a dot, the way an old
 * cathode-ray telly switched off, and the dot fades.
 */
import { h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { CARD, INK } from '../particles.ts';

export default {
	badge: 'Switched off',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const glow = '0 0 12px 3px rgba(255,255,255,.9)';
		await A(
			b,
			[
				{ filter: 'brightness(1)', background: CARD },
				{ filter: 'brightness(1.6)', background: '#fff' }
			],
			120
		);
		await A(
			b,
			[
				{ transform: 'scale(1,1)', background: '#fff', boxShadow: 'none' },
				{ transform: 'scale(1.08,.04)', background: '#fff', boxShadow: glow }
			],
			{ duration: 220, easing: 'cubic-bezier(.7,0,.9,.5)' }
		);
		b.style.visibility = 'hidden';
		const dot = place(
			h('i', {
				width: r.w + 'px',
				height: '2px',
				background: '#fff',
				borderRadius: '1px',
				boxShadow: `${glow}, 0 0 0 1px ${INK}`
			}),
			r.x,
			r.cy - 1
		);
		stage.append(dot);
		await A(
			dot,
			[
				{ transform: 'scale(1,1)', borderRadius: '1px' },
				{ transform: `scale(${6 / r.w},3)`, borderRadius: '50%' }
			],
			{ duration: 260, easing: 'cubic-bezier(.6,0,.4,1)' }
		);
		await wait(250);
		await A(
			dot,
			[
				{ opacity: 1, transform: `scale(${6 / r.w},3)` },
				{ opacity: 0, transform: `scale(${2 / r.w},1)` }
			],
			700
		);
		dot.remove();
	})
} satisfies Effect;
