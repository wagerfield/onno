import { writable } from "svelte/store"

export const metadata = writable({
  title: "onno",
  url: "https://onnojs.com",
  description: "Tiny (596B) utility for composing class variants using clsx",
  statusBarStyle: "black-translucent",
  viewport: "width=device-width",
  themeLight: "#FFFFFF",
  themeDark: "#000000",
})
