/**
 * 54 · Hydra: delete one head and two grow back, then four, then eight. The next click pops
 * them all.
 */
import { place } from '../dom.ts';
import type { Effect } from '../engine.ts';
import { say, unsay } from '../kit.ts';
import { btn, setBusy, type Btn } from '../parts.ts';
import { burst, INK, LINE, MUTE, RED, RED_TEXT, ring } from '../particles.ts';

/** Columns, rows and scale of each generation. */
const GEN: [number, number, number][] = [
	[1, 1, 1],
	[2, 1, 0.8],
	[2, 2, 0.62],
	[4, 2, 0.4]
];
const CAPS = ['', 'cut one off…', 'two more grow back', 'uh oh'];

export default {
	badge: 'Hydra slain',
	setup: (ctx) => {
		const { stage, A, wait } = ctx;
		const b = btn();
		stage.append(b);
		let lvl = 0;
		let heads: Btn[] = [b];
		let cap: HTMLElement | null = null;

		const grow = async () => {
			if (ctx.busy) return;
			ctx.busy = true;
			heads.forEach((x) => setBusy(x, true));
			const hadFocus = stage.contains(document.activeElement);
			lvl++;
			const W = stage.clientWidth;
			const H = stage.clientHeight;
			const bw = b.offsetWidth;
			const bh = b.offsetHeight;
			if (lvl >= GEN.length) {
				if (cap) unsay(ctx, cap);
				const sr = stage.getBoundingClientRect();
				for (const x of heads) {
					const q = x.getBoundingClientRect();
					const cx = q.left - sr.left + q.width / 2;
					const cy = q.top - sr.top + q.height / 2;
					x.style.visibility = 'hidden';
					burst(ctx, cx, cy, 8, [RED, INK, LINE], [20, 50]);
					ring(ctx, cx, cy, RED, 50);
				}
				await wait(700);
				ctx.finish();
				return;
			}
			const [c, rw, s] = GEN[lvl];
			const gx = bw * s + 8;
			const gy = bh * s + 8;
			heads.forEach((x) => x !== b && x.remove());
			b.style.visibility = 'hidden';
			heads = [];
			for (let j = 0; j < rw; j++)
				for (let i = 0; i < c; i++) {
					const ox = (i - (c - 1) / 2) * gx;
					const oy = (j - (rw - 1) / 2) * gy + 8;
					const x = btn();
					place(x, W / 2 - bw / 2, H / 2 - bh / 2, { width: bw + 'px' });
					x.addEventListener('click', grow);
					setBusy(x, true);
					stage.append(x);
					heads.push(x);
					A(
						x,
						[
							{ transform: `translate(0,0) scale(${s * 0.5})`, opacity: 0 },
							{ transform: `translate(${ox}px,${oy}px) scale(${s})`, opacity: 1 }
						],
						{ duration: 400, easing: 'cubic-bezier(.3,1.5,.5,1)' }
					);
				}
			if (hadFocus) heads[0].focus();
			if (cap) unsay(ctx, cap);
			cap = say(ctx, CAPS[lvl], W / 2, 20, { color: lvl === 3 ? RED_TEXT : MUTE });
			await wait(420);
			ctx.busy = false;
			heads.forEach((x) => setBusy(x, false));
		};

		b.addEventListener('click', grow);
		ctx.play = async () => {
			while (lvl < GEN.length) {
				await grow();
				await wait(550);
			}
		};
	}
} satisfies Effect;
