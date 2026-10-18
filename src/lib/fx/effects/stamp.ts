/** 10 · Rubber stamp: a red DELETED stamp slams onto the button, which is struck through. */
import { font, radius } from '../../design/tokens.ts';
import { at, h, jit, place, rel, rnd } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { RED } from '../particles.ts';

export default {
	badge: null,
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const st = at(
			stage,
			h(
				'div',
				{
					padding: '7px 12px 6px',
					border: `3px solid ${RED}`,
					borderRadius: radius.stamp,
					color: RED,
					font: `700 22px/1 ${font.mono}`,
					letterSpacing: '.14em',
					opacity: 0,
					whiteSpace: 'nowrap',
					mixBlendMode: 'multiply',
					background: 'rgba(212,70,47,.06)'
				},
				'DELETED'
			),
			r.cx,
			r.cy
		);
		await A(
			st,
			[
				{ opacity: 0, transform: 'rotate(-14deg) scale(2.8)' },
				{ opacity: 1, transform: 'rotate(-14deg) scale(.94)', offset: 0.8 },
				{ opacity: 1, transform: 'rotate(-12deg) scale(1)' }
			],
			{ duration: 300, easing: 'cubic-bezier(.6,0,.9,.6)' }
		);
		A(stage, jit(6, 3), { duration: 260, easing: 'linear' });
		b.text.style.textDecoration = 'line-through';
		A(
			b,
			[
				{ opacity: 1, transform: 'scale(1)' },
				{ opacity: 0.35, transform: 'scale(.96)' }
			],
			400
		);
		for (let i = 0; i < 7; i++) {
			const a = rnd(0, Math.PI * 2);
			const d = rnd(55, 90);
			const s = rnd(2, 5);
			const p = place(
				h('i', {
					width: s + 'px',
					height: s + 'px',
					borderRadius: '50%',
					background: RED,
					opacity: 0
				}),
				r.cx + Math.cos(a) * d,
				r.cy + Math.sin(a) * d * 0.5
			);
			stage.append(p);
			A(
				p,
				[
					{ opacity: 0, transform: 'scale(0)' },
					{ opacity: 0.8, transform: 'scale(1)' }
				],
				{
					duration: 200,
					delay: i * 20
				}
			);
		}
		await wait(900);
		return null;
	})
} satisfies Effect;
