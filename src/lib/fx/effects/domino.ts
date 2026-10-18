/** 32 · Domino: the icon and each letter topple over on their bottom-right corners, one after another. */
import { split } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { fadeFrame } from '../particles.ts';

export default {
	badge: 'Toppled',
	setup: simple(async (ctx, b) => {
		const { A, wait } = ctx;
		const pieces: HTMLElement[] = [b.icon, ...split(b.text)];
		await fadeFrame(ctx, b);
		pieces.forEach((p) => (p.style.transformOrigin = '100% 100%'));
		await Promise.all(
			pieces.map((p, i) =>
				A(
					p,
					[
						{ transform: 'rotate(0)', easing: 'cubic-bezier(.6,0,1,.6)' },
						{ transform: 'rotate(90deg)', offset: 0.75, easing: 'cubic-bezier(0,.6,.4,1)' },
						{ transform: 'rotate(80deg)', offset: 0.88 },
						{ transform: 'rotate(90deg)' }
					],
					{ duration: 520, delay: i * 95, easing: 'linear' }
				)
			)
		);
		await wait(200);
		await Promise.all(pieces.map((p) => A(p, [{ opacity: 1 }, { opacity: 0 }], 250)));
	})
} satisfies Effect;
