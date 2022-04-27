<p align="center">
  <img src="https://github.com/sean-perkins/stencil-playwright/blob/main/.github/assets/stencil-logo.png?raw=true" width="60" />
  +
  <img src="https://github.com/sean-perkins/stencil-playwright/blob/main/.github/assets/playwright-logo.svg?raw=true" width="60">
</p>

<h1 align="center">
  Stencil Playwright
</h1>

<p align="center">
  End-to-end test your <a href="https://stenciljs.com/">Stencil</a> web components cross-browser and cross-platform using <a href="https://playwright.dev/">Playwright</a>.
</p>

<p align="center">
  <a href="https://github.com/sean-perkins/stencil-playwright/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Stencil Playwright is released under the MIT license." />
  </a>
</p>

> **This project has not been officially released yet. Please only use this repository for reference/testing**

## Quick start

### Install Stencil Playwright

```bash
npm install stencil-playwright --save-dev
```

### Install Peer Dependencies

Stencil Playwright requires the `@playwright/test` package.

```bash
npm install @playwright/test --save-dev
```

### Playwright Config

In your Stencil component library, create a `playwright.config.ts` for your project configurations. It is recommended to apply the following configurations to the standard configuration:

```diff
import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
+  testMatch: '*.e2e.ts',
  use: {
+    baseURL: 'http://localhost:3333'
  },
  webServer: {
+    command: 'serve -p 3333',
+    port: 3333,
+    reuseExistingServer: !process.env.CI
  }
};
```

> Playwright will only target end-to-end tests with files that end in `.e2e.ts` with the above configuration. You can change this to another pattern, if you are migrating away from Stencil Puppeteer.

To learn more about the available options, visit [Playwright's documentation](https://playwright.dev/docs/test-configuration#global-configuration).

### Update gitignore

Playwright will generate test output for the previous run. This includes a list of passing and failing tests as well as traces to review the exact execution of the test. These files should not be committed to source control.

In your Stencil component library's `.gitignore` add the following:

```diff
+playwright-report/
+test-results/
```

## Writing Tests

Stencil Playwright extends Playwright's page [fixture](https://playwright.dev/docs/api/class-fixtures) to simplify testing Stencil web components. When writing tests, you will use the fixtures from `stencil-playwright` as well as the test utilities that are included from `@playwright/test`.

```ts
// my-component.e2e.ts
import { expect } from "@playwright/test";

import { test } from "stencil-playwright";

test.describe("my-component", () => {
  test("renders", async ({ page }) => {
    await page.goto("/src/components/my-component/test/basic/index.html");

    const element = page.locator("my-component");
    expect(element).toHaveClass("hydrated");
  });
});
```

## Running Tests

Running the following commands from your Stencil component library to test with Playwright.

### Testing all suites

```bash
npx playwright test
```

### Testing a specific file

```bash
# The path to your test file, a directory or a regex pattern
npx playwright test src/components/my-component/my-component.e2e.ts
```
