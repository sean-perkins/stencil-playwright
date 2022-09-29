import type { Page, TestInfo } from '@playwright/test';

/**
 * Overwrites the default Playwright page.setContent method.
 *
 * Navigates to a blank page, sets the content, and waits for the
 * Stencil components to be hydrated before proceeding with the test.
 *
 * @param page The Playwright page object.
 * @param html The HTML content to set on the page.
 */
export const setContent = async (page: Page, html: string, testInfo: TestInfo) => {
  if (page.isClosed()) {
    throw new Error('setContent unavailable: page is already closed');
  }

  const baseUrl = testInfo.project.use.baseURL ?? process.env.PLAYWRIGHT_TEST_BASE_URL;

  let stencilPlaywrightConfig: any;

  try {
    stencilPlaywrightConfig = require(`${process.cwd()}/stencil-playwright.json`);
  } catch (ex) {
    console.error('Error loading stencil-playwright.json', ex);
  }

  let appScriptUrl: string | undefined;
  if (stencilPlaywrightConfig) {
    appScriptUrl = `/dist/${stencilPlaywrightConfig.namespace}/${stencilPlaywrightConfig.namespace}.esm.js`;
  }

  const dir = testInfo.project?.metadata?.rtl ? 'rtl': 'ltr';

  const output = `
    <!DOCTYPE html>
    <html dir="${dir}">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
        ${appScriptUrl !== undefined ? `<script type="module" src="${baseUrl}${appScriptUrl}"></script>` : ''}
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;

  if (baseUrl) {
    await page.route(baseUrl, route => {
      if (route.request().url() === `${baseUrl}/`) {
        /**
         * Intercepts the empty page request and returns the
         * HTML content that was passed in.
         */
        route.fulfill({
          status: 200,
          contentType: 'text/html',
          body: output
        });
      } else {
        // Allow all other requests to pass through
        route.continue();
      }
    });

    await page.goto(`${baseUrl}#`);
  }

  await page.waitForFunction(() => (window as any).testAppLoaded === true, { timeout: 4750 });
}