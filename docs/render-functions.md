# Render Functions

Composed `render` functions follow the naming convention of ending in `Set` and appear in **bold** within the tables.

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

| Function Name | Props Keys        | Style Keys   | Theme Keys         | Transform |
| :------------ | :---------------- | :----------- | :----------------- | :-------- |
| border        | border, bd        | border       | borders            | addPx     |
| borderTop     | borderTop, bdt    | borderTop    | borders            | addPx     |
| borderRight   | borderRight, bdr  | borderRight  | borders            | addPx     |
| borderBottom  | borderBottom, bdb | borderBottom | borders            | addPx     |
| borderLeft    | borderLeft, bdl   | borderLeft   | borders            | addPx     |
| borderColor   | borderColor, bdc  | borderColor  | colors             | addPx     |
| borderStyle   | borderStyle, bds  | borderStyle  | borderStyles       | none      |
| borderWidth   | borderWidth, bdw  | borderWidth  | borderWidths       | addPx     |
| borderRadius  | borderRadius, rad | borderRadius | borderRadii, sizes | addPcOrPx |
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

| Function Name     | Props Keys                   | Style Keys     | Theme Keys | Transform |
| :---------------- | :--------------------------- | :------------- | :--------- | :-------- |
| **flexParentSet** | _all flex parent keys below_ |
| display           | display, d                   | display        | none       | none      |
| flexFlow          | flexFlow, fxf                | flexFlow       | none       | none      |
| flexDirection     | flexDirection, fxd           | flexDirection  | none       | none      |
| flexWrap          | flexWrap, fxw                | flexWrap       | none       | none      |
| alignItems        | alignItems, ali              | alignItems     | none       | none      |
| alignContent      | alignContent, alc            | alignContent   | none       | none      |
| justifyItems      | justifyItems, jfi            | justifyItems   | none       | none      |
| justifyContent    | justifyContent, jfc          | justifyContent | none       | none      |
| **flexChildSet**  | _all flex child keys below_  |
| flex              | flex, fx                     | flex           | none       | none      |
| flexBasis         | flexBasis, fxb               | flexBasis      | none       | none      |
| flexGrow          | flexGrow, fxg                | flexGrow       | none       | none      |
| flexShrink        | flexShrink, fxs              | flexShrink     | none       | none      |
| alignSelf         | alignSelf, als               | alignSelf      | none       | none      |
| justifySelf       | justifySelf, jfs             | justifySelf    | none       | none      |
| order             | order, ord                   | order          | none       | none      |
| **flexSet**       | _all keys above_             |

## Grid

| Function Name       | Props Keys                   | Style Keys          | Theme Keys | Transform |
| :------------------ | :--------------------------- | :------------------ | :--------- | :-------- |
| **gridParentSet**   | _all grid parent keys below_ |
| display             | display, d                   | display             | none       | none      |
| grid                | grid, g                      | grid                | none       | none      |
| gridTemplate        | gridTemplate, gt             | gridTemplate        | none       | none      |
| gridTemplateRows    | gridTemplateRows, gtr        | gridTemplateRows    | none       | none      |
| gridTemplateColumns | gridTemplateColumns, gtc     | gridTemplateColumns | none       | none      |
| gridTemplateAreas   | gridTemplateAreas, gta       | gridTemplateAreas   | none       | none      |
| gridGap             | gridGap, gg                  | gridGap             | spaces     | addPx     |
| gridRowGap          | gridRowGap, grg              | gridRowGap          | spaces     | addPx     |
| gridColumnGap       | gridColumnGap, gcg           | gridColumnGap       | spaces     | addPx     |
| gridAutoRows        | gridAutoRows, gar            | gridAutoRows        | none       | none      |
| gridAutoColumns     | gridAutoColumns, gac         | gridAutoColumns     | none       | none      |
| gridAutoFlow        | gridAutoFlow, gaf            | gridAutoFlow        | none       | none      |
| placeItems          | placeItems, pli              | placeItems          | none       | none      |
| placeContent        | placeContent, plc            | placeContent        | none       | none      |
| alignItems          | alignItems, ali              | alignItems          | none       | none      |
| alignContent        | alignContent, alc            | alignContent        | none       | none      |
| justifyItems        | justifyItems, jfi            | justifyItems        | none       | none      |
| justifyContent      | justifyContent, jfc          | justifyContent      | none       | none      |
| **gridChildSet**    | _all grid child keys below_  |
| gridArea            | gridArea, ga                 | gridArea            | none       | none      |
| gridRow             | gridRow, gr                  | gridRow             | none       | none      |
| gridRowStart        | gridRowStart, grs            | gridRowStart        | none       | none      |
| gridRowEnd          | gridRowEnd, gre              | gridRowEnd          | none       | none      |
| gridColumn          | gridColumn, gc               | gridColumn          | none       | none      |
| gridColumnStart     | gridColumnStart, gcs         | gridColumnStart     | none       | none      |
| gridColumnEnd       | gridColumnEnd, gce           | gridColumnEnd       | none       | none      |
| placeSelf           | placeSelf, pls               | placeSelf           | none       | none      |
| alignSelf           | alignSelf, als               | alignSelf           | none       | none      |
| justifySelf         | justifySelf, jfs             | justifySelf         | none       | none      |
| **gridSet**         | _all keys above_             |

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

