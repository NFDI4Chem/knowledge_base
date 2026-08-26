import { expect, test } from "@playwright/test";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const PAGE_EXTENSIONS = new Set([".js", ".jsx", ".ts", ".tsx", ".md", ".mdx"]);

function normalizeRoute(route: string): string {
	if (!route || route === "/") {
		return "/";
	}

	return route.replace(/\/$/, "");
}

function routeToSnapshotName(route: string): string {
	const normalized = normalizeRoute(route);
	if (normalized === "/") {
		return "root.png";
	}

	return `${normalized.replace(/^\//, "").replace(/\//g, "__")}.png`;
}

function joinRoutePrefix(prefix: string, route: string): string {
	const normalizedPrefix = normalizeRoute(prefix);
	const normalizedRoute = normalizeRoute(route);

	if (normalizedRoute === "/") {
		return normalizedPrefix || "/";
	}

	if (!normalizedPrefix || normalizedPrefix === "/") {
		return normalizedRoute;
	}

	return normalizeRoute(`${normalizedPrefix}${normalizedRoute}`);
}

function extractRuntimeRoutes(routesFileContent: string): { routes: string[]; routePrefix: string } {
	const rawPaths = [...routesFileContent.matchAll(/path:\s*'([^']+)'/g)].map((match) => match[1]);

	const docsPathSample = rawPaths.find((route) => route.includes("/docs/")) ?? "/docs/";
	const routePrefix = normalizeRoute(docsPathSample.split("/docs/")[0] || "");
	const normalizedRoutes = rawPaths
		.map((route) => normalizeRoute(route))
		.filter((route) => route.startsWith("/"))
		.filter((route) => !route.includes("*"));

	return {
		routes: [...new Set(normalizedRoutes)],
		routePrefix
	};
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

		routes.push(normalizeRoute(route));
	}

	return routes;
}

test("visual regression for docs and src/pages routes", async ({ page, baseURL }) => {
	test.setTimeout(20 * 60_000);

	if (!baseURL) {
		throw new Error("Playwright baseURL is not configured.");
	}

	const routesFilePath = path.join(process.cwd(), ".docusaurus", "routes.js");
	const routesFileContent = await readFile(routesFilePath, "utf8");
	const { routes: docusaurusRoutes, routePrefix } = extractRuntimeRoutes(routesFileContent);
	const docusaurusRouteSet = new Set(docusaurusRoutes);

	const docsBase = joinRoutePrefix(routePrefix, "/docs");
	const docsRoutes = docusaurusRoutes.filter(
		(route) => route === docsBase || route.startsWith(`${docsBase}/`)
	);
	const srcPagesCandidates = await collectPageFileRoutes(path.join(process.cwd(), "src", "pages"));
	const srcPagesRoutes = srcPagesCandidates
		.map((route) => joinRoutePrefix(routePrefix, route))
		.filter((route) => docusaurusRouteSet.has(route));
	const allRoutes = [...new Set([...docsRoutes, ...srcPagesRoutes])].sort((a, b) => a.localeCompare(b));

	expect(allRoutes.length, "No routes discovered for docs/src pages visual test.").toBeGreaterThan(0);

	for (const route of allRoutes) {
		await test.step(`visual ${route}`, async () => {
			const response = await page.goto(route, { waitUntil: "domcontentloaded" });
			expect(response, `No response for route ${route}`).toBeTruthy();
			expect(response?.ok(), `Route failed: ${route} (HTTP ${response?.status()})`).toBeTruthy();

			const notFoundHeading = page.getByRole("heading", {
				name: /404|page not found/i
			});
			expect(
				await notFoundHeading.first().isVisible().catch(() => false),
				`Route rendered 404 content: ${route}`
			).toBeFalsy();

			// Warm up lazy-loaded content before taking full-page screenshots.
			await page.evaluate(async () => {
				window.scrollTo({ top: document.body.scrollHeight, behavior: "auto" });
				await new Promise((resolve) => setTimeout(resolve, 250));
				window.scrollTo({ top: 0, behavior: "auto" });
			});

			await page.waitForTimeout(300);

			await expect(page).toHaveScreenshot(routeToSnapshotName(route), {
				fullPage: true,
				animations: "disabled",
				caret: "hide"
			});
		});
	}
});
