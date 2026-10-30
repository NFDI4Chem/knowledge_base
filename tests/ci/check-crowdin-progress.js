/* Verifies via the Crowdin API that every target language is 100% translated. */
const fs = require("fs");
const path = require("path");

const token = process.env.CROWDIN_PERSONAL_TOKEN;
if (!token) {
	console.error("CROWDIN_PERSONAL_TOKEN is not set.");
	process.exit(1);
}

const crowdinConfig = fs.readFileSync(
	path.join(__dirname, "..", "..", "crowdin.yml"),
	"utf8",
);
const projectId =
	process.env.CROWDIN_PROJECT_ID ||
	(crowdinConfig.match(/^project_id:\s*"?(\d+)"?/m) || [])[1];
if (!projectId) {
	console.error("Could not determine the Crowdin project id.");
	process.exit(1);
}

const baseUrl = process.env.CROWDIN_BASE_URL || "https://api.crowdin.com";

async function main() {
	const res = await fetch(
		`${baseUrl}/api/v2/projects/${projectId}/languages/progress?limit=500`,
		{ headers: { Authorization: `Bearer ${token}` } },
	);
	if (!res.ok) {
		throw new Error(`Crowdin API returned ${res.status} ${res.statusText}`);
	}
	const { data } = await res.json();
	if (!data || data.length === 0) {
		throw new Error("Crowdin API returned no language progress data.");
	}

	const incomplete = [];
	for (const { data: lang } of data) {
		const ok = lang.translationProgress === 100;
		console.log(
			`${ok ? "OK  " : "FAIL"} ${lang.languageId}: ${lang.translationProgress}% translated`,
		);
		if (!ok) incomplete.push(lang.languageId);
	}

	if (incomplete.length > 0) {
		console.error(
			`\nTranslation is not 100% for: ${incomplete.join(", ")}`,
		);
		process.exit(1);
	}
	console.log("\nAll locales are 100% translated.");
}

main().catch((err) => {
	console.error(err.message);
	process.exit(1);
});
