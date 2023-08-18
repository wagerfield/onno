import { isServer } from "$lib/utils"
import { readable } from "svelte/store"

export const pointer = readable({ x: 0, y: 0 }, (set) => {
  if (isServer) return

  const onPointerMove = (event: PointerEvent) => {
    set({
      x: Math.round(event.clientX),
      y: Math.round(event.clientY),
    })
  }

  window.addEventListener("pointermove", onPointerMove)

  return () => {
    window.removeEventListener("pointermove", onPointerMove)
  }
})
