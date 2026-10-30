/**
 * 81 · Sorted: three bins appear. The button tries glass and plastic and is spat back out of
 * both before paper takes it: it was a document all along.
 */
import { color, font } from '../../design/tokens.ts';
import { h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { arc, say, toBall, unsay } from '../kit.ts';
import { GREEN, INK, RED_TEXT } from '../particles.ts';

/** Label and colour of each bin; the colours are shapes only, the labels sit in ink below. */
const BINS: [string, string][] = [
	['Glass', GREEN],
	['Plastic', color.gold],
	['Paper', color.rain]
];

export default {
	badge: 'Recycled',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const W = stage.clientWidth;
		const H = stage.clientHeight;
		const bw = 46;
		const bh = 50;
		const by = H - bh - 22;
		const gap = Math.min(80, (W - 40) / 3);
		const xs = BINS.map((_, i) => W / 2 + (i - 1) * gap);
		const bins = BINS.map(([label, c], i) => {
			const lid = h('i', {
				position: 'absolute',
				left: '-4px',
				top: '-6px',
				width: bw + 8 + 'px',
				height: '5px',
				background: INK,
				borderRadius: '2px',
				transformOrigin: '0 100%'
			});
			const bin = place(
				h(
					'div',
					{
						width: bw + 'px',
						height: bh + 'px',
						background: c,
						border: `1.5px solid ${INK}`,
						borderRadius: '0 0 6px 6px',
						boxSizing: 'border-box'
					},
					[
						lid,
						h(
							'span',
							{
								position: 'absolute',
								left: '50%',
								top: bh + 4 + 'px',
								transform: 'translateX(-50%)',
								font: `500 11px/1 ${font.mono}`,
								color: INK
							},
							label
						)
					]
				),
				xs[i] - bw / 2,
				by
			);
			stage.append(bin);
			return Object.assign(bin, { lid });
		});
		await Promise.all(
			bins.map((e, i) =>
				A(
					e,
					[
						{ opacity: 0, transform: 'translateY(20px)' },
						{ opacity: 1, transform: 'none' }
					],
					{
						duration: 300,
						delay: i * 80,
						easing: 'cubic-bezier(.3,1.4,.5,1)'
					}
				)
			)
		);
		await toBall(ctx, b, r.w);
		// The ball: centred where the button was, scaled to .55 by the crumple.
		let x = r.cx;
		let y = r.cy;
		const hop = async (tx: number, ty: number, ms: number, hg = 50) => {
			const pts = arc(x - r.cx, y - r.cy, tx - r.cx, ty - r.cy, hg);
			await A(
				b,
				pts.map(([px, py], i) => ({
					transform: `translate(${px}px,${py}px) rotate(${220 + i * 36}deg) scale(.55)`
				})),
				{ duration: ms, easing: 'linear' }
			);
			x = tx;
			y = ty;
		};
		const rim = by - 14;
		for (const [i, msg] of [
			[0, 'not glass'],
			[1, 'not plastic either']
		] as const) {
			A(bins[i].lid, [{ transform: 'rotate(0)' }, { transform: 'rotate(-50deg)' }], 200);
			await hop(xs[i], rim, 520);
			A(bins[i].lid, [{ transform: 'rotate(-50deg)' }, { transform: 'rotate(0)' }], {
				duration: 200,
				easing: 'cubic-bezier(.3,1.8,.5,1)'
			});
			A(
				bins[i],
				[{ transform: 'none' }, { transform: 'translateY(-4px)' }, { transform: 'none' }],
				200
			);
			const s = say(ctx, msg, xs[i], 18, { color: RED_TEXT });
			await hop(xs[i] + gap / 2, r.cy - 10, 420, 40);
			unsay(ctx, s);
		}
		A(bins[2].lid, [{ transform: 'rotate(0)' }, { transform: 'rotate(-50deg)' }], 200);
		await hop(xs[2], by + 20, 520);
		b.style.visibility = 'hidden';
		await A(bins[2].lid, [{ transform: 'rotate(-50deg)' }, { transform: 'rotate(0)' }], {
			duration: 200,
			easing: 'cubic-bezier(.3,1.8,.5,1)'
		});
		const ok = say(ctx, 'paper. obviously.', xs[2], 18);
		await wait(900);
		unsay(ctx, ok);
		await Promise.all(bins.map((e) => A(e, [{ opacity: 1 }, { opacity: 0 }], 250)));
	})
} satisfies Effect;
