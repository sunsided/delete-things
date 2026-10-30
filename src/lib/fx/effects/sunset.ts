/**
 * 69 · The end: a sun comes up over a sand horizon, the button walks off into it, shrinking
 * with every step, and the letterbox bars close in on THE END.
 */
import { color, font } from '../../design/tokens.ts';
import { at, h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { GOLD, INK, ORANGE } from '../particles.ts';

const STEPS = 8;

export default {
	badge: 'Fin',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const W = stage.clientWidth;
		const H = stage.clientHeight;
		const hz = H - 36;
		const D = 130;
		const sun = place(
			h('i', {
				width: D + 'px',
				height: D + 'px',
				borderRadius: '50%',
				background: `radial-gradient(circle at 50% 40%,${GOLD},${ORANGE})`
			}),
			W / 2 - D / 2,
			hz - D / 2
		);
		const ground = place(
			h('i', { background: color.sand, borderTop: `1.5px solid ${INK}` }),
			0,
			hz,
			{ width: W + 'px', height: H - hz + 'px' }
		);
		stage.insertBefore(ground, b);
		stage.insertBefore(sun, ground);
		await Promise.all([
			A(ground, [{ transform: `translateY(${H - hz}px)` }, { transform: 'none' }], 400),
			A(sun, [{ transform: `translateY(${D}px)` }, { transform: 'none' }], {
				duration: 900,
				easing: 'cubic-bezier(.3,.8,.4,1)'
			})
		]);
		await wait(200);
		// Walking: a bob per step, smaller and slower as it nears the horizon.
		const dx = W / 2 - r.cx;
		const dy = hz - 6 - r.cy;
		await A(
			b,
			Array.from({ length: STEPS * 2 + 1 }, (_, i) => {
				const t = i / (STEPS * 2);
				const s = 1 - 0.88 * t;
				const bob = i % 2 ? -6 * s : 0;
				return {
					transform: `translate(${dx * t}px,${dy * t + bob}px) rotate(${i % 2 ? (i % 4 === 1 ? -3 : 3) : 0}deg) scale(${s})`
				};
			}),
			{ duration: 2400, easing: 'linear' }
		);
		await A(b, [{ opacity: 1 }, { opacity: 0 }], 300);
		const bar = (top: boolean) =>
			place(h('i', { background: INK }), 0, top ? 0 : H - 30, { width: W + 'px', height: '30px' });
		const bars = [bar(true), bar(false)];
		stage.append(...bars);
		await Promise.all(
			bars.map((e, i) =>
				A(e, [{ transform: `translateY(${i ? 30 : -30}px)` }, { transform: 'none' }], {
					duration: 500,
					easing: 'cubic-bezier(.5,0,.3,1)'
				})
			)
		);
		const end = at(
			stage,
			h(
				'div',
				{ font: `700 22px/1 ${font.sans}`, letterSpacing: '.3em', color: INK, opacity: 0 },
				'THE END'
			),
			W / 2,
			hz - 40
		);
		await A(end, [{ opacity: 0 }, { opacity: 1 }], 600);
		await wait(1000);
		await Promise.all(
			[end, sun, ground, ...bars].map((e) => A(e, [{ opacity: 1 }, { opacity: 0 }], 300))
		);
	})
} satisfies Effect;
