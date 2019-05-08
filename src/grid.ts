import * as C from "csstype"
import * as T from "./types"
import * as K from "./const"
import * as U from "./utils"
import * as S from "./style"
import * as A from "./align"
import * as D from "./display"

const ex = S.extend({
  themeKeys: ["spaces"],
  transform: U.addPx,
  fallback: K.PX_SCALE
})

// Grid

export type GridValue = C.GridProperty

export type GridProp = T.Prop<GridValue>

export interface GridProps extends T.ThemeProps {
  grid?: GridProp
  g?: GridProp
}

export interface GridStyle extends T.Style {
  grid: GridValue
}

export const grid = S.style<GridProps, GridStyle>({
  propsKeys: ["grid", "g"]
})

// Grid Template

export type GridTemplateValue = C.GridTemplateProperty

export type GridTemplateProp = T.Prop<GridTemplateValue>

export interface GridTemplateProps extends T.ThemeProps {
  gridTemplate?: GridTemplateProp
  gt?: GridTemplateProp
}

export interface GridTemplateStyle extends T.Style {
  gridTemplate: GridTemplateValue
}

export const gridTemplate = S.style<GridTemplateProps, GridTemplateStyle>({
  propsKeys: ["gridTemplate", "gt"]
})

// Grid Template Rows

export type GridTemplateRowsValue = C.GridTemplateRowsProperty<T.Length>

export type GridTemplateRowsProp = T.Prop<GridTemplateRowsValue>

export interface GridTemplateRowsProps extends T.ThemeProps {
  gridTemplateRows?: GridTemplateRowsProp
  gtr?: GridTemplateRowsProp
}

export interface GridTemplateRowsStyle extends T.Style {
  gridTemplateRows: GridTemplateRowsValue
}

export const gridTemplateRows = S.style<
  GridTemplateRowsProps,
  GridTemplateRowsStyle
>({
  propsKeys: ["gridTemplateRows", "gtr"]
})

// Grid Template Columns

export type GridTemplateColumnsValue = C.GridTemplateColumnsProperty<T.Length>

export type GridTemplateColumnsProp = T.Prop<GridTemplateColumnsValue>

export interface GridTemplateColumnsProps extends T.ThemeProps {
  gridTemplateColumns?: GridTemplateColumnsProp
  gtc?: GridTemplateColumnsProp
}

export interface GridTemplateColumnsStyle extends T.Style {
  gridTemplateColumns: GridTemplateColumnsValue
}

export const gridTemplateColumns = S.style<
  GridTemplateColumnsProps,
  GridTemplateColumnsStyle
>({
  propsKeys: ["gridTemplateColumns", "gtc"]
})

// Grid Template Areas

export type GridTemplateAreasValue = C.GridTemplateAreasProperty

export type GridTemplateAreasProp = T.Prop<GridTemplateAreasValue>

export interface GridTemplateAreasProps extends T.ThemeProps {
  gridTemplateAreas?: GridTemplateAreasProp
  gta?: GridTemplateAreasProp
}

export interface GridTemplateAreasStyle extends T.Style {
  gridTemplateAreas: GridTemplateAreasValue
}

export const gridTemplateAreas = S.style<
  GridTemplateAreasProps,
  GridTemplateAreasStyle
>({
  propsKeys: ["gridTemplateAreas", "gta"]
})

// Grid Gap

export type GridGapValue = C.GridGapProperty<T.Length>

export type GridGapProp = T.Prop<GridGapValue>

export interface GridGapProps extends T.ThemeProps {
  gridGap?: GridGapProp
  gg?: GridGapProp
}

export interface GridGapStyle extends T.Style {
  gridGap: GridGapValue
}

export const gridGap = ex<GridGapProps, GridGapStyle>({
  propsKeys: ["gridGap", "gg"]
})

// Grid Row Gap

export type GridRowGapValue = C.GridRowGapProperty<T.Length>

export type GridRowGapProp = T.Prop<GridRowGapValue>

export interface GridRowGapProps extends T.ThemeProps {
  gridRowGap?: GridRowGapProp
  grg?: GridRowGapProp
}

export interface GridRowGapStyle extends T.Style {
  gridRowGap: GridRowGapValue
}

export const gridRowGap = ex<GridRowGapProps, GridRowGapStyle>({
  propsKeys: ["gridRowGap", "grg"]
})

// Grid Column Gap

export type GridColumnGapValue = C.GridColumnGapProperty<T.Length>

export type GridColumnGapProp = T.Prop<GridColumnGapValue>

