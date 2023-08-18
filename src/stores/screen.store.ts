import { isServer } from "$lib/utils"
import { readable } from "svelte/store"

export const screen = readable({ width: 0, height: 0 }, (set) => {
  if (isServer) return

  const onWindowResize = () => {
    set({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  window.addEventListener("resize", onWindowResize)

  onWindowResize()

  return () => {
    window.removeEventListener("resize", onWindowResize)
  }
})
