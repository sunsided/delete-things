import { describe, expect, it } from 'vitest';
import { color, toCss } from './tokens';

describe('toCss', () => {
	const css = toCss();

	it('declares every colour as a kebab-case custom property', () => {
		for (const [k, v] of Object.entries(color)) {
			const name = k.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
			expect(css).toContain(`--${name}: ${v};`);
		}
	});

	it('keeps the handoff values', () => {
		expect(css).toContain('--page: #f4f1ea;');
		expect(css).toContain('--ink: #1d1b18;');
		expect(css).toContain('--red: #d4462f;');
		expect(css).toContain('--radius-card: 14px;');
	});
});
