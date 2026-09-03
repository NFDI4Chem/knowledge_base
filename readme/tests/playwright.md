# Using Playwright

The end-to-end and visual tests are located under `tests/e2e/` and use Playwright Test. The central configuration is in `playwright.config.ts`.

> **Disclaimer:** Parts of this documentation were generated with the assistance of AI and may contain errors or inaccuracies. Always verify commands and instructions against the current project configuration before using them.

## Requirements

- Node.js `>=18`
- Installed project dependencies
- A Chromium browser for Playwright

Install the project dependencies:

```console
npm ci
```

Install the browser required by the project:

```console
npm run pw:install
```

## Running tests

Start all end-to-end tests:

```console
npm run test:e2e
```

Playwright automatically starts the configured web server. Before the test run, the website is built with `npm run build` and then served with `npm run serve` at `http://127.0.0.1:3000`. An already running server is reused locally, but not in CI.

The available test suites can be run individually:

```console
npm run test:e2e -- tests/e2e/smoke.spec.ts
npm run test:e2e:visual
```

The smoke test crawls internal pages and checks, among other things, HTTP status codes, document titles, and 404 pages. The visual test creates screenshots for routes found in `docs/` and `src/pages/` that are also present in the sitemap.

## Interactive testing and debugging

Start Playwright with the test UI:

```console
npm run test:e2e:ui
```

Run a test with a visible browser:

```console
npm run test:e2e -- tests/e2e/smoke.spec.ts --headed
```

Use debug mode with:

```console
npm run test:e2e -- tests/e2e/smoke.spec.ts --debug
```

Select an individual test by name:

```console
npm run test:e2e -- -g "all internal pages render without errors"
```

## Visual snapshots

The visual tests compare the current rendering with stored reference images. If an intentional change requires new references, update them with:

```console
npm run test:e2e:visual:update
```

Alternatively, update snapshots for all tests:

```console
npm run test:e2e:update
```

Only accept snapshots after reviewing the visual change. They are stored in snapshot directories next to the respective test file.

## Reports and artifacts

After a test run, Playwright creates an HTML report. Open it with:

```console
npx playwright show-report
```

Depending on the run, failed tests may produce additional artifacts such as traces or screenshots. According to the configuration, a trace is recorded on the first retry.

## Configuration

Important settings in `playwright.config.ts`:

- Test directory: `tests/e2e`
- Browser project: Chromium
- Default base URL: `http://127.0.0.1:3000`
- Timeout per test: 60 seconds
- One retry in CI, no retries locally
- HTML reporter without automatic opening
- Deterministic rendering with Light Mode, UTC, and reduced motion

If port `3000` is already used by another service, stop that service or change the port consistently in `use.baseURL`, `webServer.url`, and the serve command in `playwright.config.ts`.

## Before pull requests

The usual local check is:

```console
npm ci
npm run lint:all
npm run test:e2e
```

For a quick visual regression check, run:

```console
npm run test:e2e:visual
```

In CI, failed tests are retried once. Before updating snapshots, make sure the test passes reproducibly locally.
