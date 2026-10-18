import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end tests run against the real build/, served by scripts/serve.ts on :4193, under
 * BASE_PATH when the build has one (the Pages build does). Tests navigate relative to it.
 */
const port = Number(process.env.PORT ?? 4193);
const base = `http://localhost:${port}${process.env.BASE_PATH ?? ''}/`;

export default defineConfig({
	testDir: 'e2e',
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
	use: { baseURL: base, trace: 'on-first-retry' },
	webServer: {
		command: 'yarn preview',
		url: base,
		reuseExistingServer: !process.env.CI,
		timeout: 60_000
	},
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] }, testIgnore: /reduced\.spec\.ts/ },
		{
			name: 'reduced-motion',
			use: { ...devices['Desktop Chrome'], reducedMotion: 'reduce' },
			testMatch: /reduced\.spec\.ts/
		}
	]
});
