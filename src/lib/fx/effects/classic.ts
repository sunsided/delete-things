/** 01 · Into the bin: the document drops into the trash icon, which slides away. */
import { place, rel } from '../dom.ts';
import { simple, type Effect } from '../engine.ts';
import { doc } from '../parts.ts';
import { fadeFrame } from '../particles.ts';

export default {
	badge: 'Deleted',
	setup: simple(async (ctx, b) => {
		const { stage, A } = ctx;
		const r = rel(stage, b);
		const ir = rel(stage, b.icon);
		const dx = r.cx - ir.cx;
		const T = `translateX(${dx}px) scale(1.9)`;
		fadeFrame(ctx, b, 300);
		await A(b.text, [{ opacity: 1 }, { opacity: 0 }], 250);
		await A(b.icon, [{ transform: 'none' }, { transform: T }], {
			duration: 420,
			easing: 'cubic-bezier(.3,1.4,.5,1)'
		});
		await A(b.icon.lid, [{ transform: 'rotate(0)' }, { transform: 'rotate(-40deg)' }], 200);
		const d = doc();
		place(d, r.cx - 11, r.cy - 112);
		stage.append(d);
		await A(
			d,
			[
				{ transform: 'translateY(0) rotate(-10deg)', opacity: 0 },
				{ opacity: 1, offset: 0.3 },
				{ transform: 'translateY(98px) rotate(6deg) scale(.6)', opacity: 1, offset: 0.85 },
				{ transform: 'translateY(106px) scale(.4)', opacity: 0 }
			],
			{ duration: 650, easing: 'cubic-bezier(.5,0,.8,.6)' }
		);
		d.remove();
		await A(b.icon.lid, [{ transform: 'rotate(-40deg)' }, { transform: 'rotate(0)' }], {
			duration: 200,
			easing: 'cubic-bezier(.3,1.8,.5,1)'
		});
		await A(
			b.icon,
			[
				{ transform: T, opacity: 1 },
				{ transform: `translateX(${dx - 14}px) scale(1.9)`, offset: 0.25 },
				{ transform: `translateX(${dx + 130}px) scale(1.9)`, opacity: 0 }
			],
			{ duration: 560, easing: 'cubic-bezier(.6,0,.8,.4)' }
		);
	})
} satisfies Effect;
