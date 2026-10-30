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
		// The horseshoe in plain container coordinates: arms 12px thick at y 0–12 and 36–48,
		// steel poles flush on their open ends. The outline is four 1px drop-shadows, which
		// trace only what is painted, so nothing is drawn across the open side.
		const ink = [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1]
		]
			.map(([x, y]) => `drop-shadow(${x}px ${y}px 0 ${INK})`)
			.join(' ');
		const pole = (top: number) =>
			h('i', {
				position: 'absolute',
				left: 0,
				top: top + 'px',
				width: '12px',
				height: '12px',
				background: color.steel,
				border: `1.5px solid ${INK}`,
				boxSizing: 'border-box'
			});
		const mag = place(
			h('i', { width: '56px', height: '48px' }, [
				h('i', {
					position: 'absolute',
					left: '10px',
					top: 0,
					width: '46px',
					height: '48px',
					boxSizing: 'border-box',
					border: `12px solid ${RED}`,
					borderLeft: 'none',
					borderRadius: '0 24px 24px 0',
					filter: ink
				}),
				pole(0),
				pole(36)
			]),
			W - 60,
			r.cy - 24
		);
		stage.append(mag);
		await A(mag, [{ transform: 'translateX(80px)' }, { transform: 'none' }], {
			duration: 500,
			easing: 'cubic-bezier(.3,1.3,.5,1)'
		});
		const sr = stage.getBoundingClientRect();
		const target = W - 64;
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
		// Each letter sticks to one of the two poles, 18px above or below the middle.
		await Promise.all(letters.map((e, i) => fly(e, i, i % 2 ? 18 : -18)));
		await fly(b.icon, 0, 18);
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
