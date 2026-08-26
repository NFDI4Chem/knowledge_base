import { expect, test } from "@playwright/test";

const ASSET_FILE_EXTENSIONS =
	/\.(?:png|jpe?g|gif|webp|svg|ico|pdf|zip|gz|mp4|webm|css|js|json|xml|txt)$/i;
const EXCLUDED_PATH_PREFIXES = ["/search"];

function normalizePath(url: URL): string {
	const pathname = url.pathname.replace(/\/$/, "") || "/";
	return pathname;
}

test("all internal pages render without errors", async ({ page, baseURL }) => {
	test.setTimeout(10 * 60_000);

	if (!baseURL) {
		throw new Error("Playwright baseURL is not configured.");
	}

	const origin = new URL(baseURL).origin;
	const queue = ["/"];
	const visited = new Set<string>();
	const failures: string[] = [];
	const maxPages = 300;

	while (queue.length > 0 && visited.size < maxPages) {
		const currentPath = queue.shift();

		if (!currentPath || visited.has(currentPath)) {
			continue;
		}

		visited.add(currentPath);

		const response = await page.goto(currentPath, {
			waitUntil: "commit",
		});
		await page.waitForLoadState("domcontentloaded");

		if (!response || !response.ok()) {
			failures.push(
				`${currentPath}: HTTP ${response?.status() ?? "NO_RESPONSE"}`,
			);
			continue;
		}

		const title = (await page.title()).trim();

		if (!title) {
			failures.push(`${currentPath}: empty document title`);
		}

		const notFoundHeading = page.getByRole("heading", {
			name: /404|page not found/i,
		});

		if (
			(await notFoundHeading.count()) > 0 &&
			(await notFoundHeading.first().isVisible())
		) {
			failures.push(`${currentPath}: rendered 404 page`);
		}

		const hrefs = await page
			.locator("a[href]")
			.evaluateAll((anchors) =>
				anchors.map((a) => a.getAttribute("href") ?? ""),
			);

		for (const href of hrefs) {
			if (
				!href ||
				href.startsWith("#") ||
				href.startsWith("mailto:") ||
				href.startsWith("tel:")
			) {
				continue;
			}

			let resolvedUrl: URL;

			try {
				resolvedUrl = new URL(href, origin);
			} catch {
				continue;
			}

			if (resolvedUrl.origin !== origin) {
				continue;
			}

			if (
				EXCLUDED_PATH_PREFIXES.some((prefix) =>
					resolvedUrl.pathname.startsWith(prefix),
				)
			) {
				continue;
			}

			if (ASSET_FILE_EXTENSIONS.test(resolvedUrl.pathname)) {
				continue;
			}

			const normalizedPath = normalizePath(resolvedUrl);

			if (!visited.has(normalizedPath)) {
				queue.push(normalizedPath);
			}
		}
	}

	expect(
		visited.size,
		"No pages were discovered during crawl.",
	).toBeGreaterThan(0);
	expect(
		failures,
		`The following pages failed:\n${failures.map((f) => `- ${f}`).join("\n")}`,
	).toEqual([]);
});
