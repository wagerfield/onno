import { Theme, ThemeMap, ThemeList } from "./types"

const breakpoints: ThemeList = [
  {
    alias: "sm",
    value: 360
  },
  {
    alias: "md",
    value: 720
  },
  {
    alias: "lg",
    value: 1080
  },
  {
    alias: "xl",
    value: 1440
  }
]

const lineHeights: ThemeMap = {
  heading: 1.25,
  normal: 1.5,
  single: 1.0
}

const fontFamilies: ThemeMap = {
  text: "system-ui, sans-serif",
  mono: "Monaco, monospace"
}

const fontWeights: ThemeMap = {
  normal: 400,
  bold: 700
}

const fontSizes: ThemeList = [12, 14, 16, 20, 24, 32, 48, 64]

const space: ThemeList = [0, 4, 8, 16, 32, 64, 128, 256, 512]

const sizes: ThemeList = [1, 1 / 2, 1 / 3, 1 / 4, 1 / 6, 1 / 8]

const radii: ThemeList = [0, 4, 8, 16, 32, 48, 64]

const palette: ThemeMap = {
  text: "#222",
  link: "#00F",
  bg: "#FFF"
}

const borders: ThemeList = ["none", "1px solid"]

const shadows: ThemeList = ["none"]

const base: ThemeMap = {
  body: {
    background: "bg",
    color: "text",
    margin: 0
  },
  html: {
    fontSize: 2
  },
  h1: {
    fontSize: 5
  },
  h2: {
    fontSize: 4
  },
  h3: {
    fontSize: 3
  },
  a: {
    color: "link"
  }
}

export const theme: Theme = {
  breakpoints,
  lineHeights,
  fontFamilies,
  fontWeights,
  fontSizes,
  borders,
  palette,
  shadows,
  radii,
  sizes,
  space,
  base
}
