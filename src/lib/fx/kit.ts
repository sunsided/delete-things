/**
 * The small helpers Volume III's timelines share: captions, numeric tweens, hiding the
 * button, parabolic arcs and the crumple-to-ball morph.
 */
import { font } from '../design/tokens.ts';
import { at, h, S, type Style } from './dom.ts';
import type { FxContext } from './engine.ts';
import type { Btn } from './parts.ts';
import { CARD, MUTE } from './particles.ts';

/** A centred 12px mono caption at (cx, cy) that fades up into place, 200ms. */
export function say(ctx: FxContext, text: string, cx: number, cy: number, s: Style = {}) {
	const e = at(
		ctx.stage,
		h(
			'div',
			{
				font: `500 12px/1.3 ${font.mono}`,
				color: MUTE,
				whiteSpace: 'nowrap',
				textAlign: 'center',
				pointerEvents: 'none',
				...s
			},
			text
		),
		cx,
		cy
	);
	ctx.A(
		e,
		[
			{ opacity: 0, transform: 'translateY(4px)' },
			{ opacity: 1, transform: 'none' }
		],
		200
	);
	return e;
}

/** Fades a caption out (180ms) and removes it. */
export const unsay = (ctx: FxContext, e: HTMLElement) =>
	ctx.A(e, [{ opacity: 1 }, { opacity: 0 }], 180).then(() => e.remove());

export const linear = (t: number) => t;
export const outCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Calls fn with the eased progress 0→1 on every frame for ms (speed applied), for text that
 * counts. Like ctx.wait, it never settles once the cycle is aborted.
 */
export function tween(ctx: FxContext, ms: number, fn: (p: number) => void, ease = linear) {
	const t0 = performance.now();
	const D = ms / ctx.sp();
	return new Promise<void>((ok) => {
		const step = (t: number) => {
			if (ctx.signal.aborted) return;
			const p = Math.min(1, (t - t0) / D);
			fn(ease(p));
			if (p < 1) requestAnimationFrame(step);
			else ok();
		};
		requestAnimationFrame(step);
	});
}

/** Shrinks the button to .92 and fades it (160ms), then hides it for good. */
export async function hide(ctx: FxContext, b: HTMLElement) {
	await ctx.A(
		b,
		[
			{ opacity: 1, transform: 'scale(1)' },
			{ opacity: 0, transform: 'scale(.92)' }
		],
		160
	);
	b.style.visibility = 'hidden';
}

/** n+1 points on a parabola from (x0, y0) to (x1, y1) that rises hg px above the chord. */
export const arc = (x0: number, y0: number, x1: number, y1: number, hg: number, n = 10) =>
	Array.from({ length: n + 1 }, (_, i) => {
		const t = i / n;
		return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t - hg * 4 * t * (1 - t)] as const;
	});

/** #05's crumple: the contents fade, then the button balls up (560ms). */
export async function toBall(ctx: FxContext, b: Btn, w: number) {
	const { A } = ctx;
	S(b, { width: w + 'px' });
	A(b.icon, [{ opacity: 1 }, { opacity: 0 }], 150);
	await A(b.text, [{ opacity: 1 }, { opacity: 0 }], 150);
	await A(
		b,
		[
			{
				width: w + 'px',
				padding: '0 22px',
				borderRadius: '10px',
				transform: 'rotate(0) scale(1)',
				background: CARD
			},
			{
				width: '48px',
				padding: '0',
				borderRadius: '48% 52% 42% 58%',
				transform: 'rotate(220deg) scale(.55)',
				background: '#e2dbcc'
			}
		],
		{ duration: 560, easing: 'cubic-bezier(.6,0,.3,1)' }
	);
}
