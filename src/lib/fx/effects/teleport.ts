/** 29 · Teleport: a teal beam rises, the button squeezes to a line and shoots upward. */
import { color } from '../../design/tokens.ts';
import { h, place, rel, rnd } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';

const TEAL = color.teal;

export default {
	badge: 'Teleported',
	setup: simple(async (ctx, b) => {
		const { stage, A } = ctx;
		const r = rel(stage, b);
		const H = stage.clientHeight;
		const beam = place(
			h('i', {
				width: '90px',
				background:
					'linear-gradient(90deg,rgba(42,159,176,0),rgba(42,159,176,.28),rgba(42,159,176,0))',
				transformOrigin: '50% 100%',
				transform: 'scaleY(0)'
			}),
			r.cx - 45,
			0,
			{ height: H + 'px' }
		);
		stage.insertBefore(beam, b);
		await A(beam, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], {
			duration: 300,
			easing: 'cubic-bezier(.2,.8,.3,1)'
		});
		for (let i = 0; i < 16; i++) {
			const s = rnd(2, 4);
			const p = place(
				h('i', {
					width: s + 'px',
					height: s + 'px',
					borderRadius: '50%',
					background: i % 2 ? TEAL : '#fff',
					boxShadow: `0 0 6px ${TEAL}`,
					opacity: 0
				}),
				r.cx + rnd(-40, 40),
				r.cy + rnd(-20, 24)
			);
			stage.append(p);
			A(
				p,
				[
					{ opacity: 0, transform: 'translateY(0)' },
					{ opacity: 1, offset: 0.3 },
					{ opacity: 0, transform: `translateY(${-rnd(30, 70)}px)` }
				],
				{
					duration: 800,
					delay: rnd(0, 700)
				}
			);
		}
		A(b, [{ filter: 'brightness(1)' }, { filter: 'brightness(1.3)' }], {
			duration: 90,
			iterations: 6,
			direction: 'alternate'
		});
		await A(
			b,
			[
				{ transform: 'scaleX(1)', opacity: 1, boxShadow: `0 0 0 ${TEAL}` },
				{ transform: 'scaleX(1) scaleY(1.04)', boxShadow: `0 0 14px ${TEAL}`, offset: 0.5 },
				{ transform: 'scaleX(.02) scaleY(1.3)', boxShadow: `0 0 18px ${TEAL}`, opacity: 1 }
			],
			{ duration: 700, easing: 'cubic-bezier(.6,0,.8,.4)' }
		);
		await A(
			b,
			[
				{ transform: 'scaleX(.02) scaleY(1.3)', opacity: 1 },
				{ transform: `translateY(-${r.b + 40}px) scaleX(.02) scaleY(5)`, opacity: 0.4 }
			],
			{ duration: 240, easing: 'cubic-bezier(.7,0,1,.6)' }
		);
		await A(
			beam,
			[
				{ transform: 'scaleY(1)', opacity: 1 },
				{ transform: 'scaleY(1)', opacity: 0 }
			],
			400
		);
	})
} satisfies Effect;
