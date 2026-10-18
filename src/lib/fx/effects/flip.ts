/** 33 · The other side: the button flips over and its back reads "Deleted" with a green check. */
import { color } from '../../design/tokens.ts';
import { S } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { check } from '../parts.ts';
import { GREEN } from '../particles.ts';

export default {
	badge: null,
	setup: simple(async (ctx, b) => {
		const { A, wait } = ctx;
		await A(
			b,
			[
				{ transform: 'perspective(500px) rotateY(0)' },
				{ transform: 'perspective(500px) rotateY(90deg)' }
			],
			{
				duration: 240,
				easing: 'cubic-bezier(.6,0,1,.6)'
			}
		);
		b.icon.style.display = 'none';
		b.text.textContent = 'Deleted';
		S(b, { borderColor: GREEN, color: GREEN, background: color.confirmGround });
		b.prepend(check());
		await A(
			b,
			[
				{ transform: 'perspective(500px) rotateY(-90deg)' },
				{ transform: 'perspective(500px) rotateY(0)' }
			],
			{
				duration: 420,
				easing: 'cubic-bezier(.2,1.5,.4,1)'
			}
		);
		await wait(700);
		return null;
	})
} satisfies Effect;
