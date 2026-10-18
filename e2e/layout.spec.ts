import { expect, test } from '@playwright/test';

for (const width of [320, 375, 768, 1024, 1440]) {
	test(`nothing scrolls sideways at ${width}px`, async ({ page }) => {
		await page.setViewportSize({ width, height: 900 });
		await page.goto('./');
		const overflow = await page.evaluate(
			() => document.documentElement.scrollWidth - document.documentElement.clientWidth
		);
		expect(overflow).toBe(0);
	});
}
