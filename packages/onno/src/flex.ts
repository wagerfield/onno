import * as C from "csstype"
import * as T from "./types"
import { style } from "./style"
import { compose } from "./compose"
import { display, DisplayProps, DisplayStyle } from "./display"
import {
  alignContent,
  AlignContentProps,
  AlignContentStyle,
  alignItems,
  AlignItemsProps,
  AlignItemsStyle,
  alignSelf,
  AlignSelfProps,
  AlignSelfStyle,
  justifyContent,
  JustifyContentProps,
  JustifyContentStyle,
  justifyItems,
  JustifyItemsProps,
  JustifyItemsStyle,
  justifySelf,
  JustifySelfProps,
  JustifySelfStyle,
  order,
  OrderProps,
  OrderStyle
} from "./align"

// Flex

export type FlexValue = C.FlexProperty<T.Length>

export type FlexProp = T.Prop<FlexValue>

export interface FlexProps extends T.ThemeProps {
  flex?: FlexProp
  fx?: FlexProp
}

export interface FlexStyle extends T.Style {
  flex?: FlexValue
}

export const flex = style<FlexProps, FlexStyle>({
  propsKeys: ["flex", "fx"]
})

// Flex Basis

export type FlexBasisValue = C.FlexBasisProperty<T.Length>

export type FlexBasisProp = T.Prop<FlexBasisValue>

export interface FlexBasisProps extends T.ThemeProps {
  flexBasis?: FlexBasisProp
  fxb?: FlexBasisProp
}

export interface FlexBasisStyle extends T.Style {
  flexBasis?: FlexBasisValue
}

export const flexBasis = style<FlexBasisProps, FlexBasisStyle>({
  propsKeys: ["flexBasis", "fxb"]
})

// Flex Grow

export type FlexGrowValue = C.Globals | number

export type FlexGrowProp = T.Prop<FlexGrowValue>

export interface FlexGrowProps extends T.ThemeProps {
  flexGrow?: FlexGrowProp
  fxg?: FlexGrowProp
}

export interface FlexGrowStyle extends T.Style {
  flexGrow?: FlexGrowValue
}

export const flexGrow = style<FlexGrowProps, FlexGrowStyle>({
  propsKeys: ["flexGrow", "fxg"]
})

// Flex Shrink

export type FlexShrinkValue = C.Globals | number

export type FlexShrinkProp = T.Prop<FlexShrinkValue>

export interface FlexShrinkProps extends T.ThemeProps {
  flexShrink?: FlexShrinkProp
  fxs?: FlexShrinkProp
}

export interface FlexShrinkStyle extends T.Style {
  flexShrink?: FlexShrinkValue
}

export const flexShrink = style<FlexShrinkProps, FlexShrinkStyle>({
  propsKeys: ["flexShrink", "fxs"]
})

// Flex Flow

export type FlexFlowValue = C.FlexFlowProperty

export type FlexFlowProp = T.Prop<FlexFlowValue>

export interface FlexFlowProps extends T.ThemeProps {
  flexFlow?: FlexFlowProp
  fxf?: FlexFlowProp
}

export interface FlexFlowStyle extends T.Style {
  flexFlow?: FlexFlowValue
}

export const flexFlow = style<FlexFlowProps, FlexFlowStyle>({
  propsKeys: ["flexFlow", "fxf"]
})

// Flex Direction

export type FlexDirectionValue = C.FlexDirectionProperty

export type FlexDirectionProp = T.Prop<FlexDirectionValue>

export interface FlexDirectionProps extends T.ThemeProps {
  flexDirection?: FlexDirectionProp
  fxd?: FlexDirectionProp
}

export interface FlexDirectionStyle extends T.Style {
  flexDirection?: FlexDirectionValue
}

export const flexDirection = style<FlexDirectionProps, FlexDirectionStyle>({
  propsKeys: ["flexDirection", "fxd"]
})

// Flex Wrap

export type FlexWrapValue = C.FlexWrapProperty

export type FlexWrapProp = T.Prop<FlexWrapValue>

export interface FlexWrapProps extends T.ThemeProps {
  flexWrap?: FlexWrapProp
  fxw?: FlexWrapProp
}

export interface FlexWrapStyle extends T.Style {
  flexWrap?: FlexWrapValue
}

export const flexWrap = style<FlexWrapProps, FlexWrapStyle>({
  propsKeys: ["flexWrap", "fxw"]
})

// Flex Parent Set

export type FlexParentSetProps = DisplayProps &
  AlignItemsProps &
  AlignContentProps &
  JustifyItemsProps &
  JustifyContentProps &
  FlexFlowProps &
  FlexDirectionProps &
  FlexWrapProps

export type FlexParentSetStyle = DisplayStyle &
  AlignItemsStyle &
  AlignContentStyle &
  JustifyItemsStyle &
  JustifyContentStyle &
  FlexFlowStyle &
  FlexDirectionStyle &
  FlexWrapStyle

export const flexParentSet = compose<FlexParentSetProps, FlexParentSetStyle>({
  name: "flexParent",
  renderers: [
    display,
    alignItems,
    alignContent,
    justifyItems,
    justifyContent,
    flexFlow,
    flexDirection,
    flexWrap
  ]
})

// Flex Child Set

export type FlexChildSetProps = AlignSelfProps &
  JustifySelfProps &
  OrderProps &
  FlexProps &
  FlexBasisProps &
  FlexGrowProps &
  FlexShrinkProps

export type FlexChildSetStyle = AlignSelfStyle &
  JustifySelfStyle &
  OrderStyle &
  FlexStyle &
  FlexBasisStyle &
  FlexGrowStyle &
  FlexShrinkStyle

export const flexChildSet = compose<FlexChildSetProps, FlexChildSetStyle>({
  name: "flexChild",
  renderers: [
    alignSelf,
    justifySelf,
    order,
    flex,
    flexBasis,
    flexGrow,
    flexShrink
  ]
})

// Flex Set

export type FlexSetProps = FlexParentSetProps & FlexChildSetProps

export type FlexSetStyle = FlexParentSetStyle & FlexChildSetStyle

export const flexSet = compose<FlexSetProps, FlexSetStyle>({
  name: "flex",
  renderers: [flexParentSet, flexChildSet]
})