export interface GridColumnGapProps extends T.ThemeProps {
  gridColumnGap?: GridColumnGapProp
  gcg?: GridColumnGapProp
}

export interface GridColumnGapStyle extends T.Style {
  gridColumnGap: GridColumnGapValue
}

export const gridColumnGap = ex<GridColumnGapProps, GridColumnGapStyle>({
  propsKeys: ["gridColumnGap", "gcg"]
})

// Grid Auto Rows

export type GridAutoRowsValue = C.GridAutoRowsProperty<T.Length>

export type GridAutoRowsProp = T.Prop<GridAutoRowsValue>

export interface GridAutoRowsProps extends T.ThemeProps {
  gridAutoRows?: GridAutoRowsProp
  gar?: GridAutoRowsProp
}

export interface GridAutoRowsStyle extends T.Style {
  gridAutoRows: GridAutoRowsValue
}

export const gridAutoRows = S.style<GridAutoRowsProps, GridAutoRowsStyle>({
  propsKeys: ["gridAutoRows", "gar"]
})

// Grid Auto Columns

export type GridAutoColumnsValue = C.GridAutoColumnsProperty<T.Length>

export type GridAutoColumnsProp = T.Prop<GridAutoColumnsValue>

export interface GridAutoColumnsProps extends T.ThemeProps {
  gridAutoColumns?: GridAutoColumnsProp
  gac?: GridAutoColumnsProp
}

export interface GridAutoColumnsStyle extends T.Style {
  gridAutoColumns: GridAutoColumnsValue
}

export const gridAutoColumns = S.style<
  GridAutoColumnsProps,
  GridAutoColumnsStyle
>({
  propsKeys: ["gridAutoColumns", "gac"]
})

// Grid Auto Flow

export type GridAutoFlowValue = C.GridAutoFlowProperty

export type GridAutoFlowProp = T.Prop<GridAutoFlowValue>

export interface GridAutoFlowProps extends T.ThemeProps {
  gridAutoFlow?: GridAutoFlowProp
  gaf?: GridAutoFlowProp
}

export interface GridAutoFlowStyle extends T.Style {
  gridAutoFlow: GridAutoFlowValue
}

export const gridAutoFlow = S.style<GridAutoFlowProps, GridAutoFlowStyle>({
  propsKeys: ["gridAutoFlow", "gaf"]
})

// Grid Area

export type GridAreaValue = C.GridAreaProperty

export type GridAreaProp = T.Prop<GridAreaValue>

export interface GridAreaProps extends T.ThemeProps {
  gridArea?: GridAreaProp
  ga?: GridAreaProp
}

export interface GridAreaStyle extends T.Style {
  gridArea: GridAreaValue
}

export const gridArea = S.style<GridAreaProps, GridAreaStyle>({
  propsKeys: ["gridArea", "ga"]
})

// Grid Row

export type GridRowValue = C.GridRowProperty

export type GridRowProp = T.Prop<GridRowValue>

export interface GridRowProps extends T.ThemeProps {
  gridRow?: GridRowProp
  gr?: GridRowProp
}

export interface GridRowStyle extends T.Style {
  gridRow: GridRowValue
}

export const gridRow = S.style<GridRowProps, GridRowStyle>({
  propsKeys: ["gridRow", "gr"]
})

// Grid Row Start

export type GridRowStartValue = C.GridRowStartProperty

export type GridRowStartProp = T.Prop<GridRowStartValue>

export interface GridRowStartProps extends T.ThemeProps {
  gridRowStart?: GridRowStartProp
  grs?: GridRowStartProp
}

export interface GridRowStartStyle extends T.Style {
  gridRowStart: GridRowStartValue
}

export const gridRowStart = S.style<GridRowStartProps, GridRowStartStyle>({
  propsKeys: ["gridRowStart", "grs"]
})

// Grid Row End

export type GridRowEndValue = C.GridRowEndProperty

export type GridRowEndProp = T.Prop<GridRowEndValue>

export interface GridRowEndProps extends T.ThemeProps {
  gridRowEnd?: GridRowEndProp
  gre?: GridRowEndProp
}

export interface GridRowEndStyle extends T.Style {
  gridRowEnd: GridRowEndValue
}

export const gridRowEnd = S.style<GridRowEndProps, GridRowEndStyle>({
  propsKeys: ["gridRowEnd", "gre"]
})

// Grid Column

export type GridColumnValue = C.GridColumnProperty

export type GridColumnProp = T.Prop<GridColumnValue>

