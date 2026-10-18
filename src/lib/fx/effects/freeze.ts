/** 26 · Freeze & shatter: the button frosts over, cracks into ten shards and they fall. */
import { color } from '../../design/tokens.ts';
import { place, rel, rnd, S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { CARD, INK } from '../particles.ts';

const GLOW = 'inset 0 0 12px 2px rgba(255,255,255,.95)';
const N = 5;

export default {
	badge: 'Shattered',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		await A(
			b,
			[
				{
					background: CARD,
					borderColor: INK,
					color: INK,
					boxShadow: 'inset 0 0 0 0 rgba(255,255,255,0)'
				},
				{
					background: color.iceGround,
					borderColor: color.ice,
					color: color.iceText,
					boxShadow: GLOW
				}
			],
			600
		);
		A(
			b,
			[{ filter: 'brightness(1)' }, { filter: 'brightness(1.12)' }, { filter: 'brightness(1)' }],
			200
		);

		// Five jittered vertical slices, each broken across a jittered middle line.
		const tops = [0];
		const bots = [0];
		for (let i = 1; i < N; i++) {
			tops.push((r.w * i) / N + rnd(-10, 10));
			bots.push((r.w * i) / N + rnd(-14, 14));
		}
		tops.push(r.w);
		bots.push(r.w);
		const cx = r.w / 2;
		const shards: { c: HTMLElement; vx: number; vy: number }[] = [];
		for (let i = 0; i < N; i++) {
			const mid = r.h * rnd(0.35, 0.65);
			const ml = `${(tops[i] + bots[i]) / 2}px ${mid}px`;
			const mr = `${(tops[i + 1] + bots[i + 1]) / 2}px ${mid}px`;
			const halves = [
				[`${tops[i]}px 0`, `${tops[i + 1]}px 0`, mr, ml],
				[ml, mr, `${bots[i + 1]}px ${r.h}px`, `${bots[i]}px ${r.h}px`]
			];
			halves.forEach((pts, j) => {
				const c = b.cloneNode(true) as HTMLElement;
				c.inert = true;
				place(c, r.x, r.y, {
					width: r.w + 'px',
					height: r.h + 'px',
					margin: 0,
					clipPath: `polygon(${pts.join(',')})`
				});
				S(c, {
					background: color.iceGround,
					borderColor: color.ice,
					color: color.iceText,
					boxShadow: GLOW
				});
				const sx = (tops[i] + tops[i + 1]) / 2;
				stage.append(c);
				shards.push({ c, vx: (sx - cx) / cx, vy: j ? 1 : -1 });
			});
		}
		b.style.visibility = 'hidden';
		await Promise.all(
			shards.map(({ c, vx, vy }) =>
				A(c, [{ transform: 'none' }, { transform: `translate(${vx * 2}px,${vy * 1.2}px)` }], {
					duration: 90,
					easing: 'steps(1)'
				})
			)
		);
		await wait(260);
		await Promise.all(
			shards.map(({ c, vx, vy }) =>
				A(
					c,
					[
						{ transform: `translate(${vx * 2}px,${vy * 1.2}px) rotate(0)`, opacity: 1 },
						{
							transform: `translate(${vx * rnd(20, 50)}px,${rnd(90, 140)}px) rotate(${rnd(-90, 90)}deg)`,
							opacity: 0
						}
					],
					{ duration: rnd(650, 900), easing: 'cubic-bezier(.5,0,.9,.6)' }
				)
			)
		);
	})
} satisfies Effect;
