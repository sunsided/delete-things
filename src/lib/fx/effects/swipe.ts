/**
 * 21 · Slide to delete (actually good UX): drag the knob past 90% of the track to delete;
 * anything less springs back. Enter or → on the focused knob slides it for you.
 */
import { color, font } from '../../design/tokens.ts';
import { h } from '../dom.ts';
import type { Effect } from '../engine.ts';
import { setBusy, trash } from '../parts.ts';
import { CARD, INK, MUTE, RED } from '../particles.ts';

const W = 230;
const K = 40;
const MAX = W - K - 8;

export default {
	badge: 'Deleted',
	setup: (ctx) => {
		const { stage, A, sp } = ctx;
		const fill = h('i', {
			position: 'absolute',
			left: '4px',
			top: '4px',
			bottom: '4px',
			width: K + 'px',
			borderRadius: '20px',
			background: color.fill
		});
		const label = h(
			'span',
			{
				position: 'absolute',
				inset: 0,
				display: 'grid',
				placeItems: 'center',
				font: `500 14px/1 ${font.sans}`,
				color: MUTE,
				paddingLeft: '36px',
				pointerEvents: 'none'
			},
			'Slide to delete'
		);
		label.setAttribute('aria-hidden', 'true');
		const knob = h(
			'span',
			{
				position: 'absolute',
				left: '4px',
				top: '4px',
				width: K + 'px',
				height: K + 'px',
				borderRadius: '50%',
				background: INK,
				display: 'grid',
				placeItems: 'center',
				cursor: 'grab',
				touchAction: 'none'
			},
			trash(CARD)
		);
		knob.tabIndex = 0;
		knob.setAttribute('role', 'button');
		knob.setAttribute('aria-label', 'Slide to delete');
		const track = h(
			'div',
			{
				position: 'relative',
				width: W + 'px',
				height: '48px',
				borderRadius: '24px',
				border: `1.5px solid ${INK}`,
				background: CARD,
				boxSizing: 'border-box',
				overflow: 'hidden',
				userSelect: 'none'
			},
			[fill, label, knob]
		);
		stage.append(track);

		let x = 0;
		let sx = 0;
		let drag = false;
		const set = (v: number) => {
			x = Math.max(0, Math.min(MAX, v));
			knob.style.transform = `translateX(${x}px)`;
			fill.style.width = K + x + 'px';
			label.style.opacity = String(1 - (x / MAX) * 1.4);
		};
		const done = async () => {
			ctx.busy = true;
			setBusy(knob, true);
			knob.style.cursor = 'default';
			set(MAX);
			await A(
				track,
				[
					{ background: CARD, borderColor: INK },
					{ background: RED, borderColor: RED }
				],
				200
			);
			await A(
				track,
				[
					{ width: W + 'px', opacity: 1 },
					{ width: '48px', opacity: 1, offset: 0.6 },
					{ width: '48px', opacity: 0, transform: 'scale(.4)' }
				],
				{ duration: 450, easing: 'cubic-bezier(.6,0,.3,1)' }
			);
			ctx.finish();
		};
		const back = () => {
			const from = x;
			knob.animate([{ transform: `translateX(${from}px)` }, { transform: 'translateX(0)' }], {
				duration: 350 / sp(),
				easing: 'cubic-bezier(.3,1.5,.5,1)'
			});
			set(0);
		};

		knob.addEventListener('pointerdown', (e) => {
			if (ctx.busy) return;
			drag = true;
			sx = e.clientX - x;
			knob.setPointerCapture(e.pointerId);
			knob.style.cursor = 'grabbing';
		});
		knob.addEventListener('pointermove', (e) => {
			if (drag) set(e.clientX - sx);
		});
		const up = () => {
			if (!drag) return;
			drag = false;
			knob.style.cursor = 'grab';
			if (x >= MAX * 0.9) done();
			else back();
		};
		knob.addEventListener('pointerup', up);
		knob.addEventListener('pointercancel', up);

		// The keyboard (and "Delete everything") slides the knob over 600ms, ease-out cubic.
		const play = async () => {
			if (ctx.busy) return;
			ctx.busy = true;
			setBusy(knob, true);
			const t0 = performance.now();
			const D = 600 / sp();
			await new Promise<void>((ok) => {
				const f = (t: number) => {
					if (ctx.signal.aborted) return;
					const p = Math.min(1, (t - t0) / D);
					set(MAX * (1 - Math.pow(1 - p, 3)));
					if (p < 1) requestAnimationFrame(f);
					else ok();
				};
				requestAnimationFrame(f);
			});
			done();
		};
		knob.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' || e.key === 'ArrowRight') {
				e.preventDefault();
				play();
			}
		});
		ctx.play = play;
	}
} satisfies Effect;
