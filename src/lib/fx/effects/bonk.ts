/** 53 · Delete²: a second Delete button falls on the first one, which sees stars. */
import { h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { say, unsay } from '../kit.ts';
import { btn } from '../parts.ts';
import { GOLD } from '../particles.ts';

export default {
	badge: 'Delete deleted Delete',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait, sp } = ctx;
		const r = rel(stage, b);
		const o = btn();
		place(o, r.x, -60, { width: r.w + 'px', pointerEvents: 'none' });
		o.inert = true;
		o.tabIndex = -1;
		o.setAttribute('aria-hidden', 'true');
		stage.append(o);
		const land = r.y - r.h + 60;
		await A(
			o,
			[
				{ transform: 'translateY(0) rotate(-8deg)' },
				{ transform: `translateY(${land}px) rotate(3deg)` }
			],
			{ duration: 420, easing: 'cubic-bezier(.55,0,1,.45)' }
		);
		b.style.transformOrigin = '50% 100%';
		A(b, [{ transform: 'scaleY(1)' }, { transform: 'scaleY(.8)' }, { transform: 'scaleY(1)' }], {
			duration: 220,
			easing: 'cubic-bezier(.3,0,.5,1)'
		});
		await A(
			o,
			[
				{ transform: `translateY(${land}px) rotate(3deg)` },
				{ transform: `translateY(${land - 14}px) rotate(-5deg)`, offset: 0.4 },
				{ transform: `translateY(${land + r.h * 0.2}px) rotate(2deg)` }
			],
			{ duration: 300, easing: 'cubic-bezier(.3,0,.5,1)' }
		);
		// Four diamonds circling on a flat ellipse over the bottom button's head.
		const cy = r.y + 6;
		const stars = [0, 1, 2, 3].map((i) => {
			const s = place(
				h('i', { width: '7px', height: '7px', background: GOLD, transform: 'rotate(45deg)' }),
				r.cx - 3,
				cy
			);
			stage.append(s);
			const k: Keyframe[] = [];
			for (let j = 0; j <= 8; j++) {
				const a = (j / 8 + i / 4) * Math.PI * 2;
				k.push({
					transform: `translate(${Math.cos(a) * 34}px,${Math.sin(a) * 8}px) rotate(45deg)`
				});
			}
			s.animate(k, { duration: 800 / sp(), iterations: Infinity });
			return s;
		});
		const d = say(ctx, '@#$%!', r.cx, r.b + 20);
		await wait(1300);
		stars.forEach((s) => s.remove());
		unsay(ctx, d);
		await Promise.all([
			A(o, [{ opacity: 1 }, { opacity: 0 }], 250),
			A(b, [{ opacity: 1 }, { opacity: 0 }], 250)
		]);
	})
} satisfies Effect;
