/**
 * 44 · 99% forever: a progress bar races to 99%, creeps to 99.9%, recalculates down to 12%,
 * then declares itself done.
 */
import { font } from '../../design/tokens.ts';
import { at, h, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { hide, outCubic, tween } from '../kit.ts';
import { INK, MUTE } from '../particles.ts';

export default {
	badge: 'Finally',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		await hide(ctx, b);
		const fill = h('i', {
			position: 'absolute',
			left: 0,
			top: 0,
			bottom: 0,
			width: '0%',
			background: INK
		});
		const track = h(
			'div',
			{
				position: 'relative',
				width: '200px',
				height: '10px',
				border: `1.5px solid ${INK}`,
				borderRadius: '6px',
				overflow: 'hidden',
				boxSizing: 'border-box'
			},
			fill
		);
		const lab = h('div', { font: `500 13px/1 ${font.mono}`, color: INK }, 'Deleting… 0%');
		const sub = h('div', { font: `400 12px/1 ${font.mono}`, color: MUTE, height: '12px' }, '');
		const box = at(
			stage,
			h(
				'div',
				{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '10px',
					width: '220px'
				},
				[lab, track, sub]
			),
			r.cx,
			r.cy
		);
		const set = (p: number, d = 0) => {
			fill.style.width = p + '%';
			lab.textContent = `Deleting… ${p.toFixed(d)}%`;
		};
		await tween(ctx, 900, (t) => set(99 * t), outCubic);
		sub.textContent = 'almost there…';
		await wait(600);
		await tween(ctx, 1300, (t) => set(99 + 0.9 * t, 1));
		sub.textContent = 'recalculating';
		await wait(500);
		await tween(ctx, 260, (t) => set(99.9 - 87.9 * t), outCubic);
		sub.textContent = 'hmm.';
		await wait(700);
		set(100);
		lab.textContent = 'Done. Don’t ask.';
		sub.textContent = '';
		await wait(700);
		await A(box, [{ opacity: 1 }, { opacity: 0 }], 200);
	})
} satisfies Effect;
