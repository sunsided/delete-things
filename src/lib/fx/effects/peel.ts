/** 27 · Peel off: the button lifts from its top-left corner like a sticker and flies off. */
import { simple, type Effect } from '../engine.ts';

export default {
	badge: 'Peeled off',
	setup: simple(async (ctx, b) => {
		const { A, wait } = ctx;
		b.style.transformOrigin = '0% 0%';
		await A(
			b,
			[
				{ transform: 'perspective(600px) rotate3d(1,-1,0,0deg)', boxShadow: '0 0 0 rgba(0,0,0,0)' },
				{
					transform: 'perspective(600px) rotate3d(1,-1,0,-14deg)',
					boxShadow: '6px 8px 10px rgba(29,27,24,.18)',
					offset: 0.6
				},
				{
					transform: 'perspective(600px) rotate3d(1,-1,0,-10deg)',
					boxShadow: '5px 6px 8px rgba(29,27,24,.16)'
				}
			],
			{ duration: 500, easing: 'cubic-bezier(.3,0,.5,1)' }
		);
		await wait(150);
		await A(
			b,
			[
				{
					transform: 'perspective(600px) rotate3d(1,-1,0,-10deg)',
					boxShadow: '5px 6px 8px rgba(29,27,24,.16)',
					opacity: 1
				},
				{
					transform: 'perspective(600px) rotate3d(1,-1,0,-60deg) translate(10px,-10px)',
					boxShadow: '14px 18px 20px rgba(29,27,24,.14)',
					offset: 0.45,
					opacity: 1
				},
				{
					transform:
						'perspective(600px) rotate3d(1,-1,0,-70deg) translate(180px,-120px) rotate(30deg)',
					opacity: 0
				}
			],
			{ duration: 800, easing: 'cubic-bezier(.5,0,.7,1)' }
		);
	})
} satisfies Effect;
