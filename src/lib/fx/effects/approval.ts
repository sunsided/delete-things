/**
 * 48 · Pending approval: five rounds of sign-off tick by one row at a time, then an APPROVED
 * stamp slams down.
 */
import { font } from '../../design/tokens.ts';
import { at, h, jit, place, rel, S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { hide } from '../kit.ts';
import { GREEN, INK, LINE, RED_TEXT } from '../particles.ts';

const STEPS: [string, number][] = [
	['Deletion request submitted', 400],
	['Manager approval', 700],
	['Legal review', 800],
	['Notifying 14 stakeholders', 600],
	['Second manager approval', 1100]
];

export default {
	badge: 'Approved in triplicate',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait, sp } = ctx;
		const r = rel(stage, b);
		await hide(ctx, b);
		const list = place(
			h('div', { display: 'flex', flexDirection: 'column', gap: '9px', width: '240px' }),
			r.cx - 120,
			24
		);
		stage.append(list);
		for (const [txt, d] of STEPS) {
			const ic = h('span', {
				width: '12px',
				height: '12px',
				borderRadius: '50%',
				border: `2px solid ${LINE}`,
				borderTopColor: INK,
				boxSizing: 'border-box',
				flex: 'none'
			});
			const row = h(
				'div',
				{
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
					font: `500 12px/1 ${font.mono}`,
					color: INK
				},
				[ic, h('span', null, txt + '…')]
			);
			list.append(row);
			A(
				row,
				[
					{ opacity: 0, transform: 'translateX(-6px)' },
					{ opacity: 1, transform: 'none' }
				],
				200
			);
			const spin = ic.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], {
				duration: 600 / sp(),
				iterations: Infinity
			});
			await wait(d);
			spin.cancel();
			S(ic, { border: 'none', background: GREEN, position: 'relative' });
			ic.append(
				h('i', {
					position: 'absolute',
					left: '4px',
					top: '1.5px',
					width: '3px',
					height: '6px',
					borderRight: '1.5px solid #fff',
					borderBottom: '1.5px solid #fff',
					transform: 'rotate(45deg)'
				})
			);
		}
		const st = at(
			stage,
			h(
				'div',
				{
					padding: '5px 10px 4px',
					border: `2.5px solid ${RED_TEXT}`,
					borderRadius: '5px',
					color: RED_TEXT,
					font: `700 15px/1 ${font.mono}`,
					letterSpacing: '.14em',
					mixBlendMode: 'multiply'
				},
				'APPROVED'
			),
			r.cx,
			stage.clientHeight - 30
		);
		await A(
			st,
			[
				{ opacity: 0, transform: 'rotate(-10deg) scale(2.4)' },
				{ opacity: 1, transform: 'rotate(-8deg) scale(1)' }
			],
			{ duration: 260, easing: 'cubic-bezier(.6,0,.9,.6)' }
		);
		A(stage, jit(5, 2), { duration: 200, easing: 'linear' });
		await wait(900);
		await Promise.all([
			A(list, [{ opacity: 1 }, { opacity: 0 }], 200),
			A(st, [{ opacity: 1 }, { opacity: 0 }], 200)
		]);
	})
} satisfies Effect;
