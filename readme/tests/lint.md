# Using lint

This project uses two different checks:

- **Content linting** checks frontmatter and titles in the Markdown and MDX files under `docs/`.
- **Format linting** checks the formatting of supported source, documentation, and configuration files with Prettier.

The corresponding npm scripts are defined in `package.json`.

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
npm run lint
```

This runs `npm run lint:content`. The validation script `scripts/validate-content.js` checks the documents under `docs/` for, among other things:

- valid YAML frontmatter
- a present `slug`
- a title provided by an H1 heading or the frontmatter field `title`
- the project-specific rules for titles and content

### Full check

```console
npm run lint:all
```

This check runs Prettier first and content validation afterwards:

```console
npm run lint:format
npm run lint:content
```

The format check covers files with the extensions `js`, `jsx`, `ts`, `tsx`, `md`, `mdx`, `json`, `css`, `yml`, and `yaml`. The exceptions are defined in `.prettierignore`.

Individual checks can also be started directly:

```console
npm run lint:format
npm run lint:content
```

## Automatically fixing formatting

```console
npm run lint:fix
```

This formats all supported files with Prettier. Run the full check afterwards:

```console
npm run lint:all
```

`lint:fix` can change files throughout the repository. Review the changes with Git before committing.

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

### Prettier fails

Start with:

```console
npm run lint:fix
```

Then use `npm run lint:format` to check whether any formatting problems remain that could not be fixed automatically. Files under `node_modules/`, `.docusaurus/`, `build/`, and `coverage/`, as well as `package-lock.json`, are ignored.

## Before pull requests

The minimum local check is:

```console
npm ci
npm run lint:all
```

In CI, the GitHub Actions workflow `Lint` runs the content check and also checks the formatting of changed files. PR validation additionally runs content validation and a Docusaurus build.
