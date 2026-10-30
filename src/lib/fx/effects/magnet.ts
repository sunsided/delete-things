/**
 * 74 · Magnetised: a horseshoe magnet slides in and pulls the label off letter by letter,
 * then the trash can, then the frame. It leaves with everything stuck to it.
 */
import { color } from '../../design/tokens.ts';
import { h, place, rel, split } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { fadeFrame, INK, RED } from '../particles.ts';

export default {
	badge: 'Attracted',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const W = stage.clientWidth;
		const pole = (top: number) =>
			h('i', {
				position: 'absolute',
				left: '-10px',
				top: top + 'px',
				width: '12px',
				height: '12px',
				background: color.steel,
				border: `1.5px solid ${INK}`,
				boxSizing: 'border-box'
			});
		const mag = place(
			h(
				'i',
				{
					width: '44px',
					height: '48px',
					boxSizing: 'border-box',
					border: `12px solid ${RED}`,
					borderLeft: 'none',
					borderRadius: '0 24px 24px 0',
					outline: `1.5px solid ${INK}`,
					outlineOffset: '-1px'
				},
				[pole(-12), pole(36)]
			),
			W - 52,
			r.cy - 24
		);
		stage.append(mag);
		await A(mag, [{ transform: 'translateX(80px)' }, { transform: 'none' }], {
			duration: 500,
			easing: 'cubic-bezier(.3,1.3,.5,1)'
		});
		const sr = stage.getBoundingClientRect();
		const target = W - 62;
		await A(
			b,
			['0', '2', '-1', '2', '0'].map((x) => ({ transform: `translateX(${x}px)` })),
			{
				duration: 300,
				easing: 'linear'
			}
		);
		// Nearest to the magnet goes first.
		const letters = split(b.text).reverse();
		const fly = (e: HTMLElement, i: number, dy: number) => {
			const q = e.getBoundingClientRect();
			const dx = target - (q.left - sr.left + q.width / 2);
			return A(
				e,
				[
					{ transform: 'translate(0,0) rotate(0)' },
					{ transform: 'translate(-2px,0) rotate(-8deg)', offset: 0.3 },
					{ transform: `translate(${dx}px,${dy}px) rotate(${(i % 2 ? 1 : -1) * 20}deg)` }
				],
				{ duration: 520, delay: i * 110, easing: 'cubic-bezier(.7,0,.9,.5)' }
			);
		};
		await Promise.all(letters.map((e, i) => fly(e, i, ((i % 3) - 1) * 8)));
		await fly(b.icon, 0, 0);
		await fadeFrame(ctx, b, 250);
		await wait(250);
		// What's stuck to it is still inside the button, so moving the button carries it along.
		const leave = [
			{ transform: 'none' },
			{ transform: 'translateX(-6px)', offset: 0.2 },
			{ transform: 'translateX(100px)' }
		];
		const o = { duration: 500, easing: 'cubic-bezier(.6,0,.9,.4)' };
		await Promise.all([A(mag, leave, o), A(b, leave, o)]);
	})
} satisfies Effect;
