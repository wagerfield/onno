import { vitePreprocess } from "@sveltejs/kit/vite"
import vercelAdapter from "@sveltejs/adapter-vercel"

// https://kit.svelte.dev/docs/configuration
/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  vitePlugin: {
    inspector: false,
  },
  kit: {
    appDir: "app",
    outDir: ".svelte",
    adapter: vercelAdapter({ runtime: "edge" }),
    alias: {
      $codemirror: "./src/codemirror",
      $components: "./src/components",
      $examples: "./src/examples",
      $stores: "./src/stores",
    },
  },
}

export default config
