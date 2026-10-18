/** 50 · Technically deleted: it shrinks to a speck, and a caption points out that it's gone. */
import { rel, S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { say } from '../kit.ts';

export default {
	badge: null,
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		await A(
			b,
			[
				{ transform: 'scale(1)' },
				{ transform: 'scale(1.1)', offset: 0.15 },
				{ transform: 'scale(.025)' }
			],
			{ duration: 1300, easing: 'cubic-bezier(.5,0,.2,1)' }
		);
		const s = say(ctx, '← technically deleted', 0, 0);
		S(s, { left: r.cx + 10 + 'px', top: r.cy - 8 + 'px' });
		await wait(1600);
		return null;
	})
} satisfies Effect;
