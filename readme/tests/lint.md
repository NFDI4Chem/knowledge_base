# Using the content, format, JS, and CSS checks

This project uses four different checks:

- **Content check** validates frontmatter and titles in the Markdown and MDX files under `docs/`, based on the rules in `tests/content/validation.config.js`.
- **Format check** checks the formatting of supported source, documentation, and configuration files with Prettier.
- **JS check** lints JavaScript/JSX/TypeScript with ESLint, based on the rules in `eslint.config.js`.
- **CSS check** lints CSS with Stylelint, based on the rules in `.stylelintrc.json`.

The corresponding npm scripts are defined in `package.json`.

> **Disclaimer:** Parts of this documentation were generated with the assistance of AI and may contain errors or inaccuracies. Always verify commands and instructions against the current project configuration before using them.

## Requirements

- Node.js `>=18`
- Installed project dependencies

After cloning the repository or changing its dependencies:

```console
npm ci
```

`npm install` is also suitable for local development. CI uses `npm ci` to install exactly the versions specified in `package-lock.json`.

## Running checks

### Default check

```console
npm run test
```

This runs `npm run test:content`, which in turn runs `node tests/content/validate-content.js`. The script checks the documents under `docs/` for, among other things:

- valid YAML frontmatter
- a present `slug`
- a title provided by an H1 heading or the frontmatter field `title`
- excessively long `description` values or H1 headings (warning only, see [SEO recommendations](#seo-recommendations))
- the project-specific rules for titles and content

Some paths are excluded from the content check by default (e.g. `README.md` files); see `tests/content/validation.config.js` for the current exclude patterns.

### Full check

```console
npm run test:all
```

This check runs Prettier, content validation, ESLint, and Stylelint in sequence:

```console
npm run test:format
npm run test:content
npm run lint
```

`lint` itself runs `test:js` (ESLint) and `test:css` (Stylelint).

The format check covers files with the extensions `js`, `jsx`, `ts`, `tsx`, `md`, `mdx`, `json`, `css`, `yml`, and `yaml`. The exceptions are defined in `.prettierignore`.

Individual checks can also be started directly:

```console
npm run test:format
npm run test:content
npm run test:js
npm run test:css
```

## Automatically fixing formatting

```console
npm run test:format:fix
```

This formats all supported files with Prettier. ESLint and Stylelint findings that are auto-fixable can be fixed separately:

```console
npm run test:js:fix
npm run test:css:fix
# or both at once:
npm run lint:fix
```

Run the full check afterwards:

```console
npm run test:all
```

`test:format:fix` and `lint:fix` can change files throughout the repository. Review the changes with Git before committing.

## Common errors

### Missing or invalid slug

Documents under `docs/` require valid frontmatter, for example:

```markdown
---
slug: /example/
title: A different title
---
```

### Missing title

Add either `title` to the frontmatter or an H1 heading to the document. If both are present, the titles must not be identical.

### SEO recommendations

The content check also warns (without failing) when:

- the frontmatter `description` exceeds the configured maximum length
- the H1 heading exceeds the configured maximum length

Both limits are defined in `tests/content/validation.config.js` and can be adjusted there.

### Prettier fails

Start with:

```console
npm run test:format:fix
```

Then use `npm run test:format` to check whether any formatting problems remain that could not be fixed automatically. Files under `node_modules/`, `.docusaurus/`, `build/`, and `coverage/`, as well as `package-lock.json`, are ignored.

### ESLint or Stylelint fails

Run the check with more detail:

```console
npm run test:js
npm run test:css
```

Many findings can be fixed automatically:

```console
npm run lint:fix
```

React Hook rule violations (`react-hooks/*`) are reported as warnings and do not fail the check; they should still be reviewed and fixed when touching the affected code.

## Before pull requests

The minimum local check is:

```console
npm ci
npm run test:all
```

In CI, the GitHub Actions workflow `PR Check` (`.github/workflows/pr-check.yml`) runs the `Content Check`, `Format Check`, `JS Check`, and `CSS Check` jobs on every push and pull request. On pull requests, a `Build Validation` job additionally runs after all four checks pass, downloading translations and building the site to catch broken links and anchors.
