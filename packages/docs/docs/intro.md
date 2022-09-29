---
sidebar_position: 1
slug: /
---

# Installation

Let's discover **Stencil Playwright in less than 5 minutes**.

## Getting Started

Get started by **installing Stencil Playwright to your Stencil project**.

```shell
npm install stencil-playwright @playwright/test serve --save-dev
```

After successfully installing your project's dependencies, run the following command:

```shell
npx playwright install
```

## Create Playwright Config

In your Stencil component library, create a `playwright.config.ts` for your project configurations. This config file can be located next to your existing `stencil.config.ts`. It is recommended to apply the following configurations:

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

:::info

Playwright will only target end-to-end tests with files that end in `.e2e.ts` with the above configuration. You can change this to another pattern, if you are migrating away from Stencil Puppeteer.

:::

To learn more about the available options, visit [Playwright's documentation](https://playwright.dev/docs/test-configuration#global-configuration).

## Update `.gitignore`

Playwright will generate test output for the previous run. This includes a list of passing and failing tests as well as traces to review the exact execution of the test. These files should not be committed to source control.

In your Stencil component library's `.gitignore` add the following:

```
playwright-report/
test-results/
```

## Next Steps

Your project is now configured with Playwright. You can learn more about [writing tests](https://playwright.dev/docs/writing-tests) and [running tests](https://playwright.dev/docs/running-tests) from Playwright's official documentation.

When writing tests **import `test` from stencil-playwright** instead of `@playwright/test`.

```ts
import { test } from "stencil-playwright";

test.describe("", () => {
  test("", async ({ page }) => {
    // Test contents
  });
});
```

The custom fixture will continue to use all the available matchers and typings available from `@playwright/test`.
