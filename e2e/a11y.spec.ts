import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const width of [375, 1280]) {
	test(`the lab has no axe violations at rest, ${width}px`, async ({ page }) => {
		await page.setViewportSize({ width, height: 900 });
		await page.goto('./');
		const { violations } = await new AxeBuilder({ page }).analyze();
		expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual(
			[]
		);
	});
}
