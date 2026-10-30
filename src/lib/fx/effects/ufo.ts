/**
 * 68 · Abducted: a saucer drops in, switches on its beam, and lifts the button up and away,
 * shrinking as it goes.
 */
import { color } from '../../design/tokens.ts';
import { h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { GOLD, INK } from '../particles.ts';

export default {
	badge: 'Taken',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const W = stage.clientWidth;
		const sy = 14;
		const dome = h('i', {
			position: 'absolute',
			left: '24px',
			top: '-12px',
			width: '32px',
			height: '18px',
			borderRadius: '16px 16px 0 0',
			background: color.dropletLight,
			border: `1.5px solid ${INK}`,
			borderBottom: 'none',
			boxSizing: 'border-box'
		});
		const lights = [16, 36, 56].map((x) =>
			h('i', {
				position: 'absolute',
				left: x + 'px',
				top: '7px',
				width: '6px',
				height: '6px',
				borderRadius: '50%',
				background: GOLD
			})
		);
		const ufo = place(
			h(
				'i',
				{
					width: '80px',
					height: '20px',
					borderRadius: '50%',
					background: color.saucer,
					border: `1.5px solid ${INK}`,
					boxSizing: 'border-box'
				},
				[dome, ...lights]
			),
			r.cx - 40,
			sy
		);
		const beamTop = sy + 16;
		const beam = place(
			h('i', {
				width: r.w + 40 + 'px',
				height: r.b - beamTop + 8 + 'px',
				background: `linear-gradient(${color.beam}, rgba(255,210,122,.15))`,
				clipPath: 'polygon(38% 0, 62% 0, 100% 100%, 0 100%)',
				transformOrigin: '50% 0'
			}),
			r.cx - r.w / 2 - 20,
			beamTop
		);
		stage.insertBefore(beam, b);
		stage.append(ufo);
		await A(
			ufo,
			[
				{ transform: `translate(${W / 2}px,-80px) rotate(12deg)` },
				{ transform: 'translate(0,0) rotate(0)' }
			],
			{ duration: 700, easing: 'cubic-bezier(.2,1.2,.4,1)' }
		);
		lights.forEach((l, i) =>
			A(l, [{ opacity: 1 }, { opacity: 0.2 }, { opacity: 1 }], {
				duration: 400,
				delay: i * 130,
				iterations: 6
			})
		);
		await A(beam, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], 300);
		await A(b, [{ transform: 'translateY(0)' }, { transform: 'translateY(-6px) rotate(-3deg)' }], {
			duration: 400,
			easing: 'ease-in-out'
		});
		await A(
			b,
			[
				{ transform: 'translateY(-6px) rotate(-3deg) scale(1)', opacity: 1 },
				{ transform: `translateY(${sy + 10 - r.cy}px) rotate(8deg) scale(.15)`, opacity: 0.6 }
			],
			{ duration: 1100, easing: 'cubic-bezier(.5,0,.6,1)' }
		);
		b.style.visibility = 'hidden';
		await A(beam, [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)' }], 220);
		await wait(150);
		await A(
			ufo,
			[
				{ transform: 'translate(0,0)' },
				{ transform: 'translate(-6px,4px)', offset: 0.2 },
				{ transform: `translate(${-W}px,-60px)` }
			],
			{ duration: 600, easing: 'cubic-bezier(.6,0,.9,.4)' }
		);
	})
} satisfies Effect;
