// vite.config.ts
import path from 'path';
import { defineConfig } from 'vite';

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "StencilPlaywright",
      fileName: (format) => `stencil-playwright.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["@playwright/test", "@stencil/core"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          "@playwright/test": "Playwright",
          // vue: "Vue",
        },
      },
    },
  },
});