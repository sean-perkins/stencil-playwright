# `toHaveReceivedEventDetail`

Passes if the event spy received the expected event with the expected detail.

## Usage

```ts
import { test } from "stencil-playwright";

test("should emit 'myEvent' when button is clicked", async ({ page }) => {
  await page.goto("/src/components/example/test/basic");

  const myEventSpy = await page.spyOnEvent("myEvent");

  await page.click("#exampleButton");

  expect(myEventSpy).toHaveReceivedEventDetail({ value: "hello world" });
});
```
