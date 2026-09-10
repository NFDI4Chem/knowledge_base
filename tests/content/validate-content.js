#!/usr/bin/env node

/**
 * Content Validation Script
 *
 * Validates:
 * 1. Frontmatter present and valid YAML with at least one slug
 * 2. Valid page titles (h1 or title in frontmatter)
 * 3. No identical h1 and title values
 */

const fs = require("fs");
const path = require("path");

// Try to load glob, otherwise exit
let glob;
try {
	glob = require("glob");
} catch {
	console.error("❌ Error: glob package not installed!");
	console.error("Please run: npm install");
	process.exit(1);
}

// Try to load gray-matter, otherwise exit
let matter;
try {
	matter = require("gray-matter");
} catch {
	console.error("❌ Error: gray-matter package not installed!");
	console.error("Please run: npm install");
	process.exit(1);
}

const config = require("./validation.config.js");

const DOCS_DIR = path.join(__dirname, "../../docs");

// Check if docs directory exists
if (!fs.existsSync(DOCS_DIR)) {
	console.error(`❌ Error: Directory not found: ${DOCS_DIR}`);
	process.exit(1);
}

/**
 * Finds all md/mdx files recursively
 */
function findContentFiles() {
	try {
		return glob.sync("**/*.{md,mdx}", {
			cwd: DOCS_DIR,
			ignore: config.exclude.paths,
		});
	} catch (error) {
		console.error(`❌ Error searching for files: ${error.message}`);
		process.exit(1);
	}
}

/**
 * Validates frontmatter of a file
 */
function validateFrontmatter(filePath, content) {
	const errors = [];
	const warnings = [];

	try {
		const { data } = matter(content);

		// Check if frontmatter is empty
		if (Object.keys(data).length === 0) {
			errors.push(`No frontmatter present`);
			return { hasErrors: true, errors, warnings };
		}

		// Check for slug
		if (!data.slug) {
			errors.push(`Slug missing in frontmatter`);
		} else if (typeof data.slug !== "string" || data.slug.trim() === "") {
			errors.push(
				`Slug must be a non-empty string (received: ${JSON.stringify(data.slug)})`,
			);
		} else {
			// Validate slug format (URL best practices)
			const slug = data.slug;

			// Check for uppercase letters (warning, but allowed)
			if (slug !== slug.toLowerCase()) {
				warnings.push(
					`Slug contains uppercase letters. The use of case-sensitive slugs is allowed but not recommended: "${slug}"`,
				);
			}

			// Check for spaces
			if (/\s/.test(slug)) {
				errors.push(
					`Slug contains spaces. Use hyphens (-) or underscores (_): "${slug}"`,
				);
			}

			// Check for invalid characters (allowed: a-z, A-Z, 0-9, /, -, _)
			const validSlugPattern = /^[a-zA-Z0-9/_-]+$/;
			if (!validSlugPattern.test(slug)) {
				errors.push(
					`Slug contains invalid characters. Only allowed: a-z, A-Z, 0-9, /, -, _: "${slug}"`,
				);
			}
		}

		// Check description length (recommended for SEO)
		const descriptionMaxLength =
			config.frontmatter.optional.description.maxLength;
		if (
			typeof data.description === "string" &&
			data.description.length > descriptionMaxLength
		) {
			warnings.push(
				`Description is longer than ${descriptionMaxLength} characters (${data.description.length}), which is not recommended for SEO`,
			);
		}

		return {
			hasErrors: errors.length > 0,
			errors,
			warnings,
			frontmatter: data,
			content: content.split("---").slice(2).join("---").trim(),
		};
	} catch (error) {
		return {
			hasErrors: true,
			errors: [`Error parsing frontmatter: ${error.message}`],
			warnings: [],
		};
	}
}

/**
 * Validates page title
 */
