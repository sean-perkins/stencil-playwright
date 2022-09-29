# `toHaveReceivedEventTimes`

Passes if the event spy received the expected event a specific number of times.

## Usage

```ts
import { test } from "stencil-playwright";

test("should emit 'myEvent' when button is clicked", async ({ page }) => {
  await page.goto("/src/components/example/test/basic");

  const myEventSpy = await page.spyOnEvent("myEvent");

  expect(myEventSpy).toHaveReceivedEventTimes(0);

  await page.click("#exampleButton");

  expect(myEventSpy).toHaveReceivedEventTimes(1);
});
```
