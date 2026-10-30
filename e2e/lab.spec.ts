import { expect, test, type Page } from '@playwright/test';

const stage = (page: Page, key: string) => page.locator(`[data-fx="${key}"]`);

test.beforeEach(async ({ page }) => {
	page.on('pageerror', (e) => {
		throw e;
	});
	await page.goto('./');
});

test('prerenders the copy and every card', async ({ page }) => {
	await expect(page).toHaveTitle('Eighty ways to delete a file.');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Eighty ways to delete a file.');
	await expect(page.locator('[data-fx]')).toHaveCount(81);
	await expect(page.getByRole('heading', { level: 3 })).toHaveCount(81);
});

test('the GitHub mark links back to the repository', async ({ page }) => {
	const link = page.getByRole('link', { name: 'Source on GitHub' });
	await expect(link).toHaveAttribute('href', 'https://github.com/sunsided/delete-things');
	await expect(link).toBeVisible();
});

test('the study number shuffles, then settles on three digits', async ({ page }) => {
	const shown = page.locator('header [aria-hidden="true"]').first();
	const said = page.locator('header .visually-hidden');
	// Assistive technology hears nothing until the shuffle is over, then the result.
	await expect(said).toHaveText(/^\d{3}$/, { timeout: 3000 });
	const n = (await said.textContent()) ?? '';
	expect(n).not.toBe('000');
	await expect(shown).toHaveText(n);
});

test('a click deletes, confirms and comes back', async ({ page }) => {
	const s = stage(page, 'classic');
	await s.getByRole('button', { name: 'Delete', exact: true }).click();
	await expect(s.getByText('Deleted', { exact: true })).toBeVisible({ timeout: 5000 });
	await expect(page.getByText('Into the bin: Deleted')).toBeAttached();
	await expect(s.getByRole('button', { name: 'Delete', exact: true })).toBeVisible({
		timeout: 5000
	});
});

test('the reset returns focus without scrolling the page back', async ({ page }) => {
	const s = stage(page, 'classic');
	await s.getByRole('button', { name: 'Delete', exact: true }).click();
	await page.mouse.wheel(0, 2500);
	await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(1000);
	const y = await page.evaluate(() => scrollY);
	// The button is rebuilt and refocused; the page stays where the reader scrolled to.
	const done = s.getByText('Deleted', { exact: true });
	await expect(done).toBeAttached({ timeout: 5000 });
	await expect(done).not.toBeAttached({ timeout: 5000 });
	await expect(s.getByRole('button', { name: 'Delete', exact: true })).toBeFocused();
	expect(await page.evaluate(() => scrollY)).toBe(y);
});

test('hold to confirm backs off when let go early, and deletes when held', async ({ page }) => {
	const b = stage(page, 'hold').getByRole('button');
	await b.focus();
	await page.keyboard.down('Space');
	await expect(b).toHaveText('Keep holding…');
	await page.keyboard.up('Space');
	await expect(b).toHaveText('Hold to delete');

	await page.keyboard.down('Space');
	await expect(stage(page, 'hold').getByText('Deleted', { exact: true })).toBeVisible({
		timeout: 4000
	});
	await page.keyboard.up('Space');
});

test('the undo window restores the file', async ({ page }) => {
	const s = stage(page, 'undo');
	await s.getByRole('button', { name: 'Delete', exact: true }).click();
	await s.getByRole('button', { name: 'Undo' }).click();
	await expect(s.getByText('restored — nothing was lost')).toBeVisible();
	await expect(s.getByRole('button', { name: 'Delete', exact: true })).toBeVisible();
});

test('type to confirm stays disabled until the word is typed', async ({ page }) => {
	const s = stage(page, 'typeconfirm');
	const b = s.getByRole('button', { name: 'Delete', exact: true });
	await expect(b).toBeDisabled();
	await s.getByRole('textbox').fill('delet');
	await expect(b).toBeDisabled();
	await s.getByRole('textbox').fill(' DELETE ');
	await expect(b).toBeEnabled();
	await page.keyboard.press('Enter');
	await expect(s.getByText('Deleted', { exact: true })).toBeVisible({ timeout: 4000 });
});

test('are you sure can be answered from the keyboard', async ({ page }) => {
	const s = stage(page, 'twostep');
	await s.getByRole('button', { name: 'Delete', exact: true }).focus();
	await page.keyboard.press('Enter');
	// The safe answer gets the focus the vanished button had.
	await expect(s.getByRole('button', { name: 'Cancel' })).toBeFocused();
	await page.keyboard.press('Enter');
	await expect(s.getByRole('button', { name: 'Delete', exact: true })).toBeFocused();
	await expect(s.getByText('Deleted', { exact: true })).toHaveCount(0);

	await page.keyboard.press('Enter');
	await expect(s.getByRole('button', { name: 'Cancel' })).toBeFocused();
	await page.keyboard.press('Tab');
	await expect(s.getByRole('button', { name: 'Yes, delete' })).toBeFocused();
	await page.keyboard.press('Enter');
	await expect(s.getByText('Deleted', { exact: true })).toBeVisible({ timeout: 4000 });
});

test('delete everything plays every card and the page comes back', async ({ page }) => {
	await page.getByRole('button', { name: 'Delete everything' }).click();
	await expect(page.getByText('This page has been deleted.')).toBeVisible({ timeout: 8000 });
	await expect(page.getByText('This page has been deleted.')).toHaveCount(0, { timeout: 8000 });
	await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
	// Back to idle: every stage holds a control again.
	await expect(page.locator('[data-fx] :is(button, [role=button], input)').first()).toBeVisible();
	await expect
		.poll(
			() =>
				page.evaluate(
					() =>
						[...document.querySelectorAll('[data-fx]')].filter(
							(s) => !s.querySelector('button, [role=button], input')
						).length
				),
			{ timeout: 10_000 }
		)
		.toBe(0);
});

test('the cookie banner takes the focus and its Accept deletes', async ({ page }) => {
	const s = stage(page, 'cookies');
	await s.getByRole('button', { name: 'Delete', exact: true }).focus();
	await page.keyboard.press('Enter');
	await expect(s.getByRole('button', { name: 'Accept' })).toBeFocused();
	await page.keyboard.press('Enter');
	await expect(s.getByText('Cookies accepted', { exact: true })).toBeVisible({ timeout: 4000 });
});

test('the hydra grows two, four, then eight heads before it falls', async ({ page }) => {
	const s = stage(page, 'hydra');
	const heads = s.getByRole('button', { name: 'Delete', exact: true });
	// A fresh generation ignores clicks while it springs out; wait until it is armed.
	const armed = () => expect(heads.last()).not.toHaveAttribute('data-busy');
	for (const n of [2, 4, 8]) {
		await armed();
		await heads.first().click();
		await expect(s.locator('button:visible')).toHaveCount(n);
	}
	await armed();
	await heads.last().click();
	await expect(s.getByText('Hydra slain', { exact: true })).toBeVisible({ timeout: 4000 });
});

test('wrong one puts the card caption back', async ({ page }) => {
	const s = stage(page, 'oops');
	const caption = page.locator('article', { has: s }).getByText('Wrong one', { exact: true });
	await s.getByRole('button').click();
	await expect(caption).not.toBeInViewport({ ratio: 1 });
	await expect(s.getByText('Right one this time', { exact: true })).toBeVisible({
		timeout: 6000
	});
	await expect(caption).toBeVisible();
	expect(await caption.evaluate((e) => e.parentElement!.getAnimations().length)).toBe(0);
});
