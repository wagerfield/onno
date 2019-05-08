# Styles

Composition functions follow the naming convention of ending in `Set` and appear in **bold** within the tables below.

## Animation

| Function Name | Props Keys | Style Keys | Theme Keys  | Transform |
| :------------ | :--------- | :--------- | :---------- | :-------- |
| animation     | animation  | animation  | animations  | none      |
| transition    | transition | transition | transitions | none      |

## Background

| Function Name      | Props Keys              | Style Keys         | Theme Keys | Transform |
| :----------------- | :---------------------- | :----------------- | :--------- | :-------- |
| background         | background, bg          | background         | colors     | none      |
| backgroundColor    | backgroundColor, bgc    | backgroundColor    | colors     | none      |
| backgroundImage    | backgroundImage, bgi    | backgroundImage    | none       | none      |
| backgroundPosition | backgroundPosition, bgp | backgroundPosition | none       | addPcOrPx |
| backgroundRepeat   | backgroundRepeat, bgr   | backgroundRepeat   | none       | none      |
| backgroundSize     | backgroundSize, bgs     | backgroundSize     | none       | addPcOrPx |
| **backgroundSet**  | _all keys above_        |

## Border

| Function Name | Props Keys        | Style Keys   | Theme Keys   | Transform |
| :------------ | :---------------- | :----------- | :----------- | :-------- |
| border        | border, bd        | border       | borders      | addPx     |
| borderTop     | borderTop, bdt    | borderTop    | borders      | addPx     |
| borderRight   | borderRight, bdr  | borderRight  | borders      | addPx     |
| borderBottom  | borderBottom, bdb | borderBottom | borders      | addPx     |
| borderLeft    | borderLeft, bdl   | borderLeft   | borders      | addPx     |
| borderColor   | borderColor, bdc  | borderColor  | colors       | addPx     |
| borderStyle   | borderStyle, bds  | borderStyle  | borderStyles | none      |
| borderWidth   | borderWidth, bdw  | borderWidth  | borderWidths | addPx     |
| borderRadius  | borderRadius, rad | borderRadius | borderRadii  | addPcOrPx |
| **borderSet** | _all keys above_  |

## Color

| Function Name   | Props Keys           | Style Keys      | Theme Keys | Transform |
| :-------------- | :------------------- | :-------------- | :--------- | :-------- |
| background      | background, bg       | background      | colors     | none      |
| backgroundColor | backgroundColor, bgc | backgroundColor | colors     | none      |
| borderColor     | borderColor, bdc     | borderColor     | colors     | none      |
| color           | color, tc            | color           | colors     | none      |
| **colorSet**    | _all keys above_     |

## Display

| Function Name   | Props Keys                | Style Keys | Theme Keys | Transform |
| :-------------- | :------------------------ | :--------- | :--------- | :-------- |
| display         | display, d                | display    | none       | none      |
| opacity         | opacity, o                | opacity    | opacities  | none      |
| visibility      | visibility, vis           | visibility | none       | none      |
| **overflowSet** | _all overflow keys below_ |
| overflow        | overflow, of              | overflow   | none       | none      |
| overflowX       | overflowX, ofx            | overflowX  | none       | none      |
| overflowY       | overflowY, ofy            | overflowY  | none       | none      |
| **displaySet**  | _all keys above_          |

## Flex

