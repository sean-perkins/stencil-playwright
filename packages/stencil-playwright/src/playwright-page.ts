import type {
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
} from '@playwright/test';
import { test as base } from '@playwright/test';

import { initPageEvents } from './page/event-spy';
import { goto as goToPage, locator, LocatorOptions, setContent, spyOnEvent, waitForChanges } from './page/utils';
import type { BrowserNameOrCallback, E2EPage, E2ESkip } from './playwright-declarations';

type CustomTestArgs = PlaywrightTestArgs &
  PlaywrightTestOptions &
  PlaywrightWorkerArgs &
  PlaywrightWorkerOptions & {
    page: E2EPage;
  };

type CustomFixtures = {
  page: E2EPage;
  skip: E2ESkip;
};

export const test = base.extend<CustomFixtures>({
  page: async ({ page }: CustomTestArgs, use: (r: E2EPage) => Promise<void>) => {

    const originalGoto = page.goto.bind(page);
    const originalLocator = page.locator.bind(page);

    /**
     * Adds a global flag on the window that the test suite
     * can use to determine when it is safe to execute tests
     * on hydrated Stencil components.
     */
    page.addInitScript(`
    (function() {
      window.addEventListener('appload', () => {
        window.testAppLoaded = true;
      });
    })();`);
    // Overridden Playwright methods
    page.goto = (url: string) => goToPage(page, url, originalGoto);
    page.setContent = (html: string) => setContent(page, html, test.info());
    page.locator = (selector: string, options?: LocatorOptions) => locator(page, originalLocator, selector, options);
    // Custom methods
    page.waitForChanges = (timeoutMs?: number) => waitForChanges(page, timeoutMs);
    page.spyOnEvent = (eventName: string) => spyOnEvent(page, eventName);
    // Custom event behavior
    await initPageEvents(page);

    await use(page);
  },
  skip: {
    browser: (
      browserNameOrFunction: BrowserNameOrCallback,
      reason = `The functionality that is being tested is not applicable to this browser.`
    ) => {
      const browserName = base.info().project.use.browserName!;

      if (typeof browserNameOrFunction === 'function') {
        base.skip(browserNameOrFunction(browserName), reason);
      } else {
        base.skip(browserName === browserNameOrFunction, reason);
      }
    },
  }
});
