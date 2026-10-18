import { expect, test } from '@playwright/test';

// Both sides of each breakpoint (sm < 760px, md < 1024px), plus the extremes.
for (const width of [320, 375, 759, 760, 1023, 1024, 1440]) {
	test(`nothing scrolls sideways at ${width}px`, async ({ page }) => {
		await page.setViewportSize({ width, height: 900 });
		await page.goto('./');
		const overflow = await page.evaluate(
			() => document.documentElement.scrollWidth - document.documentElement.clientWidth
		);
		expect(overflow).toBe(0);
	});
}

const columns = (page: import('@playwright/test').Page) =>
	page
		.locator('#volume-1')
		.evaluate((g) => getComputedStyle(g).gridTemplateColumns.split(' ').length);

test('phones get one column, a 16px gutter and a full-width header button', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto('./');
	expect(await columns(page)).toBe(1);
	const main = await page.locator('main').evaluate((m) => getComputedStyle(m).paddingLeft);
	expect(main).toBe('16px');
	const button = await page.getByRole('button', { name: 'Delete everything' }).boundingBox();
	expect(button?.width).toBe(375 - 32);
});

test('tablets get two columns, desktops four', async ({ page }) => {
	await page.setViewportSize({ width: 768, height: 1024 });
	await page.goto('./');
	expect(await columns(page)).toBe(2);
	await page.setViewportSize({ width: 1440, height: 900 });
	expect(await columns(page)).toBe(4);
});

test('a finger on a button still scrolls the page, except where pressing is the gesture', async ({
	page
}) => {
	await page.goto('./');
	const touch = (key: string) =>
		page
			.locator(`[data-fx="${key}"] button`)
			.first()
			.evaluate((b) => getComputedStyle(b).touchAction);
	expect(await touch('classic')).toBe('manipulation');
	expect(await touch('hold')).toBe('none');
});
