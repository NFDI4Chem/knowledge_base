import { expect, test, type BrowserContext } from "@playwright/test";

const ASSET_FILE_EXTENSIONS =
	/\.(?:png|jpe?g|gif|webp|svg|ico|pdf|zip|gz|mp4|webm|css|js|json|xml|txt)$/i;
const EXCLUDED_PATH_PREFIXES = ["/search"];
const BLOCKED_RESOURCE_TYPES = new Set(["image", "font", "media"]);
const CONCURRENCY = 6;
const MAX_PAGES = 300;

function normalizePath(url: URL): string {
	const pathname = url.pathname.replace(/\/$/, "") || "/";
	return pathname;
}

async function checkPage(
	context: BrowserContext,
	currentPath: string,
	origin: string,
): Promise<{ failures: string[]; links: string[] }> {
	const failures: string[] = [];
	const links: string[] = [];
	const page = await context.newPage();

	try {
		const response = await page.goto(currentPath, {
			waitUntil: "commit",
		});
		await page.waitForLoadState("domcontentloaded");

		if (!response || !response.ok()) {
			failures.push(
				`${currentPath}: HTTP ${response?.status() ?? "NO_RESPONSE"}`,
			);
			return { failures, links };
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

			links.push(normalizePath(resolvedUrl));
		}
	} catch (error) {
		failures.push(`${currentPath}: ${(error as Error).message}`);
	} finally {
		await page.close();
	}

	return { failures, links };
}

async function runPool<T>(
	items: T[],
	limit: number,
	worker: (item: T) => Promise<void>,
): Promise<void> {
	let next = 0;

	await Promise.all(
		Array.from({ length: Math.min(limit, items.length) }, async () => {
			while (next < items.length) {
				await worker(items[next++]);
			}
		}),
	);
}

test("all internal pages render without errors", async ({
	context,
	baseURL,
}) => {
	test.setTimeout(10 * 60_000);

	if (!baseURL) {
		throw new Error("Playwright baseURL is not configured.");
	}

	const origin = new URL(baseURL).origin;
	const visited = new Set<string>(["/"]);
	const failures: string[] = [];

	// The crawl only needs HTML, titles and links, so skip heavy and third-party requests.
	await context.route("**/*", (route) => {
		const request = route.request();

		if (
			BLOCKED_RESOURCE_TYPES.has(request.resourceType()) ||
			new URL(request.url()).origin !== origin
		) {
			return route.abort();
		}

		return route.continue();
	});

	// Breadth-first crawl; every level is checked concurrently.
	let level = ["/"];

	while (level.length > 0) {
		const nextLevel: string[] = [];

		await runPool(level, CONCURRENCY, async (currentPath) => {
			const result = await checkPage(context, currentPath, origin);
			failures.push(...result.failures);

			for (const link of result.links) {
				if (!visited.has(link) && visited.size < MAX_PAGES) {
					visited.add(link);
					nextLevel.push(link);
				}
			}
		});

		level = nextLevel;
	}

	failures.sort();

	expect(
		visited.size,
		"No pages were discovered during crawl.",
	).toBeGreaterThan(0);
	expect(
		failures,
		`The following pages failed:\n${failures.map((f) => `- ${f}`).join("\n")}`,
	).toEqual([]);
});
