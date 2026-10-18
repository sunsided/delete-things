/**
 * 58 · On hold: your deletion is important to us. The queue counts down while hold music
 * floats up, then a specialist takes the call.
 */
import { font } from '../../design/tokens.ts';
import { at, h, place, rel, rnd } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { hide } from '../kit.ts';
import { INK, MUTE } from '../particles.ts';

export default {
	badge: 'Connected & deleted',
	setup: simple(async (ctx, b) => {
		const { stage, A, wait } = ctx;
		const r = rel(stage, b);
		await hide(ctx, b);
		const l1 = h(
			'div',
			{ font: `600 15px/1.3 ${font.sans}`, color: INK, textAlign: 'center' },
			'Your deletion is important to us.'
		);
		const l2 = h(
			'div',
			{ font: `500 12px/1 ${font.mono}`, color: MUTE },
			'You are number 3 in the queue'
		);
		const box = at(
			stage,
			h(
				'div',
				{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '10px',
					width: '250px'
				},
				[l1, l2]
			),
			r.cx,
			r.cy - 6
		);
		// The music: a note every 280ms until someone picks up. ctx.wait stops it on a reset.
		let stop = false;
		(async () => {
			for (let i = 0; !stop; i++) {
				const n = place(
					h(
						'i',
						{
							font: `500 ${rnd(14, 20)}px/1 ${font.sans}`,
							fontStyle: 'normal',
							color: MUTE,
							opacity: 0
						},
						i % 2 ? '♪' : '♫'
					),
					rnd(16, stage.clientWidth - 30),
					stage.clientHeight - 30
				);
				stage.append(n);
				A(
					n,
					[
						{ opacity: 0, transform: 'translate(0,0)' },
						{ opacity: 0.8, offset: 0.2 },
						{
							opacity: 0,
							transform: `translate(${rnd(-20, 20)}px,-70px) rotate(${rnd(-20, 20)}deg)`
						}
					],
					1600
				).then(() => n.remove());
				await wait(280);
			}
		})();
		for (const n of [2, 1]) {
			await wait(1100);
			l2.textContent = `You are number ${n} in the queue`;
			A(l2, [{ transform: 'scale(1.12)' }, { transform: 'scale(1)' }], 220);
		}
		await wait(900);
		l1.textContent = 'Connecting you to a deletion specialist…';
		l2.textContent = 'please hold';
		await wait(1100);
		stop = true;
		await A(box, [{ opacity: 1 }, { opacity: 0 }], 200);
	})
} satisfies Effect;
