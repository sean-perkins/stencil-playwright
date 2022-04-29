import type {
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
} from '@playwright/test';
import { test as base } from '@playwright/test';

import { initPageEvents } from './page/event-spy';
import { goto as goToPage, setContent, spyOnEvent, waitForChanges } from './page/utils';
import type { E2EPage } from './playwright-declarations';

type CustomTestArgs = PlaywrightTestArgs &
  PlaywrightTestOptions &
  PlaywrightWorkerArgs &
  PlaywrightWorkerOptions & {
    page: E2EPage;
  };

type CustomFixtures = {
  page: E2EPage;
};

export const test = base.extend<CustomFixtures>({
  page: async ({ page }: CustomTestArgs, use: (r: E2EPage) => Promise<void>) => {

    const originalGoto = page.goto.bind(page);

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
    // Custom methods
    page.waitForChanges = (timeoutMs?: number) => waitForChanges(page, timeoutMs);
    page.spyOnEvent = (eventName: string) => spyOnEvent(page, eventName);
    // Custom event behavior
    initPageEvents(page);

    await use(page);
  },
});
