import * as T from "./types"

export const PX_SCALE: T.ThemeValue = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512]

export const PC_SCALE: T.ThemeValue = Object.assign([], PX_SCALE, { 1: "100%" })

export const BREAKPOINTS: T.Breakpoints = [
  { alias: "xs", value: 360 * 0 },
  { alias: "sm", value: 360 * 1 },
  { alias: "md", value: 360 * 2 },
  { alias: "lg", value: 360 * 3 },
  { alias: "xl", value: 360 * 4 }
]

export const COLORS: T.ThemeValue = {
  gray: ["#EEE", "#AAA", "#666"],
  text: "#222",
  link: "#00F",
  bg: "#FFF"
}