| Function Name     | Props Keys              | Style Keys     | Theme Keys | Transform |
| :---------------- | :---------------------- | :------------- | :--------- | :-------- |
| **flexParentSet** | _all parent keys below_ |
| display           | display, d              | display        | none       | none      |
| flexFlow          | flexFlow, fxf           | flexFlow       | none       | none      |
| flexDirection     | flexDirection, fxd      | flexDirection  | none       | none      |
| flexWrap          | flexWrap, fxw           | flexWrap       | none       | none      |
| alignItems        | alignItems, ali         | alignItems     | none       | none      |
| alignContent      | alignContent, alc       | alignContent   | none       | none      |
| justifyItems      | justifyItems, jfi       | justifyItems   | none       | none      |
| justifyContent    | justifyContent, jfc     | justifyContent | none       | none      |
| **flexChildSet**  | _all child keys below_  |
| flex              | flex, fx                | flex           | none       | none      |
| flexBasis         | flexBasis, fxb          | flexBasis      | none       | none      |
| flexGrow          | flexGrow, fxg           | flexGrow       | none       | none      |
| flexShrink        | flexShrink, fxs         | flexShrink     | none       | none      |
| alignSelf         | alignSelf, als          | alignSelf      | none       | none      |
| justifySelf       | justifySelf, jfs        | justifySelf    | none       | none      |
| order             | order, ord              | order          | none       | none      |
| **flexSet**       | _all keys above_        |

## Grid

| Function Name       | Props Keys               | Style Keys          | Theme Keys | Transform |
| :------------------ | :----------------------- | :------------------ | :--------- | :-------- |
| **gridParentSet**   | _all parent keys below_  |
| display             | display, d               | display             | none       | none      |
| grid                | grid, g                  | grid                | none       | none      |
| gridTemplate        | gridTemplate, gt         | gridTemplate        | none       | none      |
| gridTemplateRows    | gridTemplateRows, gtr    | gridTemplateRows    | none       | none      |
| gridTemplateColumns | gridTemplateColumns, gtc | gridTemplateColumns | none       | none      |
| gridTemplateAreas   | gridTemplateAreas, gta   | gridTemplateAreas   | none       | none      |
| gridGap             | gridGap, gg              | gridGap             | spaces     | addPx     |
| gridRowGap          | gridRowGap, grg          | gridRowGap          | spaces     | addPx     |
| gridColumnGap       | gridColumnGap, gcg       | gridColumnGap       | spaces     | addPx     |
| gridAutoRows        | gridAutoRows, gar        | gridAutoRows        | none       | none      |
| gridAutoColumns     | gridAutoColumns, gac     | gridAutoColumns     | none       | none      |
| gridAutoFlow        | gridAutoFlow, gaf        | gridAutoFlow        | none       | none      |
| placeItems          | placeItems, pli          | placeItems          | none       | none      |
| placeContent        | placeContent, plc        | placeContent        | none       | none      |
| alignItems          | alignItems, ali          | alignItems          | none       | none      |
| alignContent        | alignContent, alc        | alignContent        | none       | none      |
| justifyItems        | justifyItems, jfi        | justifyItems        | none       | none      |
| justifyContent      | justifyContent, jfc      | justifyContent      | none       | none      |
| **gridChildSet**    | _all child keys below_   |
| gridArea            | gridArea, ga             | gridArea            | none       | none      |
| gridRow             | gridRow, gr              | gridRow             | none       | none      |
| gridRowStart        | gridRowStart, grs        | gridRowStart        | none       | none      |
| gridRowEnd          | gridRowEnd, gre          | gridRowEnd          | none       | none      |
| gridColumn          | gridColumn, gc           | gridColumn          | none       | none      |
| gridColumnStart     | gridColumnStart, gcs     | gridColumnStart     | none       | none      |
| gridColumnEnd       | gridColumnEnd, gce       | gridColumnEnd       | none       | none      |
| placeSelf           | placeSelf, pls           | placeSelf           | none       | none      |
| alignSelf           | alignSelf, als           | alignSelf           | none       | none      |
| justifySelf         | justifySelf, jfs         | justifySelf         | none       | none      |
| **gridSet**         | _all keys above_         |

## Layout

