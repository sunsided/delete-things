/**
 * 52 · Wrong one: the card's own title and description fall away first. It notices, puts
 * them back, and deletes itself instead.
 */
import { jit, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { say, unsay } from '../kit.ts';
import { RED_TEXT } from '../particles.ts';

const GONE = 'translateY(30px) rotate(-3deg)';

export default {
	badge: 'Right one this time',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		// The caption sits outside the stage, so a reset would not clear it: put it back if
		// the cycle is aborted while it is gone.
		const info = stage.nextElementSibling;
		const restore = () => info?.getAnimations().forEach((a) => a.cancel());
		ctx.signal.addEventListener('abort', restore, { once: true });
		const r = rel(stage, b);
		if (info)
			await A(
				info,
				[
					{ transform: 'none', opacity: 1 },
					{ transform: GONE, opacity: 0 }
				],
				{ duration: 500, easing: 'cubic-bezier(.5,0,.9,.6)' }
			);
		const s = say(ctx, 'wait… wrong one', r.cx, r.y - 20, { color: RED_TEXT });
		A(b, jit(8, 2), { duration: 400, easing: 'linear' });
		await wait(1000);
		if (info) {
			await A(
				info,
				[
					{ transform: GONE, opacity: 0 },
					{ transform: 'none', opacity: 1 }
				],
				{ duration: 500, easing: 'cubic-bezier(.3,1.4,.5,1)' }
			);
			restore();
		}
		ctx.signal.removeEventListener('abort', restore);
		unsay(ctx, s);
		await wait(300);
		await A(
			b,
			[
				{ transform: 'scale(1)', opacity: 1 },
				{ transform: 'scale(0)', opacity: 0 }
			],
			{ duration: 300, easing: 'cubic-bezier(.6,0,.9,.4)' }
		);
	})
} satisfies Effect;
