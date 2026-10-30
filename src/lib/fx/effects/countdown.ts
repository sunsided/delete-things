/**
 * 69 · Self-destruct: it counts down from five, blinking red, and goes off with the smallest
 * puff imaginable.
 */
import { color, font } from '../../design/tokens.ts';
import { rel, S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { say, unsay } from '../kit.ts';
import { burst, CARD, INK, LINE, RED, RED_TEXT, ring } from '../particles.ts';

export default {
	badge: 'Destructed',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		S(b, { minWidth: r.w + 'px', font: `600 15px/1 ${font.mono}` });
		b.icon.style.display = 'none';
		const warn = say(ctx, 'SELF-DESTRUCT ARMED', r.cx, r.y - 20, {
			color: RED_TEXT,
			fontWeight: '700'
		});
		for (let n = 5; n > 0; n--) {
			b.text.textContent = String(n);
			A(
				b,
				[
					{ borderColor: RED, color: RED_TEXT, background: color.hover },
					{ borderColor: INK, color: INK, background: CARD }
				],
				{ duration: 520 }
			);
			await A(b, [{ transform: 'scale(1.08)' }, { transform: 'scale(1)' }], {
				duration: 300,
				easing: 'cubic-bezier(.3,1.6,.5,1)'
			});
			await wait(n > 2 ? 400 : 250);
		}
		unsay(ctx, warn);
		b.text.textContent = '0';
		await A(b, [{ transform: 'scale(1)' }, { transform: 'scale(1.25,.8)' }], 200);
		b.style.visibility = 'hidden';
		ring(ctx, r.cx, r.cy, LINE, 40);
		await burst(ctx, r.cx, r.cy, 6, [LINE, INK], [10, 24]);
		const pff = say(ctx, 'pff.', r.cx, r.cy);
		await wait(900);
		await unsay(ctx, pff);
	})
} satisfies Effect;
