import * as T from "./types"
import { variant } from "./style"
import { globalSet } from "./global"
import { colorSet } from "./color"
import { textSet } from "./text"

export type VariantProp = T.Prop<number | string>

// Global Variant

export interface GlobalStyleProps extends T.ThemeProps {
  globalStyle?: VariantProp
  gst?: VariantProp
}

export const globalStyle = variant<GlobalStyleProps>({
  propsKeys: ["globalStyle", "gst"],
  themeKeys: ["globalStyles"],
  renderers: [globalSet]
})

// Button Variant

export interface ButtonStyleProps extends T.ThemeProps {
  buttonStyle?: VariantProp
  bst?: VariantProp
}

export const buttonStyle = variant<ButtonStyleProps>({
  propsKeys: ["buttonStyle", "bst"],
  themeKeys: ["buttonStyles"],
  renderers: [globalSet]
})

// Color Variant

export interface ColorStyleProps extends T.ThemeProps {
  colorStyle?: VariantProp
  cst?: VariantProp
}

export const colorStyle = variant<ColorStyleProps>({
  propsKeys: ["colorStyle", "cst"],
  themeKeys: ["colorStyles"],
  renderers: [colorSet]
})

// Text Variant

export interface TextStyleProps extends T.ThemeProps {
  textStyle?: VariantProp
  tst?: VariantProp
}

export const textStyle = variant<TextStyleProps>({
  propsKeys: ["textStyle", "tst"],
  themeKeys: ["textStyles"],
  renderers: [textSet]
})
