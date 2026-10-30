/**
 * 70 · Exit survey: before it goes, it wants to know why. Any answer will do, and the answer
 * is deleted along with the file.
 */
import { font } from '../../design/tokens.ts';
import { h, rel } from '../dom.ts';
import type { Effect } from '../engine.ts';
import { hide, say, unsay } from '../kit.ts';
import { btn, setBusy } from '../parts.ts';
import { CARD, INK, LINE, MUTE } from '../particles.ts';

const ANSWERS = ['I don’t need it', 'Found a better file', 'It knows what it did'];

export default {
	badge: 'Feedback deleted too',
	setup: (ctx) => {
		const { stage, A, wait } = ctx;
		const b = btn();
		stage.append(b);

		const play = async (auto = false) => {
			if (ctx.busy) return;
			ctx.busy = true;
			setBusy(b, true);
			const hadFocus = stage.contains(document.activeElement);
			const r = rel(stage, b);
			const opts = ANSWERS.map((a) => {
				const o = h(
					'button',
					{
						display: 'block',
						width: '100%',
						padding: '7px 10px',
						border: `1.5px solid ${LINE}`,
						borderRadius: '6px',
						background: CARD,
						color: INK,
						font: `500 12px/1.2 ${font.sans}`,
						textAlign: 'left',
						cursor: 'pointer',
						touchAction: 'manipulation'
					},
					a
				);
				o.type = 'button';
				return o;
			});
			const form = h(
				'div',
				{
					position: 'absolute',
					left: '50%',
					top: '50%',
					width: '210px',
					display: 'flex',
					flexDirection: 'column',
					gap: '6px',
					transform: 'translate(-50%,-50%)'
				},
				[
					h(
						'div',
						{ font: `600 13px/1.3 ${font.sans}`, color: INK, marginBottom: '2px' },
						'Before you go: why delete?'
					),
					...opts
				]
			);
			const picked = new Promise<HTMLButtonElement>((ok) =>
				opts.forEach((o) => o.addEventListener('click', () => ok(o), { once: true }))
			);
			await hide(ctx, b);
			stage.append(form);
			if (hadFocus) opts[0].focus();
			await A(
				form,
				[
					{ opacity: 0, transform: 'translate(-50%,-44%)' },
					{ opacity: 1, transform: 'translate(-50%,-50%)' }
				],
				260
			);
			const o = await (auto ? Promise.race([picked, wait(900).then(() => opts[2])]) : picked);
			opts.forEach((x) => (x.disabled = true));
			o.style.borderColor = INK;
			await wait(300);
			await A(form, [{ opacity: 1 }, { opacity: 0 }], 200);
			form.remove();
			const s = say(ctx, 'Thanks! That really helps.', r.cx, r.cy, { color: MUTE });
			await wait(900);
			await unsay(ctx, s);
			ctx.finish();
		};

		b.addEventListener('click', () => play());
		ctx.play = () => play(true);
	}
} satisfies Effect;
