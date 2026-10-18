/**
 * 42 · Catch me if you can: the button jumps away from the cursor three times, heckling,
 * then gives up. On touch (and from the keyboard) a click makes it jump instead.
 */
import { rnd } from '../dom.ts';
import type { Effect } from '../engine.ts';
import { say, unsay } from '../kit.ts';
import { btn, setBusy } from '../parts.ts';
import { RED_TEXT } from '../particles.ts';

const MSGS = ['nope', 'too slow', 'lol no'];

export default {
	badge: 'Caught it',
	setup: (ctx) => {
		const { stage, A, wait } = ctx;
		const b = btn();
		stage.append(b);
		let n = 0;
		let tx = 0;
		let ty = 0;
		let moving = false;

		const dodge = async () => {
			if (moving || ctx.busy || n >= 3) return;
			moving = true;
			const W = stage.clientWidth;
			const H = stage.clientHeight;
			const mx = W / 2 - b.offsetWidth / 2 - 12;
			const my = H / 2 - b.offsetHeight / 2 - 12;
			// At least 90px from where it was, unless the stage is too small to manage that.
			let nx: number;
			let ny: number;
			let g = 0;
			do {
				nx = rnd(-mx, mx);
				ny = rnd(-my, my);
			} while (Math.hypot(nx - tx, ny - ty) < 90 && g++ < 30);
			const m = say(ctx, MSGS[n], W / 2 + tx, H / 2 + ty - 38, { color: RED_TEXT });
			wait(650).then(() => unsay(ctx, m));
			await A(
				b,
				[{ transform: `translate(${tx}px,${ty}px)` }, { transform: `translate(${nx}px,${ny}px)` }],
				{
					duration: 260,
					easing: 'cubic-bezier(.2,1.3,.4,1)'
				}
			);
			tx = nx;
			ty = ny;
			n++;
			moving = false;
			if (n >= 3) b.text.textContent = 'fine.';
		};

		const give = async () => {
			if (ctx.busy) return;
			ctx.busy = true;
			setBusy(b, true);
			await A(
				b,
				[
					{ transform: `translate(${tx}px,${ty}px) rotate(0)`, opacity: 1 },
					{ transform: `translate(${tx}px,${ty + 6}px) rotate(-6deg)`, offset: 0.3, opacity: 1 },
					{ transform: `translate(${tx}px,${ty + 24}px) rotate(-12deg) scale(.6)`, opacity: 0 }
				],
				600
			);
			ctx.finish();
		};

		b.addEventListener('pointerenter', (e) => {
			if (e.pointerType === 'mouse') dodge();
		});
		b.addEventListener('click', () => (n < 3 ? dodge() : give()));
		ctx.play = async () => {
			while (n < 3 && !ctx.busy) {
				await dodge();
				await wait(300);
			}
			await wait(300);
			give();
		};
	}
} satisfies Effect;
