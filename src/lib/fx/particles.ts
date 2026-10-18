/**
 * Particle helpers shared across effects, and the palette in the short names the effect
 * timelines use.
 */
import { color } from '../design/tokens.ts';
import { h, place, rnd } from './dom.ts';
import type { FxContext } from './engine.ts';

export const INK = color.ink;
export const CARD = color.card;
export const MUTE = color.mono;
export const RED = color.red;
export const GREEN = color.green;
export const LINE = color.line;
export const ORANGE = color.orange;
export const GOLD = color.gold;
/** Fully transparent, for fading borders and grounds out. */
export const CLEAR = 'rgba(0,0,0,0)';

/** A 2px circular outline that grows from .2 to full size while fading out, 520ms. */
export function ring(ctx: FxContext, cx: number, cy: number, c: string = RED, size = 90) {
	const e = place(
		h('i', {
			width: size + 'px',
			height: size + 'px',
			borderRadius: '50%',
			border: `2px solid ${c}`,
			boxSizing: 'border-box'
		}),
		cx - size / 2,
		cy - size / 2
	);
	ctx.stage.append(e);
	return ctx
		.A(
			e,
			[
				{ transform: 'scale(.2)', opacity: 1 },
				{ transform: 'scale(1)', opacity: 0 }
			],
			{
				duration: 520,
				easing: 'cubic-bezier(.1,.7,.3,1)'
			}
		)
		.then(() => e.remove());
}

/**
 * Rectangular confetti, 4–10 × 3–8px, flying out radially with a 24px downward bias,
 * spinning ±400° and fading over 600–950ms.
 */
export function burst(
	ctx: FxContext,
	cx: number,
	cy: number,
	n = 18,
	colors: string[] = [INK, RED, LINE],
	dist: [number, number] = [50, 110]
) {
	return Promise.all(
		Array.from({ length: n }, (_, i) => {
			const a = (i / n) * Math.PI * 2 + rnd(-0.3, 0.3);
			const d = rnd(...dist);
			const w = rnd(4, 10);
			const hh = rnd(3, 8);
			const p = place(
				h('i', {
					width: w + 'px',
					height: hh + 'px',
					background: colors[i % colors.length],
					borderRadius: '1px'
				}),
				cx - w / 2,
				cy - hh / 2
			);
			ctx.stage.append(p);
			return ctx
				.A(
					p,
					[
						{ transform: 'translate(0,0) rotate(0)', opacity: 1 },
						{
							transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d + 24}px) rotate(${rnd(-400, 400)}deg)`,
							opacity: 0
						}
					],
					{ duration: rnd(600, 950), easing: 'cubic-bezier(.1,.8,.3,1)' }
				)
				.then(() => p.remove());
		})
	);
}

/** Fades a button's border and ground away, leaving its contents. */
export function fadeFrame(ctx: FxContext, b: HTMLElement, duration = 250) {
	return ctx.A(
		b,
		[
			{ borderColor: INK, background: CARD },
			{ borderColor: CLEAR, background: CLEAR }
		],
		duration
	);
}
