/** 55 · Shipped to /dev/null: packed into a box, taped shut, and sent off to nowhere. */
import { color, font } from '../../design/tokens.ts';
import { h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { INK } from '../particles.ts';

const FLAP = 'cubic-bezier(.5,0,.5,1.4)';

const flap = (left: number, origin: string, deg: number) =>
	h('i', {
		position: 'absolute',
		left: left + 'px',
		top: 0,
		width: '50px',
		height: '8px',
		background: color.cardboardFlap,
		border: `1.5px solid ${INK}`,
		boxSizing: 'border-box',
		transformOrigin: origin,
		transform: `rotate(${deg}deg)`
	});

export default {
	badge: 'Shipped to /dev/null',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const W = stage.clientWidth;
		const bx = r.cx - 50;
		const by = r.b + 2;
		const fl = flap(0, '0 100%', -125);
		const fr = flap(50, '100% 100%', 125);
		const body = h('i', {
			position: 'absolute',
			left: 0,
			top: '8px',
			width: '100px',
			height: '54px',
			background: color.cardboard,
			border: `1.5px solid ${INK}`,
			borderRadius: '0 0 3px 3px',
			boxSizing: 'border-box'
		});
		const tape = h('i', {
			position: 'absolute',
			left: '43px',
			top: '4px',
			width: '14px',
			height: '30px',
			background: color.tape,
			transformOrigin: 'top',
			transform: 'scaleY(0)'
		});
		const lab = h(
			'div',
			{
				position: 'absolute',
				left: 0,
				right: 0,
				top: '40px',
				textAlign: 'center',
				font: `600 11px/1 ${font.mono}`,
				color: INK
			},
			'/dev/null'
		);
		const g = place(
			h('div', { width: '100px', height: '62px' }, [body, fl, fr, tape, lab]),
			bx,
			by - 8
		);
		stage.append(g);
		await A(
			g,
			[
				{ transform: 'translateY(90px)', opacity: 0 },
				{ transform: 'none', opacity: 1 }
			],
			{ duration: 380, easing: 'cubic-bezier(.3,1.3,.5,1)' }
		);
		const drop = by + 30 - r.cy;
		await A(
			b,
			[
				{ transform: 'none' },
				{ transform: 'translateY(-22px) scale(.55)', offset: 0.4 },
				{ transform: `translateY(${drop}px) scale(.4)` }
			],
			{ duration: 620, easing: 'cubic-bezier(.5,0,.6,1)' }
		);
		b.style.visibility = 'hidden';
		await A(fl, [{ transform: 'rotate(-125deg)' }, { transform: 'rotate(0)' }], {
			duration: 260,
			easing: FLAP
		});
		await A(fr, [{ transform: 'rotate(125deg)' }, { transform: 'rotate(0)' }], {
			duration: 260,
			easing: FLAP
		});
		await A(tape, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], 220);
		await wait(250);
		await A(
			g,
			[
				{ transform: 'none' },
				{ transform: 'translateY(-8px) rotate(-3deg)', offset: 0.2 },
				{ transform: `translate(${W - bx + 20}px,0) rotate(4deg)` }
			],
			{ duration: 700, easing: 'cubic-bezier(.5,0,.8,.5)' }
		);
	})
} satisfies Effect;
