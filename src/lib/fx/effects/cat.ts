/**
 * 63 · Off the table: a paw comes in from the side, taps the button, waits, taps again, and
 * slowly pushes it over the edge.
 */
import { color } from '../../design/tokens.ts';
import { h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { INK, LINE } from '../particles.ts';

const bean = (x: number, y: number, s: number) =>
	h('i', {
		position: 'absolute',
		left: x + 'px',
		top: y + 'px',
		width: s + 'px',
		height: s + 'px',
		borderRadius: '50%',
		background: color.furBean
	});

export default {
	badge: 'Knocked off',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const W = stage.clientWidth;
		const H = stage.clientHeight;
		// The table: a floor line under the button that ends short of the left edge.
		const edge = Math.max(12, r.x - 24);
		const table = place(h('i', { height: '2px', background: LINE }), edge, r.b + 1, {
			width: W - edge + 'px'
		});
		stage.insertBefore(table, b);
		await A(table, [{ opacity: 0 }, { opacity: 1 }], 200);
		const paw = place(
			h(
				'i',
				{
					width: '90px',
					height: '30px',
					background: color.fur,
					border: `1.5px solid ${INK}`,
					borderRadius: '6px 16px 16px 6px',
					boxSizing: 'border-box'
				},
				[bean(8, 6, 6), bean(8, 15, 6), bean(16, 10, 8)]
			),
			W,
			r.cy - 8
		);
		stage.append(paw);
		// Where the paw's left edge meets the button, once the button has moved by off.
		const touch = (off: number) => `translateX(${r.r + off - W}px)`;
		const D = 600;
		const tap = async (n: number) => {
			const from = -(n - 1) * 8;
			const to = -n * 8;
			A(
				b,
				[
					{ transform: `translateX(${from}px)` },
					{ transform: `translateX(${to}px) rotate(-1deg)` }
				],
				{
					duration: D * 0.15,
					delay: D * 0.55,
					easing: 'cubic-bezier(.3,1.6,.5,1)'
				}
			);
			await A(
				paw,
				[
					{ transform: 'translateX(0)' },
					{ transform: touch(from), offset: 0.55 },
					{ transform: touch(to), offset: 0.7 },
					{ transform: `${touch(to)} translateX(30px)` }
				],
				{ duration: D, easing: 'cubic-bezier(.4,0,.3,1)' }
			);
			await A(
				paw,
				[{ transform: `${touch(to)} translateX(30px)` }, { transform: 'translateX(0)' }],
				400
			);
		};
		await tap(1);
		await wait(500);
		await tap(2);
		await wait(700);
		// The push: slow, deliberate, all the way to the edge and over.
		const go = r.x - edge + r.w * 0.6;
		await A(paw, [{ transform: 'translateX(0)' }, { transform: touch(-16) }], {
			duration: 600,
			easing: 'cubic-bezier(.4,0,.3,1)'
		});
		const push = { duration: 1300, easing: 'linear' };
		A(paw, [{ transform: touch(-16) }, { transform: touch(-16 - go) }], push);
		b.style.transformOrigin = '0% 100%';
		await A(
			b,
			[{ transform: 'translateX(-16px)' }, { transform: `translateX(${-go - 16}px)` }],
			push
		);
		A(
			b,
			[
				{ transform: `translateX(${-go - 16}px) rotate(0)` },
				{ transform: `translate(${-go - 40}px,${H - r.y}px) rotate(-70deg)` }
			],
			{ duration: 520, easing: 'cubic-bezier(.5,0,.9,.5)' }
		);
		await wait(300);
		await A(paw, [{ transform: touch(-16 - go) }, { transform: 'translateX(0)' }], 700);
		b.style.visibility = 'hidden';
		await wait(500);
		await A(table, [{ opacity: 1 }, { opacity: 0 }], 200);
	})
} satisfies Effect;
