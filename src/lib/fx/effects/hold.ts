/**
 * 02 · Hold to confirm (actually good UX). Press and hold for 1200ms; let go early and the
 * fill backs off at three times the speed. Space and Enter hold too.
 */
import { h, jit, rel, S } from '../dom.ts';
import { color } from '../../design/tokens.ts';
import type { Effect } from '../engine.ts';
import { btn, setBusy } from '../parts.ts';
import { burst, INK, RED, ring } from '../particles.ts';

const D = 1200;
const LABEL = 'Hold to delete';

export default {
	badge: 'Deleted',
	setup: (ctx) => {
		const { stage, A, wait, sp } = ctx;
		const b = btn(LABEL);
		stage.append(b);
		const fill = h('i', {
			position: 'absolute',
			left: 0,
			top: 0,
			bottom: 0,
			width: '100%',
			background: color.fill,
			transformOrigin: 'left',
			transform: 'scaleX(0)'
		});
		b.prepend(fill);
		S(b, { overflow: 'hidden' });
		const fa = fill.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
			duration: D,
			fill: 'both',
			easing: 'cubic-bezier(.4,0,.8,1)'
		});
		fa.pause();
		let shake: Animation | undefined;
		let holding = false;
		const time = () => Number(fa.currentTime ?? 0);

		const down = (e?: Event) => {
			if (ctx.busy) return;
			e?.preventDefault();
			holding = true;
			b.text.textContent = 'Keep holding…';
			fa.playbackRate = sp();
			fa.play();
			shake = b.animate(jit(5, 1.2), { duration: 110, iterations: Infinity });
		};
		const up = () => {
			if (ctx.busy || !holding) return;
			holding = false;
			shake?.cancel();
			b.text.textContent = LABEL;
			if (time() < D) {
				fa.playbackRate = -3 * sp();
				fa.play();
			}
		};
		fa.onfinish = async () => {
			if (ctx.busy || fa.playbackRate < 0 || time() < D - 1) return;
			ctx.busy = true;
			setBusy(b, true);
			shake?.cancel();
			const r = rel(stage, b);
			b.text.textContent = 'Deleting';
			await A(
				b,
				[
					{ transform: 'scale(1)' },
					{ transform: 'scale(1.07)', offset: 0.3 },
					{ transform: 'scale(0)', opacity: 0 }
				],
				{
					duration: 420,
					easing: 'cubic-bezier(.5,0,.7,.4)'
				}
			);
			ring(ctx, r.cx, r.cy, RED, 110);
			burst(ctx, r.cx, r.cy, 12, [RED, INK]);
			await wait(300);
			ctx.finish();
		};

		b.addEventListener('pointerdown', down);
		for (const t of ['pointerup', 'pointerleave', 'pointercancel']) b.addEventListener(t, up);
		b.addEventListener('keydown', (e) => {
			if ((e.key === ' ' || e.key === 'Enter') && !e.repeat && !holding) down(e);
		});
		b.addEventListener('keyup', up);
		b.addEventListener('contextmenu', (e) => e.preventDefault());
		ctx.play = () => down();
	}
} satisfies Effect;
