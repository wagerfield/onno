import * as T from "./types"

export const PX_SCALE: T.ThemeValue = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512]

export const PC_SCALE: T.ThemeValue = Object.assign([], PX_SCALE, { 1: "100%" })

export const BREAKPOINTS: T.Breakpoints = ["all", "sm", "md", "lg", "xl"].map(
  (alias, index) => ({ alias, value: index * 360 })
)
