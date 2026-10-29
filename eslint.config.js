import eslintJs from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import tseslint from "typescript-eslint";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
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

		// Extend recommended rule sets from:
		// 1. ESLint JS's recommended rules
		// 2. ESLint React's recommended rules
		extends: [
			eslintJs.configs.recommended,
			eslintReact.configs.recommended,
		],
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
		plugins: { react: eslintReact },
		rules: {
			...eslintJs.configs.recommended.rules,
			"@eslint-react/no-missing-key": "warn",
		},
		settings: {
			react: { version: "detect" },
		},
	},

	// Node-based CommonJS scripts (config files, content validation tooling)
	{
		files: ["tests/content/**/*.js", "sidebars.js", "copyright.js"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "commonjs",
			globals: globals.node,
		},
		rules: {
			...eslintJs.configs.recommended.rules,
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
			...eslintJs.configs.recommended.rules,
		},
	},

	// TypeScript E2E tests: syntactic linting only (no type-checked rules)
	...tseslint.configs.recommended.map((config) => ({
		...config,
		files: ["tests/e2e/**/*.ts", "playwright.config.ts"],
	})),

	eslintConfigPrettier,
]);
