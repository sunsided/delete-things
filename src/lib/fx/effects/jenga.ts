/**
 * 72 · Load-bearing: the button turns out to be the middle block of a stack. It slides out,
 * the blocks above drop into its place, wobble, and topple off the stage.
 */
import { color } from '../../design/tokens.ts';
import { h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { INK, LINE } from '../particles.ts';

const block = (w: number, hh: number) =>
	h('i', {
		width: w + 'px',
		height: hh + 'px',
		background: color.sand,
		border: `1.5px solid ${INK}`,
		borderRadius: '4px',
		boxSizing: 'border-box'
	});

export default {
	badge: 'Structurally deleted',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const W = stage.clientWidth;
		const H = stage.clientHeight;
		const bh = 22;
		const above = [0, 1].map((i) => place(block(r.w, bh), r.x, r.y - (i + 1) * (bh + 2)));
		const below = place(block(r.w, bh), r.x, r.b + 2);
		const floor = place(h('i', { height: '2px', background: LINE }), r.x - 30, r.b + bh + 4, {
			width: r.w + 60 + 'px'
		});
		stage.append(floor, below, ...above);
		await Promise.all(
			[below, ...above].map((e, i) =>
				A(
					e,
					[
						{ opacity: 0, transform: 'translateY(-12px)' },
						{ opacity: 1, transform: 'none' }
					],
					{ duration: 260, delay: i * 90, easing: 'cubic-bezier(.3,1.4,.5,1)' }
				)
			)
		);
		await wait(250);
		// Wiggle it loose, then pull.
		await A(
			b,
			['0', '-3', '3', '-2', '0'].map((x) => ({ transform: `translateX(${x}px)` })),
			{ duration: 300, easing: 'linear' }
		);
		await A(b, [{ transform: 'translateX(0)' }, { transform: `translateX(${W - r.x + 20}px)` }], {
			duration: 700,
			easing: 'cubic-bezier(.6,0,.8,.3)'
		});
		b.style.visibility = 'hidden';
		const drop = r.h + 2;
		await Promise.all(
			above.map((e) =>
				A(e, [{ transform: 'none' }, { transform: `translateY(${drop}px)` }], {
					duration: 260,
					easing: 'cubic-bezier(.5,0,.9,.5)'
				})
			)
		);
		// The drop is taller than the gap it fills, so the stack lands crooked.
		const top = above[1];
		top.style.transformOrigin = '0% 100%';
		await A(
			top,
			[
				{ transform: `translateY(${drop}px) rotate(0)` },
				{ transform: `translateY(${drop}px) rotate(-6deg)`, offset: 0.3 },
				{ transform: `translateY(${drop}px) rotate(2deg)`, offset: 0.6 },
				{ transform: `translateY(${drop}px) rotate(-3deg)` }
			],
			{ duration: 600, easing: 'ease-in-out' }
		);
		await wait(250);
		await Promise.all(
			[...above, below].map((e, i) =>
				A(
					e,
					[
						{ transform: `translateY(${i < 2 ? drop : 0}px) rotate(${i === 1 ? -3 : 0}deg)` },
						{
							transform: `translate(${-r.x - r.w - 40 + i * 12}px,${H - r.y + 40}px) rotate(${-50 - i * 25}deg)`
						}
					],
					{ duration: 900, delay: (2 - i) * 70, easing: 'cubic-bezier(.5,0,.9,.6)' }
				)
			)
		);
		await A(floor, [{ opacity: 1 }, { opacity: 0 }], 200);
	})
} satisfies Effect;
