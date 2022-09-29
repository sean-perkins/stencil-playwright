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
  <a href="https://app.netlify.com/sites/stencil-playwright/deploys" alt="Netlify Status">
    <img src="https://api.netlify.com/api/v1/badges/bfcc2fbd-34d4-4315-8815-0b0b53aca606/deploy-status" />
  </a>
</p>

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

Stencil's dev server is created before the build is created. When running Playwright in a CI environment, we will need to manually serve the dist output of the Stencil library (this is handled within the Playwright config).

```bash
npm install serve --save-dev
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

## Using Custom Matchers

`stencil-playwright` includes a set of custom matchers to match the existing behavior from Stencil's Puppeteer integration and to simplify the process of writing tests on components.

In your `playwright.config.ts` add the following:

```ts
import { expect } from "@playwright/test";
import { matchers } from "stencil-playwright";

expect.extend(matchers);
```

You can now use the custom matchers in your tests.

### Supported Matchers

| Matcher                        | Description                                                                                           |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `toHaveReceivedEvent`          | Will check if the event spy received the expected event.                                              |
| `toHaveReceivedEventDetail`    | Will check if the event spy received the expected event with the expected detail.                     |
| `toHaveReceivedEventTimes`     | Will check if the event spy received the expected event a specific number of times.                   |
| `toHaveNthReceivedEventDetail` | Will check if the event spy received the expected event with the expected detail at a specific index. |

## Advanced Configurations

Since this plugin is not coupled to the Stencil architecture, it is unable to take advantage of the metadata from the Stencil config directly.

There are limited configurations that the Playwright test runner can take advantage of, that are specific to the Stencil eco-system. For those use cases, create a `stencil-playwright.json` config file in the root of your Stencil project (at the same folder depth as your playwright config).

Available configurations:

```json
{
  "namespace": "stencil-namespace"
}
```

The `namespace` is used for injecting the esm script when using the `.setContent` fixture.

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
