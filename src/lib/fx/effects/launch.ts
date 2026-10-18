/** 20 · Launch into the sun: a flame lights, the label counts down, and the button blasts off. */
import { h, jit, place, rel, rnd } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { ORANGE, RED } from '../particles.ts';

export default {
	badge: 'Launched',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const holder = h('i', {
			position: 'absolute',
			left: '50%',
			top: '100%',
			width: '22px',
			height: '36px',
			marginLeft: '-11px',
			transformOrigin: '50% 0',
			transform: 'scaleY(0)'
		});
		const flame = h('i', {
			position: 'absolute',
			inset: 0,
			borderRadius: '50% 50% 50% 50% / 22% 22% 78% 78%',
			background: `linear-gradient(#fff3c4,${ORANGE} 40%,${RED})`,
			transformOrigin: '50% 0'
		});
		holder.append(flame);
		b.append(holder);
		flame.animate([{ transform: 'scale(1,1)' }, { transform: 'scale(.82,1.25)' }], {
			duration: 70,
			iterations: Infinity,
			direction: 'alternate'
		});
		const smoke = () => {
			for (let i = 0; i < 10; i++) {
				const s = rnd(14, 26);
				const p = place(
					h('i', {
						width: s + 'px',
						height: s + 'px',
						borderRadius: '50%',
						background: '#d6cfc2',
						opacity: 0
					}),
					r.cx - s / 2,
					r.b + 8 - s / 2
				);
				stage.insertBefore(p, b);
				A(
					p,
					[
						{ opacity: 0.9, transform: 'translate(0,0) scale(.3)' },
						{
							opacity: 0,
							transform: `translate(${(i % 2 ? 1 : -1) * rnd(20, 80)}px,${rnd(-6, 14)}px) scale(1.6)`
						}
					],
					{ duration: rnd(900, 1400), delay: rnd(0, 250) }
				);
			}
		};
		A(holder, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(.45)' }], 300);
		const rumble = b.animate(jit(6, 1.4), { duration: 90, iterations: Infinity });
		for (const n of ['3', '2', '1']) {
			b.text.textContent = n;
			await wait(320);
		}
		b.text.textContent = 'Bye';
		smoke();
		rumble.cancel();
		A(holder, [{ transform: 'scaleY(.45)' }, { transform: 'scaleY(1.5)' }], 200);
		await A(b, [{ transform: 'translateY(0)' }, { transform: 'translateY(-340px)' }], {
			duration: 900,
			easing: 'cubic-bezier(.6,0,.9,.4)'
		});
		await wait(300);
	})
} satisfies Effect;
