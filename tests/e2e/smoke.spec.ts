import { expect, test } from "@playwright/test";

test("home page renders", async ({ page }) => {
	await page.goto("/");

	await expect(page).toHaveTitle(/Chemistry RDM Knowledge Base|NFDI4Chem/i);
	await expect(page.locator("main")).toBeVisible();
});
