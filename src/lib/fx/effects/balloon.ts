/** 18 · Overinflated: the button inflates in stages, trembles, and pops. */
import { font } from '../../design/tokens.ts';
import { at, h, jit, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { burst, CARD, INK, ORANGE, RED, ring } from '../particles.ts';

const F = 'scale(1.42,1.5)';

export default {
	badge: 'Popped',
	setup: simple(async (ctx, b) => {
		const { stage, A } = ctx;
		const r = rel(stage, b);
		await A(
			b,
			[
				{ transform: 'scale(1)', borderRadius: '10px', background: CARD },
				{ transform: 'scale(1.12,1.18)', borderRadius: '24px', background: '#f6e0d9', offset: 0.3 },
				{ transform: 'scale(1.07,1.1)', offset: 0.42 },
				{ transform: 'scale(1.26,1.33)', borderRadius: '28px', background: '#f2cfc4', offset: 0.7 },
				{ transform: 'scale(1.2,1.26)', offset: 0.8 },
				{ transform: F, borderRadius: '30px', background: '#eebcae' }
			],
			{ duration: 1150, easing: 'cubic-bezier(.3,0,.6,1)' }
		);
		await A(b, jit(10, 1.6, F), { duration: 320, easing: 'linear' });
		b.style.visibility = 'hidden';
		ring(ctx, r.cx, r.cy, RED, 130);
		burst(ctx, r.cx, r.cy, 28, [RED, INK, '#eebcae', ORANGE], [40, 130]);
		const pop = at(
			stage,
			h('div', { font: `700 28px/1 ${font.sans}`, color: RED, letterSpacing: '-.02em' }, 'POP'),
			r.cx,
			r.cy
		);
		await A(
			pop,
			[
				{ transform: 'scale(.4) rotate(-10deg)', opacity: 0 },
				{ transform: 'scale(1.15) rotate(-6deg)', opacity: 1, offset: 0.25 },
				{ transform: 'scale(1) rotate(-6deg)', opacity: 1, offset: 0.7 },
				{ transform: 'scale(1) rotate(-6deg)', opacity: 0 }
			],
			750
		);
	})
} satisfies Effect;
