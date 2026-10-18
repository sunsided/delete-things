/** 08 · Clean cut: a red blade slices the button in two and both halves fall away. */
import { h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { RED } from '../particles.ts';

const ANG = 14;

export default {
	badge: 'Sliced',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const L = r.w + 70;
		const t = (Math.tan((ANG * Math.PI) / 180) * r.w) / 2;
		const m = r.h / 2;
		const blade = place(
			h('i', { width: L + 'px', height: '2px', background: RED, boxShadow: `0 0 8px ${RED}` }),
			r.cx - L / 2,
			r.cy - 1
		);
		stage.append(blade);
		await A(
			blade,
			[
				{ transform: `rotate(-${ANG}deg) scaleX(0)`, opacity: 1 },
				{ transform: `rotate(-${ANG}deg) scaleX(1)`, opacity: 1, offset: 0.6 },
				{ transform: `rotate(-${ANG}deg) scaleX(1)`, opacity: 0 }
			],
			{ duration: 320, easing: 'cubic-bezier(.7,0,.3,1)' }
		);
		const half = (clip: string) => {
			const c = b.cloneNode(true) as HTMLButtonElement;
			// The halves are pictures of the button, not controls.
			c.setAttribute('aria-hidden', 'true');
			c.tabIndex = -1;
			place(c, r.x, r.y, { width: r.w + 'px', height: r.h + 'px', margin: '0', clipPath: clip });
			stage.append(c);
			return c;
		};
		const top = half(`polygon(0 0,100% 0,100% ${m - t}px,0 ${m + t}px)`);
		const bot = half(`polygon(0 ${m + t}px,100% ${m - t}px,100% 100%,0 100%)`);
		b.style.visibility = 'hidden';
		blade.remove();
		await wait(120);
		const fall = { easing: 'cubic-bezier(.5,0,.9,.6)' };
		await Promise.all([
			A(
				top,
				[
					{ transform: 'none', opacity: 1 },
					{ transform: 'translate(-8px,-4px) rotate(-3deg)', offset: 0.25, opacity: 1 },
					{ transform: 'translate(-34px,120px) rotate(-28deg)', opacity: 0 }
				],
				{ duration: 950, ...fall }
			),
			A(
				bot,
				[
					{ transform: 'none', opacity: 1 },
					{ transform: 'translate(8px,4px) rotate(3deg)', offset: 0.25, opacity: 1 },
					{ transform: 'translate(38px,130px) rotate(32deg)', opacity: 0 }
				],
				{ duration: 1000, ...fall }
			)
		]);
	})
} satisfies Effect;
