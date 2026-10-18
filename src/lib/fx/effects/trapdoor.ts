/** 19 · Trapdoor: two doors under the button swing open, it drops through, they bounce shut. */
import { h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import type { Btn } from '../parts.ts';
import { INK, LINE } from '../particles.ts';

const doors = new WeakMap<Btn, [HTMLElement, HTMLElement]>();

export default {
	badge: 'Down the hatch',
	setup: simple(
		async (ctx, b) => {
			const { stage, A, wait } = ctx;
			const r = rel(stage, b);
			const [L, R] = doors.get(b)!;
			const travel = r.h + 60;
			await A(
				b,
				[
					{ transform: 'translateY(0)' },
					{ transform: 'translateY(-6px)', offset: 0.4 },
					{ transform: 'translateY(0)' }
				],
				{ duration: 260, easing: 'cubic-bezier(.3,0,.5,1)' }
			);
			const open = { duration: 240, easing: 'cubic-bezier(.5,0,.8,.5)' };
			A(L, [{ transform: 'rotate(0)' }, { transform: 'rotate(82deg)' }], open);
			A(R, [{ transform: 'rotate(0)' }, { transform: 'rotate(-82deg)' }], open);
			await wait(80);
			const k: Keyframe[] = [];
			for (let i = 0; i <= 16; i++) {
				const t = i / 16;
				const y = travel * t * t;
				k.push({
					transform: `translateY(${y}px)`,
					clipPath: `inset(0 -2px ${Math.min(r.h + 2, Math.max(0, y - 6))}px -2px)`
				});
			}
			await A(b, k, { duration: 520, easing: 'linear' });
			b.style.visibility = 'hidden';
			await wait(150);
			const shut = { duration: 420, easing: 'cubic-bezier(.4,0,.6,1)' };
			A(
				L,
				[
					{ transform: 'rotate(82deg)' },
					{ transform: 'rotate(-10deg)', offset: 0.6 },
					{ transform: 'rotate(4deg)', offset: 0.8 },
					{ transform: 'rotate(0)' }
				],
				shut
			);
			await A(
				R,
				[
					{ transform: 'rotate(-82deg)' },
					{ transform: 'rotate(10deg)', offset: 0.6 },
					{ transform: 'rotate(-4deg)', offset: 0.8 },
					{ transform: 'rotate(0)' }
				],
				shut
			);
		},
		{
			init: (ctx, b) => {
				const { stage } = ctx;
				const L = h('i', {
					position: 'absolute',
					height: '3px',
					background: INK,
					transformOrigin: '0 50%'
				});
				const R = h('i', {
					position: 'absolute',
					height: '3px',
					background: INK,
					transformOrigin: '100% 50%'
				});
				const fl = h('i', { position: 'absolute', height: '3px', background: LINE });
				const fr = h('i', { position: 'absolute', height: '3px', background: LINE });
				stage.append(fl, fr, L, R);
				doors.set(b, [L, R]);
				// Re-measured on resize and once fonts load; skipped while the drop plays.
				const layout = () => {
					if (!b.isConnected) return ro.disconnect();
					if (ctx.busy) return;
					const r = rel(stage, b);
					const fy = r.b + 6;
					const half = r.w / 2 + 8;
					const W = stage.clientWidth;
					place(L, r.cx - half, fy, { width: half - 1 + 'px' });
					place(R, r.cx + 1, fy, { width: half - 1 + 'px' });
					place(fl, 20, fy, { width: Math.max(0, r.cx - half - 22) + 'px' });
					place(fr, r.cx + half + 2, fy, { width: Math.max(0, W - (r.cx + half) - 22) + 'px' });
				};
				const ro = new ResizeObserver(layout);
				ro.observe(stage);
				ro.observe(b);
				ctx.signal.addEventListener('abort', () => ro.disconnect(), { once: true });
				layout();
				document.fonts?.ready.then(layout);
			}
		}
	)
} satisfies Effect;