function validateTitle(filePath, frontmatter, content) {
	const errors = [];
	const warnings = [];

	const h1Match = content.match(/^# (.+)$/m);
	const h1Title = h1Match ? h1Match[1].trim() : null;
	const fmTitle = frontmatter.title || null;

	// Check for at least one title
	if (!h1Title && !fmTitle) {
		errors.push(
			`No valid title found (neither h1 nor title in frontmatter)`,
		);
	}

	// If both present, they must not be identical
	if (h1Title && fmTitle) {
		if (h1Title === fmTitle) {
			warnings.push(
				`h1 and frontmatter title are identical ("${h1Title}") and thus redundant. Both fields should only be used if different strings are required for page and navigation titles.`,
			);
		}
	}

	// Check h1 length (recommended for SEO)
	if (h1Title && h1Title.length > config.title.h1MaxLength) {
		warnings.push(
			`h1 is longer than ${config.title.h1MaxLength} characters (${h1Title.length}), which is not recommended for SEO`,
		);
	}

	return { hasErrors: errors.length > 0, errors, warnings };
}

/**
 * Validates a single file
 */
function validateFile(relPath) {
	const filePath = path.join(DOCS_DIR, relPath);

	let content;
	try {
		content = fs.readFileSync(filePath, "utf-8");
	} catch (error) {
		return {
			file: relPath,
			errors: [`Error reading file: ${error.message}`],
			warnings: [],
		};
	}

	const fileErrors = { file: relPath, errors: [], warnings: [] };

	// Step 1: Validate frontmatter
	const fmValidation = validateFrontmatter(relPath, content);
	fileErrors.errors.push(...fmValidation.errors);
	fileErrors.warnings.push(...fmValidation.warnings);

	if (!fmValidation.hasErrors && fmValidation.frontmatter) {
		// Step 2: Validate title
		const titleValidation = validateTitle(
			relPath,
			fmValidation.frontmatter,
			fmValidation.content,
		);
		fileErrors.errors.push(...titleValidation.errors);
		fileErrors.warnings.push(...titleValidation.warnings);
	}

	return fileErrors;
}

/**
 * Main function
 */
function main() {
	const files = findContentFiles();
	const results = files.map((file) => validateFile(file));

	const errorCount = results.reduce((sum, r) => sum + r.errors.length, 0);
	const warningCount = results.reduce((sum, r) => sum + r.warnings.length, 0);

	if (config.output.json) {
		console.log(
			JSON.stringify(
				{
					filesChecked: results.length,
					errorCount,
					warningCount,
					files: results.filter(
						(r) => r.errors.length > 0 || r.warnings.length > 0,
					),
				},
				null,
				2,
			),
		);
		process.exit(errorCount > 0 ? 1 : 0);
	}

	console.log("🔍 Validating documents...\n");
	console.log(`📁 Files found: ${results.length}\n`);

	results.forEach((validation) => {
		const hasErrors = validation.errors.length > 0;
		const hasWarnings =
			!config.output.errorOnly && validation.warnings.length > 0;

		if (hasErrors || hasWarnings || config.output.verbose) {
			console.log(`📄 ${validation.file}`);

			if (hasErrors) {
				console.log("  ❌ Errors:");
				validation.errors.forEach((err) =>
					console.log(`     - ${err}`),
				);
			}

			if (hasWarnings) {
				console.log("  ⚠️  Warnings:");
				validation.warnings.forEach((warn) =>
					console.log(`     - ${warn}`),
				);
			}

			if (!hasErrors && !hasWarnings) {
				console.log("  ✅ OK");
			}

			console.log("");
		}
	});

	// Summary
	console.log("\n📊 Summary:");
	console.log(`   Files checked: ${results.length}`);
	console.log(`   Errors: ${errorCount}`);
	console.log(`   Warnings: ${warningCount}`);

	if (errorCount > 0) {
		console.log("\n❌ Validation failed!");
		process.exit(1);
	} else {
		console.log("\n✅ Validation successful!");
		process.exit(0);
	}
}

main();
