import * as C from "csstype"
import * as T from "./types"
import { style } from "./style"

// Transform

export type TransformValue = C.TransformProperty

export type TransformProp = T.Prop<TransformValue>

export interface TransformProps extends T.ThemeProps {
  transform?: TransformProp
  tf?: TransformProp
}

export interface TransformStyle extends T.Style {
  transform?: TransformValue
}

export const transform = style<TransformProps, TransformStyle>({
  propsKeys: ["transform", "tf"]
})
