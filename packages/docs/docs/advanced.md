---
sidebar_position: 4
---

# Advanced Configurations

Since this plugin is not coupled to the Stencil architecture, it is unable to take advantage of the metadata from the Stencil config directly.

There are limited configurations that the Playwright test runner can take advantage of, that are specific to the Stencil eco-system. For those use cases, create a `stencil-playwright.json` config file in the root of your Stencil project (at the same folder depth as your playwright config).

Example configuration:

```json
{
  "namespace": "stencil-namespace"
}
```

The `namespace` is used for injecting the esm script when using the `.setContent` fixture.
