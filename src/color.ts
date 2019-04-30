import { StyleProp, ThemeProps } from "./types"
import { extend } from "./style"

const style = extend({
  themeKeys: ["colors", "palette"],
  fallback: {
    gray: ["#EEE", "#AAA", "#666"],
    text: "#222",
    link: "#00F",
    bg: "#FFF"
  }
})

export interface BackgroundColorProps extends ThemeProps {
  backgroundColor?: StyleProp
  bgc?: StyleProp
}

export const backgroundColor = style<BackgroundColorProps>({
  propsKeys: ["backgroundColor", "bgc"]
})

export interface BorderColorProps extends ThemeProps {
  borderColor?: StyleProp
  bc?: StyleProp
}

export const borderColor = style<BorderColorProps>({
  propsKeys: ["borderColor", "bc"]
})

export interface TextColorProps extends ThemeProps {
  color?: StyleProp
  tc?: StyleProp
}

export const textColor = style<TextColorProps>({
  propsKeys: ["color", "tc"]
})

export type ColorProps = BackgroundColorProps &
  BorderColorProps &
  TextColorProps
