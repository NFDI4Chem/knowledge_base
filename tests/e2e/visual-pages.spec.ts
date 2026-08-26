import { expect, test } from "@playwright/test";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const PAGE_EXTENSIONS = new Set([".js", ".jsx", ".ts", ".tsx", ".md", ".mdx"]);

function normalizePathname(pathname: string): string {
	if (!pathname || pathname === "/") {
		return "/";
	}

	return pathname.replace(/\/$/, "");
}

function routeToSnapshotName(route: string): string {
	const normalized = normalizePathname(route);
	if (normalized === "/") {
		return "root.png";
	}

	return `${normalized.replace(/^\//, "").replace(/\//g, "__")}.png`;
}

function joinPathPrefix(prefix: string, route: string): string {
	const normalizedPrefix = normalizePathname(prefix);
	const normalizedRoute = normalizePathname(route);

	if (normalizedRoute === "/") {
		return normalizedPrefix || "/";
	}

	if (!normalizedPrefix || normalizedPrefix === "/") {
		return normalizedRoute;
	}

	return normalizePathname(`${normalizedPrefix}${normalizedRoute}`);
}

async function collectPageFileRoutes(rootDir: string, relativeDir = ""): Promise<string[]> {
	const currentDir = path.join(rootDir, relativeDir);
	const entries = await readdir(currentDir, { withFileTypes: true });
	const routes: string[] = [];

	for (const entry of entries) {
		if (entry.name.startsWith("_")) {
			continue;
		}

		const entryRelativePath = path.join(relativeDir, entry.name);

		if (entry.isDirectory()) {
			routes.push(...(await collectPageFileRoutes(rootDir, entryRelativePath)));
			continue;
		}

		const extension = path.extname(entry.name);
		if (!PAGE_EXTENSIONS.has(extension)) {
			continue;
		}

		if (entry.name.endsWith(".spec.ts") || entry.name.endsWith(".test.ts")) {
			continue;
		}

		const withoutExtension = entryRelativePath
			.replace(/\\/g, "/")
			.replace(new RegExp(`${extension}$`), "");
		let route = `/${withoutExtension}`;

		if (route.endsWith("/index")) {
			route = route.slice(0, -"/index".length) || "/";
		}

		routes.push(normalizePathname(route));
	}

	return routes;
}

function extractSitemapPathnames(sitemapXml: string): string[] {
	const locMatches = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)];

	return [...new Set(locMatches.map((match) => normalizePathname(new URL(match[1]).pathname)))];
}

function waitForDocusaurusHydration(): boolean {
	return document.documentElement.dataset.hasHydrated === "true";
}

test("visual regression for docs and src/pages routes", async ({ page, baseURL }) => {
	test.setTimeout(20 * 60_000);

	if (!baseURL) {
		throw new Error("Playwright baseURL is not configured.");
	}

	const screenshotStyles = await readFile(path.join(process.cwd(), "tests", "e2e", "screenshot.css"), "utf8");
	const sitemapPath = path.join(process.cwd(), "build", "sitemap.xml");
	const sitemapXml = await readFile(sitemapPath, "utf8");
	const sitemapPathnames = extractSitemapPathnames(sitemapXml);
	const sitemapPathnameSet = new Set(sitemapPathnames);

	const docsPathSample = sitemapPathnames.find((pathname) => pathname.includes("/docs/")) ?? "/docs";
	const routePrefix = normalizePathname(docsPathSample.split("/docs/")[0] || "");
	const docsBase = joinPathPrefix(routePrefix, "/docs");
	const docsRoutes = sitemapPathnames.filter(
		(pathname) => pathname === docsBase || pathname.startsWith(`${docsBase}/`)
	);
	const srcPagesCandidates = await collectPageFileRoutes(path.join(process.cwd(), "src", "pages"));
	const srcPagesRoutes = srcPagesCandidates
		.map((route) => joinPathPrefix(routePrefix, route))
		.filter((route) => sitemapPathnameSet.has(route));
	const allRoutes = [...new Set([...docsRoutes, ...srcPagesRoutes])].sort((a, b) => a.localeCompare(b));

	expect(allRoutes.length, "No routes discovered for docs/src pages visual test.").toBeGreaterThan(0);

	for (const route of allRoutes) {
		await test.step(`visual ${route}`, async () => {
			const response = await page.goto(route, { waitUntil: "domcontentloaded" });
			expect(response, `No response for route ${route}`).toBeTruthy();
			expect(response?.ok(), `Route failed: ${route} (HTTP ${response?.status()})`).toBeTruthy();

			await page.waitForFunction(waitForDocusaurusHydration);
			await page.addStyleTag({ content: screenshotStyles });

			const notFoundHeading = page.getByRole("heading", {
				name: /404|page not found/i
			});
			expect(
				await notFoundHeading.first().isVisible().catch(() => false),
				`Route rendered 404 content: ${route}`
			).toBeFalsy();

			await expect(page).toHaveScreenshot(routeToSnapshotName(route), {
				fullPage: true,
				timeout: 20_000
			});
		});
	}
});
