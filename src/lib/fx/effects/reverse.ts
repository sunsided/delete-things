/** 49 · Don't delete: it promises it won't, thinks about it, and deletes itself anyway. */
import { rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { say, unsay } from '../kit.ts';

export default {
	badge: 'Deleted anyway',
	setup: simple(
		async (ctx, b) => {
			const { stage, A, wait } = ctx;
			const r = rel(stage, b);
			b.text.textContent = 'OK, I won’t.';
			await A(
				b,
				[{ transform: 'scale(1)' }, { transform: 'scale(1.05)' }, { transform: 'scale(1)' }],
				300
			);
			await wait(1000);
			const s = say(ctx, '…', r.cx, r.y - 18);
			await wait(600);
			unsay(ctx, s);
			await A(
				b,
				[
					{ transform: 'scale(1)', opacity: 1 },
					{ transform: 'scale(1.1,.9)', offset: 0.2, opacity: 1 },
					{ transform: 'scale(0,1)', opacity: 0 }
				],
				{ duration: 260, easing: 'cubic-bezier(.6,0,.9,.4)' }
			);
		},
		{ label: 'Don’t delete' }
	)
} satisfies Effect;