export interface GridColumnProps extends T.ThemeProps {
  gridColumn?: GridColumnProp
  gc?: GridColumnProp
}

export interface GridColumnStyle extends T.Style {
  gridColumn: GridColumnValue
}

export const gridColumn = S.style<GridColumnProps, GridColumnStyle>({
  propsKeys: ["gridColumn", "gc"]
})

// Grid Column Start

export type GridColumnStartValue = C.GridColumnStartProperty

export type GridColumnStartProp = T.Prop<GridColumnStartValue>

export interface GridColumnStartProps extends T.ThemeProps {
  gridColumnStart?: GridColumnStartProp
  gcs?: GridColumnStartProp
}

export interface GridColumnStartStyle extends T.Style {
  gridColumnStart: GridColumnStartValue
}

export const gridColumnStart = S.style<
  GridColumnStartProps,
  GridColumnStartStyle
>({
  propsKeys: ["gridColumnStart", "gcs"]
})

// Grid Column End

export type GridColumnEndValue = C.GridColumnEndProperty

export type GridColumnEndProp = T.Prop<GridColumnEndValue>

export interface GridColumnEndProps extends T.ThemeProps {
  gridColumnEnd?: GridColumnEndProp
  gce?: GridColumnEndProp
}

export interface GridColumnEndStyle extends T.Style {
  gridColumnEnd: GridColumnEndValue
}

export const gridColumnEnd = S.style<GridColumnEndProps, GridColumnEndStyle>({
  propsKeys: ["gridColumnEnd", "gce"]
})

// Grid Parent Set

export type GridParentSetProps = D.DisplayProps &
  A.PlaceItemsProps &
  A.PlaceContentProps &
  A.AlignItemsProps &
  A.AlignContentProps &
  A.JustifyItemsProps &
  A.JustifyContentProps &
  GridProps &
  GridTemplateProps &
  GridTemplateRowsProps &
  GridTemplateColumnsProps &
  GridTemplateAreasProps &
  GridGapProps &
  GridRowGapProps &
  GridColumnGapProps &
  GridAutoRowsProps &
  GridAutoColumnsProps &
  GridAutoFlowProps

export type GridParentSetStyle = D.DisplayStyle &
  A.PlaceItemsStyle &
  A.PlaceContentStyle &
  A.AlignItemsStyle &
  A.AlignContentStyle &
  A.JustifyItemsStyle &
  A.JustifyContentStyle &
  GridStyle &
  GridTemplateStyle &
  GridTemplateRowsStyle &
  GridTemplateColumnsStyle &
  GridTemplateAreasStyle &
  GridGapStyle &
  GridRowGapStyle &
  GridColumnGapStyle &
  GridAutoRowsStyle &
  GridAutoColumnsStyle &
  GridAutoFlowStyle

export const gridParentSet = S.compose<GridParentSetProps, GridParentSetStyle>([
  D.display,
  A.placeItems,
  A.placeContent,
  A.alignItems,
  A.alignContent,
  A.justifyItems,
  A.justifyContent,
  grid,
  gridTemplate,
  gridTemplateRows,
  gridTemplateColumns,
  gridTemplateAreas,
  gridGap,
  gridRowGap,
  gridColumnGap,
  gridAutoRows,
  gridAutoColumns,
  gridAutoFlow
])

// Grid Child Set

export type GridChildSetProps = A.PlaceSelfProps &
  A.AlignSelfProps &
  A.JustifySelfProps &
  GridAreaProps &
  GridRowProps &
  GridRowStartProps &
  GridRowEndProps &
  GridColumnProps &
  GridColumnStartProps &
  GridColumnEndProps

export type GridChildSetStyle = A.PlaceSelfStyle &
  A.AlignSelfStyle &
  A.JustifySelfStyle &
  GridAreaStyle &
  GridRowStyle &
  GridRowStartStyle &
  GridRowEndStyle &
  GridColumnStyle &
  GridColumnStartStyle &
  GridColumnEndStyle

export const gridChildSet = S.compose<GridChildSetProps, GridChildSetStyle>([
  A.placeSelf,
  A.alignSelf,
  A.justifySelf,
  gridArea,
  gridRow,
  gridRowStart,
  gridRowEnd,
  gridColumn,
  gridColumnStart,
  gridColumnEnd
])

// Grid Set

export type GridSetProps = GridParentSetProps & GridChildSetProps

export type GridSetStyle = GridParentSetStyle & GridChildSetStyle

export const gridSet = S.compose<GridSetProps, GridSetStyle>([
  gridParentSet,
  gridChildSet
])
