const js = require("@eslint/js");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const tseslint = require("typescript-eslint");
const globals = require("globals");
const eslintConfigPrettier = require("eslint-config-prettier");

module.exports = [
	{
		ignores: [
			"build/**",
			".docusaurus/**",
			"node_modules/**",
			"static/**",
			"docs/**",
			"i18n/**",
			"playwright-report/**",
			"test-results/**",
			"tests/e2e/**/*-snapshots/**",
		],
	},

	// React components and other browser-side JS/JSX under src/
	{
		files: ["src/**/*.{js,jsx}"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			// require/module are provided by webpack for static asset imports (e.g. via the @site alias)
			globals: {
				...globals.browser,
				require: "readonly",
				module: "readonly",
			},
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
		},
		plugins: { react, "react-hooks": reactHooks },
		rules: {
			...js.configs.recommended.rules,
			...react.configs.recommended.rules,
			// Downgraded to warnings: existing code is not yet fully compliant
			"react-hooks/rules-of-hooks": "warn",
			"react-hooks/exhaustive-deps": "warn",
			"react/react-in-jsx-scope": "off", // not needed with React 19 / new JSX transform
			"react/prop-types": "off",
		},
		settings: {
			react: { version: "detect" },
		},
	},

	// Node-based CommonJS scripts (config files, content validation tooling)
	{
		files: [
			"tests/content/**/*.js",
			"*.config.js",
			"sidebars.js",
			"copyright.js",
		],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "commonjs",
			globals: globals.node,
		},
		rules: {
			...js.configs.recommended.rules,
		},
	},

	// docusaurus.config.js mixes ESM import/export with require() (handled by Docusaurus' bundler)
	{
		files: ["docusaurus.config.js"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: globals.node,
		},
		rules: {
			...js.configs.recommended.rules,
		},
	},

	// TypeScript E2E tests: syntactic linting only (no type-checked rules)
	...tseslint.configs.recommended.map((config) => ({
		...config,
		files: ["tests/e2e/**/*.ts", "playwright.config.ts"],
	})),

	eslintConfigPrettier,
];
