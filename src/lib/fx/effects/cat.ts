/**
 * 63 · Off the table: a cat's arm reaches in from the side, taps the button, waits, taps
 * again, and slowly pushes it over the edge.
 */
import { color } from '../../design/tokens.ts';
import { h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { INK, LINE } from '../particles.ts';

const ARM = 34;

/**
 * A tabby's foreleg seen from the side: a striped forearm running off to the right, and a
 * round paw at its left end with two toe creases and a pad peeking out underneath. The
 * arm is as wide as the stage, so however far it reaches, its shoulder stays out of frame.
 */
function arm(w: number) {
	const fur = (s: object) =>
		h('i', {
			position: 'absolute',
			background: color.fur,
			border: `1.5px solid ${INK}`,
			boxSizing: 'border-box',
			...s
		});
	const crease = (top: number) =>
		h('i', {
			position: 'absolute',
			left: '-1px',
			top: top + 'px',
			width: '7px',
			height: '1.5px',
			background: INK,
			borderRadius: '1px'
		});
	return h('i', { position: 'absolute', width: w + 'px', height: ARM + 'px' }, [
		fur({
			left: '24px',
			right: 0,
			top: '7px',
			height: '22px',
			borderLeft: 'none',
			background: `repeating-linear-gradient(100deg,${color.fur} 0 12px,${color.furStripe} 12px 18px)`
		}),
		h('i', {
			position: 'absolute',
			left: '9px',
			bottom: '-2px',
			width: '14px',
			height: '7px',
			borderRadius: '50%',
			background: color.furBean,
			border: `1.5px solid ${INK}`,
			boxSizing: 'border-box'
		}),
		fur({ left: 0, top: 0, width: '38px', height: ARM + 'px', borderRadius: '50% 42% 42% 50%' }),
		crease(11),
		crease(20)
	]);
}

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
		const paw = place(arm(W), W, r.cy - ARM / 2 - 4);
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
