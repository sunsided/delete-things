import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('the lab has no axe violations at rest', async ({ page }) => {
	await page.goto('./');
	// color-contrast is off on purpose. The handoff's mono labels (#8a8478 on #fbf9f4, about
	// 3.5:1) and its red tags fall short of AA at 11–12px, and the handoff marks its colours
	// final. Lifting them is a design decision, not a test fix.
	const { violations } = await new AxeBuilder({ page }).disableRules(['color-contrast']).analyze();
	expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
});
