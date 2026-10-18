/** 39 · Redacted: marker bars black out the label and icon, then the button squashes into a redaction bar. */
import { font } from '../../design/tokens.ts';
import { at, h, place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { INK, RED } from '../particles.ts';

export default {
	badge: null,
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		const tr = rel(stage, b.text);
		const bar = place(
			h('i', {
				width: tr.w + 8 + 'px',
				height: tr.h + 6 + 'px',
				background: INK,
				transformOrigin: '0 50%',
				transform: 'scaleX(0)'
			}),
			tr.x - 4,
			tr.y - 3
		);
		stage.append(bar);
		await A(bar, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
			duration: 320,
			easing: 'cubic-bezier(.5,0,.2,1)'
		});
		const bar2 = place(
			h('i', { width: '20px', height: '20px', background: INK, transform: 'scale(0)' }),
			rel(stage, b.icon).cx - 10,
			r.cy - 10
		);
		stage.append(bar2);
		await A(bar2, [{ transform: 'scale(0)' }, { transform: 'scale(1)' }], {
			duration: 180,
			easing: 'steps(3)'
		});
		await wait(200);
		const block = place(
			h('i', {
				width: r.w + 'px',
				height: r.h + 'px',
				background: INK,
				borderRadius: '10px',
				opacity: 0
			}),
			r.x,
			r.y
		);
		stage.append(block);
		await A(block, [{ opacity: 0 }, { opacity: 1 }], { duration: 150, easing: 'steps(2)' });
		bar.remove();
		bar2.remove();
		b.style.visibility = 'hidden';
		await A(
			block,
			[
				{ transform: 'scaleY(1)', borderRadius: '10px' },
				{ transform: 'scaleY(.34)', borderRadius: '2px' }
			],
			{
				duration: 380,
				easing: 'cubic-bezier(.6,0,.2,1)'
			}
		);
		const cap = at(
			stage,
			h(
				'div',
				{ font: `500 12px/1 ${font.mono}`, color: RED, letterSpacing: '.12em', opacity: 0 },
				'[ REDACTED ]'
			),
			r.cx,
			r.cy + 26
		);
		await A(
			cap,
			[
				{ opacity: 0, transform: 'translateY(-4px)' },
				{ opacity: 1, transform: 'none' }
			],
			250
		);
		await wait(800);
		return null;
	})
} satisfies Effect;
