import * as T from "./types"
import { variant } from "./style"
import { border, borderRadius } from "./border"
import { transition } from "./animation"
import { boxShadow } from "./shadow"
import { colorSet } from "./color"
import { spaceSet } from "./space"
import { sizeSet } from "./layout"
import { textSet } from "./text"

export type VariantProp = T.Prop<number | string>

// Global

const globalRenderers = [
  border,
  borderRadius,
  boxShadow,
  colorSet,
  spaceSet,
  sizeSet,
  textSet,
  transition
]

export interface GlobalStyleProps extends T.ThemeProps {
  globalStyle?: VariantProp
  gst?: VariantProp
}

export const globalStyle = variant<GlobalStyleProps>({
  propsKeys: ["globalStyle", "gst"],
  themeKeys: ["globalStyles"],
  renderers: globalRenderers
})

// Button

export interface ButtonStyleProps extends T.ThemeProps {
  buttonStyle?: VariantProp
  bst?: VariantProp
}

export const buttonStyle = variant<ButtonStyleProps>({
  propsKeys: ["buttonStyle", "bst"],
  themeKeys: ["buttonStyles"],
  renderers: globalRenderers
})

// Color

export interface ColorStyleProps extends T.ThemeProps {
  colorStyle?: VariantProp
  cst?: VariantProp
}

export const colorStyle = variant<ColorStyleProps>({
  propsKeys: ["colorStyle", "cst"],
  themeKeys: ["colorStyles"],
  renderers: [colorSet]
})

// Text

export interface TextStyleProps extends T.ThemeProps {
  textStyle?: VariantProp
  tst?: VariantProp
}

export const textStyle = variant<TextStyleProps>({
  propsKeys: ["textStyle", "tst"],
  themeKeys: ["textStyles"],
  renderers: [textSet]
})
