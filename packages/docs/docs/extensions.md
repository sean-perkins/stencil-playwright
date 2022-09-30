---
sidebar_position: 3
---

# Test Extensions

## `skip`

Utility to skip the execution of a test suite based on a browser. Accepts: `chromium`, `firefox` or `webkit`.

```ts
test("swipe to go back", async ({ page, skip }) => {
  skip.browser("firefox", "Swipe to go back is unavailable in Firefox");
});
```

## `spyOnEvent`

Verify that a custom event emitted from a `page` or `locator`.

### Page

```ts
const myEventSpy = page.spyOnEvent("myEvent");
```

### Locator

```ts
const myButton = page.locator("button");
const myEventSpy = myButton.spyOnEvent("myEvent");
```

Used in combination with custom matchers such as: [`toHaveReceivedEvent`](/matchers/to-have-received-event).

## `waitForChanges`

Waits for Stencil asynchronous operations to complete, typically associated with a re-render of a component. Useful for testing changes to a component that are determined through event spies.

```ts
await page.waitForChanges();
```
