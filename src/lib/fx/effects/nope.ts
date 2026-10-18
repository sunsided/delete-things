/** 47 · Refuses to leave: it shakes its head twice, sighs, and shuffles off. */
import { rel, S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { say, unsay } from '../kit.ts';

export default {
	badge: 'It left. Eventually.',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		S(b, { minWidth: r.w + 'px' });
		const shake = () =>
			A(
				b,
				['0', '28', '-28', '20', '-12', '0'].map((d) => ({
					transform: `perspective(400px) rotateY(${d}deg)`
				})),
				{ duration: 600, easing: 'ease-in-out' }
			);
		b.text.textContent = 'Nope.';
		await shake();
		await wait(450);
		b.text.textContent = 'Still no.';
		await shake();
		await wait(450);
		b.text.textContent = '…fine.';
		await wait(600);
		const s = say(ctx, '*sigh*', r.cx, r.y - 18);
		b.style.transformOrigin = '0% 100%';
		await A(
			b,
			[
				{ transform: 'none', opacity: 1 },
				{ transform: 'rotate(6deg) translateY(4px)', opacity: 0.85, offset: 0.35 },
				{ transform: `rotate(8deg) translate(${-r.x - r.w - 30}px,10px)`, opacity: 0 }
			],
			{ duration: 1900, easing: 'cubic-bezier(.4,0,.8,.6)' }
		);
		unsay(ctx, s);
	})
} satisfies Effect;
