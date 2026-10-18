/** 31 · Ghosted: the button turns into a little ghost that says boo and floats away. */
import { font } from '../../design/tokens.ts';
import { at, h, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { CARD, INK, MUTE } from '../particles.ts';

export default {
	badge: 'Ghosted',
	setup: simple(async (ctx, b) => {
		const { stage, A } = ctx;
		const r = rel(stage, b);
		A(b.icon, [{ opacity: 1 }, { opacity: 0 }], 200);
		await A(b.text, [{ opacity: 1 }, { opacity: 0 }], 200);
		const eyes = [0.38, 0.62].map((f) => {
			const e = h('i', {
				position: 'absolute',
				left: `calc(${f * 100}% - 3px)`,
				top: '38%',
				width: '6px',
				height: '8px',
				borderRadius: '50%',
				background: INK,
				opacity: 0
			});
			b.append(e);
			return e;
		});
		await A(
			b,
			[
				{
					borderRadius: '10px',
					background: CARD,
					borderColor: INK,
					width: r.w + 'px',
					padding: '0 22px'
				},
				{
					borderRadius: '26px 26px 8px 8px',
					background: 'rgba(251,249,244,.75)',
					borderColor: 'rgba(29,27,24,.35)',
					width: '70px',
					padding: '0'
				}
			],
			{ duration: 450, easing: 'cubic-bezier(.3,1.3,.5,1)' }
		);
		await Promise.all(
			eyes.map((e) =>
				A(
					e,
					[
						{ opacity: 0, transform: 'scaleY(.2)' },
						{ opacity: 1, transform: 'scaleY(1)' }
					],
					200
				)
			)
		);
		const boo = at(
			stage,
			h('div', { font: `600 13px/1 ${font.mono}`, color: MUTE, opacity: 0 }, 'boo'),
			r.cx + 48,
			r.cy - 26
		);
		A(
			boo,
			[
				{ opacity: 0, transform: 'translateY(4px)' },
				{ opacity: 1, transform: 'none', offset: 0.3 },
				{ opacity: 1, offset: 0.7 },
				{ opacity: 0 }
			],
			900
		);
		// 150px up along a sine wobble of one and a half periods, fading quadratically.
		const k: Keyframe[] = [];
		for (let i = 0; i <= 12; i++) {
			const t = i / 12;
			const s = Math.sin(t * Math.PI * 3);
			k.push({
				transform: `translate(${s * 16}px,${-t * 150}px) rotate(${s * -6}deg)`,
				opacity: 1 - t * t
			});
		}
		await A(b, k, { duration: 1500, easing: 'cubic-bezier(.4,0,.7,1)', delay: 400 });
	})
} satisfies Effect;
