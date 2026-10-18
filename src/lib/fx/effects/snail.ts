/**
 * 51 · Very slow delete: 0.004% done, ETA three to five business days, while a snail crawls
 * past. Then it decides that's close enough.
 */
import { color, font } from '../../design/tokens.ts';
import { h, place, rel, S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { say, tween, unsay } from '../kit.ts';
import { INK } from '../particles.ts';

const SHELL = color.sandDark;
const FOOT = '#a8a196';

export default {
	badge: 'Close enough',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait, sp } = ctx;
		const r = rel(stage, b);
		S(b, { minWidth: r.w + 60 + 'px' });
		S(b.text, { font: `500 13px/1 ${font.mono}` });
		b.text.textContent = 'Deleting… 0.000%';
		const foot = h('i', {
			position: 'absolute',
			left: '2px',
			bottom: 0,
			width: '42px',
			height: '9px',
			borderRadius: '8px 10px 4px 4px',
			background: FOOT
		});
		const sn = place(
			h('i', { width: '46px', height: '30px' }, [
				foot,
				h('i', {
					position: 'absolute',
					left: '8px',
					bottom: '5px',
					width: '24px',
					height: '24px',
					borderRadius: '50%',
					background: color.sand,
					border: `2px solid ${SHELL}`,
					boxSizing: 'border-box'
				}),
				h('i', {
					position: 'absolute',
					left: '15px',
					bottom: '12px',
					width: '10px',
					height: '10px',
					borderRadius: '50%',
					border: `2px solid ${SHELL}`,
					boxSizing: 'border-box'
				}),
				h('i', {
					position: 'absolute',
					left: '38px',
					bottom: '7px',
					width: '1.5px',
					height: '13px',
					background: FOOT,
					transform: 'rotate(20deg)',
					transformOrigin: 'bottom'
				}),
				h('i', {
					position: 'absolute',
					left: '41px',
					bottom: '18px',
					width: '4px',
					height: '4px',
					borderRadius: '50%',
					background: INK
				})
			]),
			14,
			stage.clientHeight - 42
		);
		stage.append(sn);
		const eta = say(ctx, 'ETA: 3–5 business days', r.cx, r.b + 20);
		A(sn, [{ transform: 'translateX(0)' }, { transform: 'translateX(36px)' }], {
			duration: 2600,
			easing: 'linear'
		});
		foot.animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.08)' }], {
			duration: 400 / sp(),
			iterations: 6,
			direction: 'alternate'
		});
		await tween(ctx, 2600, (p) => (b.text.textContent = `Deleting… ${(p * 0.004).toFixed(3)}%`));
		unsay(ctx, eta);
		b.text.textContent = '…eh, close enough';
		await wait(800);
		await A(
			b,
			[
				{ transform: 'scale(1)', opacity: 1 },
				{ transform: 'scale(0)', opacity: 0 }
			],
			{ duration: 220, easing: 'cubic-bezier(.6,0,.9,.4)' }
		);
		await A(sn, [{ opacity: 1 }, { opacity: 0 }], 300);
	})
} satisfies Effect;
