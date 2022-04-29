import type { Page, Response } from '@playwright/test';

import type { EventSpy } from './page/event-spy';

export interface E2EPage extends Page {
  /**
   * Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the
   * last redirect.
   *
   * The method will throw an error if:
   * - there's an SSL error (e.g. in case of self-signed certificates).
   * - target URL is invalid.
   * - the `timeout` is exceeded during navigation.
   * - the remote server does not respond or is unreachable.
   * - the main resource failed to load.
   *
   * The method will not throw an error when any valid HTTP status code is returned by the remote server, including 404 "Not
   * Found" and 500 "Internal Server Error".  The status code for such responses can be retrieved by calling
   * [response.status()](https://playwright.dev/docs/api/class-response#response-status).
   *
   * > NOTE: The method either throws an error or returns a main resource response. The only exceptions are navigation to
   * `about:blank` or navigation to the same URL with a different hash, which would succeed and return `null`.
   * > NOTE: Headless mode doesn't support navigation to a PDF document. See the
   * [upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295).
   *
   * Shortcut for main frame's [frame.goto(url[, options])](https://playwright.dev/docs/api/class-frame#frame-goto)
   * @param url URL to navigate page to. The url should include scheme, e.g. `https://`. When a `baseURL` via the context options was provided and the passed URL is a path, it gets merged via the
   * [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor.
   */
  goto: (url: string) => Promise<null | Response>;
  /**
   * Increases the size of the page viewport to match the `ion-content` contents.
   * Use this method when taking full-screen screenshots.
   */
  setIonViewport: () => Promise<void>;
  /**
   * This provides metadata that can be used to create a unique screenshot URL.
   * For example, we need to be able to differentiate between iOS in LTR mode and iOS in RTL mode.
   */
  getSnapshotSettings: () => string;
  /**
   * After changes have been made to a component, such as an update to a property or attribute,
   * we need to wait until the changes have been applied to the DOM.
   */
  waitForChanges: (timeoutMs?: number) => Promise<void>;
  /**
   * Listens on the window for a specific event to be dispatched.
   * Will wait a maximum of 5 seconds for the event to be dispatched.
   */
  waitForCustomEvent: (eventName: string) => Promise<Page>;

  /**
   * Creates a new EventSpy and listens
   * on the window for an event.
   * The test will timeout if the event
   * never fires.
   *
   * Usage:
   * const ionChange = await page.spyOnEvent('ionChange');
   * ...
   * await ionChange.next();
   */
  spyOnEvent: (eventName: string) => Promise<EventSpy>;
  _e2eEventsIds: number;
  _e2eEvents: Map<number, any>;

  setContent(html: string): Promise<void>;
}