## Transform

| Function Name     | Props Keys             | Style Keys        | Theme Keys | Transform |
| :---------------- | :--------------------- | :---------------- | :--------- | :-------- |
| perspective       | perspective, ps        | perspective       | none       | none      |
| perspectiveOrigin | perspectiveOrigin, pso | perspectiveOrigin | none       | none      |
| transform         | transform, tf          | transform         | none       | none      |
| transformOrigin   | transformOrigin, tfo   | transformOrigin   | none       | none      |
| **transformSet**  | _all keys above_       |

## Global

In addition to the `render` functions above, onno provides a `globalSet` which is _composed_ of:

- border
- borderRadius
- boxShadow
- colorSet
- opacity
- spaceSet
- sizeSet
- textSet
- transition

## Variant

| Function Name | Props Keys       | Theme Keys   | Renderers                                     |
| :------------ | :--------------- | :----------- | :-------------------------------------------- |
| colorStyle    | colorStyle, cst  | colorStyles  | colorSet                                      |
| textStyle     | textStyle, tst   | textStyles   | textSet                                       |
| buttonStyle   | buttonStyle, bst | buttonStyles | globalSet, colorStyle, textStyle              |
| globalStyle   | globalStyle, gst | globalStyles | globalSet, buttonStyle, colorStyle, textStyle |

### globalStyle

The `globalStyle` variant function defaults the `gst` prop to "." (a special root `path` string). Passing "." to the `gst` (or `globalStyle`) prop will result in the entire `globalStyles` theme object being transformed and returned.

This makes it very easy to add global styles from your `theme` using Styled Components' [`createGlobalStyle`][styled-components-global-styles] function or Emotion's [`Global`][emotion-global-styles] component:

```jsx
import { globalStyle } from "onno"
import theme from "./theme"

// Styled Components
import { createGlobalStyle } from "styled-components"
const Global = createGlobalStyle(globalStyle)
<Global theme={theme} />

// Emotion
import { Global } from "@emotion/core"
<Global style={globalStyle({ theme })} />
```

In the example above, the imported `theme` is being passed as a prop to Styled Component's `Global` component and within in a `props` object to Emotion's `Global` component `styles`

In practice, you will likely use the `ThemeProvider` for each respective library to pass the `theme` down to the `Global` component:

```jsx
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { globalStyle } from "onno"
import theme from "./theme"

const Global = createGlobalStyle(globalStyle)

<ThemeProvider theme={theme}>
  <Global />
</ThemeProvider>
```

The `globalStyle` variant function is the most sophisticated render function provided by onno. It is composed of numerous _standard_, _composed_ and _variant_ render functions as outlined in `renderers` column in the [table above](#variant). This allows you to reference design tokens such as `colors`, `fontFamilies` and `spaces` as well as other variant styles like `colorStyles` and `buttonStyles`. For example:

```jsx
const theme = {
  // Design Tokens
  colors: {
    gray: ["#444", "#888", "#CCC"],
    black: "#222",
    white: "ivory",
    brand: "coral"
  },
  fontFamilies: {
    main: "system-ui",
    code: "Monaco"
  },
  // Variant Styles
  textStyles: {
    caps: {
      fontWeight: "bold", // fontWeights.bold > default: 700
      textTransform: "uppercase"
    },
    code: {
      fontFamily: "code", // fontFamilies.code > "Monaco"
      fontSize: "85%"
    }
  },
  buttonStyles: {
    primary: {
      background: "brand", // colors.brand > "coral"
      color: "white", // colors.white > "ivory"
      textStyle: "caps" // textStyles.caps > { fontWeight: 700, textTransform: "uppercase" }
    },
    secondary: {
      // prop aliases
      bg: "gray.2", // colors.gray[2] > "#CCC"
      tc: "black", // colors.black > "#222",
      px: 4 // spaces[4] > default: "16px"
    }
  },
  globalStyles: {
    html: {
      fontSize: 2, // fontSizes[2] > default: "16px"
      fontFamily: "main", // fontFamilies.main > "system-ui"
      color: "black" // colors.black > "#222"
    },
    body: {
      bg: "white", // colors.white > "ivory"
      m: 0 // spaces[0] > default: 0
    },
    code: {
      textStyle: "code" // textStyles.code > { fontFamily: "Monaco", fontSize: "85%" }
    },
    button: {
      bst: "primary" // buttonStyles.primary > { background: "coral" ... }
    }
  }
}
```

[styled-components-global-styles]: https://www.styled-components.com/docs/api#createglobalstyle
[emotion-global-styles]: https://emotion.sh/docs/globals
