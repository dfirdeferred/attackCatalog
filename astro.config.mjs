// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://dfirdeferred.github.io",
  base: "/attackCatalog",
  output: "static",
  build: {
    format: "directory",
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },
});
