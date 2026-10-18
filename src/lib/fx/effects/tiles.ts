/** 25 · Tile flip: the button splits into a 7×2 grid of tiles that flip away in a diagonal wave. */
import { place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';

const C = 7;
const R = 2;

export default {
	badge: 'Flipped out',
	setup: simple(async (ctx, b) => {
		const { stage, A } = ctx;
		const r = rel(stage, b);
		const tw = r.w / C;
		const th = r.h / R;
		const ps: Promise<void>[] = [];
		for (let y = 0; y < R; y++)
			for (let x = 0; x < C; x++) {
				const c = b.cloneNode(true) as HTMLElement;
				c.inert = true;
				place(c, r.x, r.y, {
					width: r.w + 'px',
					height: r.h + 'px',
					margin: 0,
					clipPath: `inset(${y * th}px ${r.w - (x + 1) * tw}px ${r.h - (y + 1) * th}px ${x * tw}px)`,
					transformOrigin: `${(x + 0.5) * tw}px ${(y + 0.5) * th}px`
				});
				stage.append(c);
				ps.push(
					A(
						c,
						[
							{ transform: 'perspective(260px) rotateY(0) translateY(0)', opacity: 1 },
							{
								transform: 'perspective(260px) rotateY(90deg) translateY(4px)',
								opacity: 1,
								offset: 0.45
							},
							{ transform: 'perspective(260px) rotateY(180deg) translateY(30px)', opacity: 0 }
						],
						{ duration: 600, delay: (x + y) * 70, easing: 'cubic-bezier(.5,0,.6,1)' }
					)
				);
			}
		b.style.visibility = 'hidden';
		await Promise.all(ps);
	})
} satisfies Effect;
