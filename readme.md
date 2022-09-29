<p align="center">
  <img src="https://github.com/sean-perkins/stencil-playwright/blob/main/.github/assets/stencil-logo.png?raw=true" width="60" />
  +
  <img src="https://github.com/sean-perkins/stencil-playwright/blob/main/.github/assets/playwright-logo.svg?raw=true" width="60">
</p>

<h1 align="center">
  Stencil Playwright
</h1>

<p align="center">
  End-to-end test your <a href="https://stenciljs.com/">Stencil</a> web components cross-browser and cross-platform using <a href="https://playwright.dev/">Playwright</a>.
</p>

<p align="center">
  <a href="https://github.com/sean-perkins/stencil-playwright/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Stencil Playwright is released under the MIT license." />
  </a>
  <a href="https://www.npmjs.com/package/stencil-playwright">
  <img src="https://img.shields.io/npm/v/stencil-playwright.svg" />
  </a>
</p>

## Quick Start

- [Installation & Setup Guide](https://stencil-playwright-docs.vercel.app/)
- [Custom Matchers](https://stencil-playwright-docs.vercel.app/category/matchers)
- [Test Extensions](https://stencil-playwright-docs.vercel.app/extensions)
- [Advanced Configurations](https://stencil-playwright-docs.vercel.app/advanced)

## Local Development

### Install dependencies

```shell
pnpm install
```

### Building Stencil Playwright

```shell
npx turbo run build --filter=stencil-playwright
```

### Testing Changes

Once the project has been built, you can test the changes in `packages/stencil-demo`.

## Running Tests

Running the following commands to test with Playwright.

### Testing all suites

```shell
npx playwright test
```

### Testing a specific file

```shell
# The path to your test file, a directory or a regex pattern
npx playwright test src/components/my-component/my-component.e2e.ts
```

### Releasing

This project is configured with [changesets](https://github.com/changesets/changesets/). To create a new release version, run:

```shell
npx changeset version
```

Follow the on-screen prompts to create a major or minor version bump. Commit your changes and merge into main.

Run the [Release](https://github.com/sean-perkins/stencil-playwright/actions/workflows/release.yml) workflow from the Github Actions tab.

If the Release action fails, confirm if changesets opened a pull request or pushed a branch to origin for the changelog updates. If so, merge these changes into `main` and re-run the release workflow.
