# Custom Event Emitted

Test a custom event was emitted when a user action occurs.

## Stencil Demo

```tsx title="src/components/my-component.tsx"
import { Component, Event, EventEmitter, h } from "@stencil/core";

@Component({
  tag: "my-component",
  shadow: true,
})
export class MyComponent {
  @Event() myEvent: EventEmitter<string>;

  render() {
    return (
      <div>
        <button onClick={() => this.myEvent.emit("Hello World")}>
          Click me to emit an event
        </button>
      </div>
    );
  }
}
```

## Playwright Test

```ts title="src/components/my-component/my-component.e2e.ts"
import { test } from "stencil-playwright";
import { expect } from "@playwright/test";

test.describe("my-component", () => {
  test("it should render a button", async ({ page }) => {
    await page.setContent(`<my-component></my-component>`);

    const button = await page.locator("my-component button");

    await expect(button).toBeVisible();
  });

  test("it should emit an event", async ({ page }) => {
    await page.setContent(`<my-component></my-component>`);

    const myEventSpy = await page.spyOnEvent("myEvent");

    const button = await page.locator("my-component button");
    await button.click();

    expect(myEventSpy).toHaveReceivedEvent();
  });

  test("it should emit an event with the expected detail", async ({ page }) => {
    await page.setContent(`<my-component></my-component>`);

    const myEventSpy = await page.spyOnEvent("myEvent");

    const button = await page.locator("my-component button");
    await button.click();

    await myEventSpy.next();

    expect(myEventSpy).toHaveReceivedEventDetail("Hello World");
  });
});
```
