import { defineConfig, devices } from "@playwright/test";

const serveCommand = "npm run serve -- --host 127.0.0.1 --port 3000";

export default defineConfig({
	testDir: "./tests/e2e",
	timeout: 60_000,
	retries: process.env.CI ? 1 : 0,
	workers: process.env.CI ? 2 : 4,
	fullyParallel: true,
	reporter: [["html", { open: "never" }]],
	snapshotPathTemplate:
		"{testDir}/{testFilePath}-snapshots/{arg}-{projectName}{ext}",
	expect: {
		toHaveScreenshot: {
			animations: "disabled",
			caret: "hide",
			scale: "css",
		},
	},
	use: {
		baseURL: "http://127.0.0.1:3000",
		trace: "on-first-retry",
		viewport: { width: 1440, height: 900 },
		colorScheme: "light",
		locale: "en-US",
		timezoneId: "UTC",
		reducedMotion: "reduce",
	},
	webServer: {
		// CI sets PW_SKIP_BUILD when a prebuilt site is already in ./build.
		command: process.env.PW_SKIP_BUILD
			? serveCommand
			: `npm run build && ${serveCommand}`,
		url: "http://127.0.0.1:3000",
		reuseExistingServer: !process.env.CI,
		timeout: 300_000,
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
});
