/**
 * Configuration for Content Validation
 *
 * Consumed by validate-content.js. Only options that are actually
 * implemented are listed here.
 */

module.exports = {
	// Glob patterns (relative to the docs directory) to skip during validation
	exclude: {
		paths: [
			"_*/**", // directories starting with underscore
			"[0-9][0-9]_draft/**", // draft directories
			"**/README.md",
		],
	},

	frontmatter: {
		optional: {
			description: {
				// Recommended max length for SEO; exceeding this only triggers a warning
				maxLength: 160,
			},
		},
	},

	title: {
		// Recommended max h1 length for SEO; exceeding this only triggers a warning
		h1MaxLength: 70,
	},

	output: {
		// Log every checked file, not just the ones with errors/warnings
		verbose: false,

		// Only print errors, hide warnings from the console output
		errorOnly: false,

		// Print the summary as JSON instead of formatted console output
		json: false,
	},
};
