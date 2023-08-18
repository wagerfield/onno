import { defineConfig } from "vitest/config"
import { sveltekit } from "@sveltejs/kit/vite"

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ["tests/**/*.spec.ts"],
    coverage: {
      reporter: ["text", "html", "json", "json-summary"],
      statements: 100,
      functions: 100,
      branches: 100,
      lines: 100,
    },
  },
})
