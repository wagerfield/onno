import * as T from "./types"
import { variant } from "./style"
import { globalSet } from "./global"
import { colorSet } from "./color"
import { textSet } from "./text"

export type VariantProp = T.Prop<number | string>

// Color Variant

export interface ColorStyleProps extends T.ThemeProps {
  colorStyle?: VariantProp
  cst?: VariantProp
}

export const colorStyle = variant<ColorStyleProps, any>({
  propsKeys: ["colorStyle", "cst"],
  themeKeys: ["colorStyles"],
  renderers: [colorSet]
})

// Text Variant

export interface TextStyleProps extends T.ThemeProps {
  textStyle?: VariantProp
  tst?: VariantProp
}

export const textStyle = variant<TextStyleProps, any>({
  propsKeys: ["textStyle", "tst"],
  themeKeys: ["textStyles"],
  renderers: [textSet]
})

// Button Variant

export interface ButtonStyleProps extends T.ThemeProps {
  buttonStyle?: VariantProp
  bst?: VariantProp
}

export const buttonStyle = variant<ButtonStyleProps, any>({
  propsKeys: ["buttonStyle", "bst"],
  themeKeys: ["buttonStyles"],
  renderers: [colorStyle, textStyle, globalSet]
})

// Global Variant

export interface GlobalStyleProps extends T.ThemeProps {
  globalStyle?: VariantProp
  gst?: VariantProp
}

const gst = variant<GlobalStyleProps, any>({
  propsKeys: ["globalStyle", "gst"],
  themeKeys: ["globalStyles"],
  renderers: [buttonStyle, colorStyle, textStyle, globalSet]
})

export const globalStyle: T.RenderFunction<GlobalStyleProps, any> = (props) =>
  gst({ gst: ".", ...props })

globalStyle.options = gst.options
globalStyle.type = gst.type
