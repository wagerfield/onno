import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    coverage: {
      reporter: ["text", "json", "json-summary"],
      statements: 100,
      functions: 100,
      branches: 100,
      lines: 100,
    },
  },
})
