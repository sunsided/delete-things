import { expect, test } from '@playwright/test';

test('with reduced motion an effect fades straight to its badge', async ({ page }) => {
	await page.goto('./');
	const s = page.locator('[data-fx="shredder"]');
	await s.getByRole('button', { name: 'Delete', exact: true }).click();
	// The full timeline takes over two seconds; the reduced path is a 150ms fade.
	await expect(s.getByText('Shredded')).toBeVisible({ timeout: 800 });
});

test('an effect that is its own message still confirms in words', async ({ page }) => {
	await page.goto('./');
	const s = page.locator('[data-fx="stamp"]');
	await s.getByRole('button', { name: 'Delete', exact: true }).click();
	await expect(s.getByText('Deleted', { exact: true })).toBeVisible({ timeout: 800 });
});

test('with reduced motion the study number does not shuffle', async ({ page }) => {
	await page.goto('./');
	const said = page.locator('header .visually-hidden');
	await expect(said).toHaveText(/^\d{3}$/, { timeout: 300 });
	await expect(page.locator('header [aria-hidden="true"]').first()).toHaveText(
		(await said.textContent()) ?? ''
	);
});
