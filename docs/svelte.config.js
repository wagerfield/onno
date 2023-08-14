import { vitePreprocess } from "@sveltejs/kit/vite"
import vercelAdapter from "@sveltejs/adapter-vercel"

// https://kit.svelte.dev/docs/configuration
/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  vitePlugin: {
    inspector: true,
  },
  kit: {
    appDir: "app",
    outDir: ".svelte",
    adapter: vercelAdapter({ runtime: "edge" }),
    alias: {
      $components: "./src/components",
      $stores: "./src/stores",
    },
  },
}

export default config
