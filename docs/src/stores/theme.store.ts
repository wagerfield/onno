import { writable } from "svelte/store"

export const theme = writable({
  accent: "coral",
  light: "ivory",
  dark: "#202428",
})