| Function Name   | Props Keys                | Style Keys    | Theme Keys        | Transform |
| :-------------- | :------------------------ | :------------ | :---------------- | :-------- |
| display         | display, d                | display       | none              | none      |
| verticalAlign   | verticalAlign, va         | verticalAlign | none              | none      |
| **positionSet** | _all position keys below_ |
| position        | position, pos             | position      | none              | none      |
| zIndex          | zIndex, zi                | zIndex        | zIndices          | none      |
| top             | top, t                    | top           | sizes             | addPcOrPx |
| right           | right, r                  | right         | sizes             | addPcOrPx |
| bottom          | bottom, b                 | bottom        | sizes             | addPcOrPx |
| left            | left, l                   | left          | sizes             | addPcOrPx |
| **sizeSet**     | _all size keys below_     |
| size            | size, s                   | width, height | sizes             | addPcOrPx |
| width           | width, w                  | width         | widths, sizes     | addPcOrPx |
| minWidth        | minWidth, minw            | minWidth      | minWidths, sizes  | addPcOrPx |
| maxWidth        | maxWidth, maxw            | maxWidth      | maxWidths, sizes  | addPcOrPx |
| height          | height, h                 | height        | heights, sizes    | addPcOrPx |
| minHeight       | minHeight, minh           | minHeight     | minHeights, sizes | addPcOrPx |
| maxHeight       | maxHeight, maxh           | maxHeight     | maxHeights, sizes | addPcOrPx |
| **layoutSet**   | _all keys above_          |

## Shadow

| Function Name | Props Keys      | Style Keys | Theme Keys  | Transform |
| :------------ | :-------------- | :--------- | :---------- | :-------- |
| boxShadow     | boxShadow, bsh  | boxShadow  | boxShadows  | none      |
| textShadow    | textShadow, tsh | textShadow | textShadows | none      |

## Space

| Function Name  | Props Keys               | Style Keys                | Theme Keys | Transform |
| :------------- | :----------------------- | :------------------------ | :--------- | :-------- |
| **marginSet**  | _all margin keys below_  |
| marginTop      | marginTop, mt            | marginTop                 | spaces     | addPx     |
| marginRight    | marginRight, mr          | marginRight               | spaces     | addPx     |
| marginBottom   | marginBottom, mb         | marginBottom              | spaces     | addPx     |
| marginLeft     | marginLeft, ml           | marginLeft                | spaces     | addPx     |
| marginX        | marginX, mx              | marginLeft, marginRight   | spaces     | addPx     |
| marginY        | marginY, my              | marginTop, marginBottom   | spaces     | addPx     |
| margin         | margin, m                | margin                    | spaces     | addPx     |
| **paddingSet** | _all padding keys below_ |
| paddingTop     | paddingTop, pt           | paddingTop                | spaces     | addPx     |
| paddingRight   | paddingRight, pr         | paddingRight              | spaces     | addPx     |
| paddingBottom  | paddingBottom, pb        | paddingBottom             | spaces     | addPx     |
| paddingLeft    | paddingLeft, pl          | paddingLeft               | spaces     | addPx     |
| paddingX       | paddingX, px             | paddingLeft, paddingRight | spaces     | addPx     |
| paddingY       | paddingY, py             | paddingTop, paddingBottom | spaces     | addPx     |
| padding        | padding, p               | padding                   | spaces     | addPx     |
| **spaceSet**   | _all keys above_         |

## Text

| Function Name  | Props Keys         | Style Keys     | Theme Keys     | Transform |
| :------------- | :----------------- | :------------- | :------------- | :-------- |
| fontFamily     | fontFamily, ff     | fontFamily     | fontFamilies   | none      |
| fontSize       | fontSize, fs       | fontSize       | fontSizes      | addPx     |
| fontStyle      | fontStyle, fst     | fontStyle      | none           | none      |
| fontWeight     | fontWeight, fw     | fontWeight     | fontWeights    | none      |
| lineHeight     | lineHeight, lh     | lineHeight     | lineHeights    | none      |
| letterSpacing  | letterSpacing, ls  | letterSpacing  | letterSpacings | addPx     |
| textAlign      | textAlign, ta      | textAlign      | none           | none      |
| textDecoration | textDecoration, td | textDecoration | none           | none      |
| textTransform  | textTransform, tt  | textTransform  | none           | none      |
| color          | color, tc          | color          | colors         | none      |
| **textSet**    | _all keys above_   |
