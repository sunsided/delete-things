import { describe, expect, it } from 'vitest';
import { effects, fxKeys } from '$lib/fx/registry';
import { cards, volumes } from './effects';

describe('the catalog', () => {
	it('has eighty-one cards numbered 01 to 81', () => {
		expect(cards.map((c) => c.n)).toEqual(
			Array.from({ length: 81 }, (_, i) => String(i + 1).padStart(2, '0'))
		);
	});

	it('names every registered effect exactly once, and nothing else', () => {
		expect([...cards.map((c) => c.key)].sort()).toEqual([...fxKeys].sort());
	});

	it('splits into twenty, twenty-one, twenty and twenty', () => {
		expect(volumes.map((v) => v.cards.length)).toEqual([20, 21, 20, 20]);
	});

	it('has five actually good ones, as the lede promises', () => {
		expect(cards.filter((c) => c.tag === 'Actually good UX')).toHaveLength(5);
	});

	it('puts every red tag on a good one or the bonus', () => {
		for (const c of cards.filter((c) => c.accent))
			expect(['Actually good UX', 'Bonus · nuclear']).toContain(c.tag);
	});
});

describe('the registry', () => {
	it('gives every effect a setup and a badge that is a word or deliberately none', () => {
		for (const [key, fx] of Object.entries(effects)) {
			expect(typeof fx.setup, key).toBe('function');
			expect(fx.badge === null || fx.badge.length > 0, key).toBe(true);
		}
	});

	it('leaves the badge out only where the effect is the message', () => {
		const silent = Object.entries(effects)
			.filter(([, fx]) => fx.badge === null)
			.map(([k]) => k)
			.sort();
		expect(silent).toEqual(['backspace', 'flip', 'fullstop', 'party', 'redact', 'shrink', 'stamp']);
	});
});
