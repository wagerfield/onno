# Rationale <!-- omit in toc -->

Onno is an iteration of [Styled System][styled-system] rewritten in [TypeScript][typescript] from the ground up. A lot of the ideas are owed to the brilliant work of [Brent Jackson][jxnblk] and the [numerous contributors][styled-system-contributors] to this library. Credit is also due to [Emotion's facepaint][emotion-facepaint] for the original ideas behind responsive props.

Onno actually started life as a rewrite of Styled System in [TypeScript][typescript] following a [discussion on GitHub][styled-system-comment]. However during the course of this rewrite, a number of new ideas, features and refinements to Styled System's API were introduced that eventually warranted another library.

## Features <!-- omit in toc -->

Below is a list of additional features and refinements to Styled System's API that have been introduced by onno.

- [Framework Agnostic](#framework-agnostic)
- [TypeScript](#typescript)
- [Props keys as an array](#props-keys-as-an-array)
- [Style keys as an array](#style-keys-as-an-array)
- [Theme keys as an array](#theme-keys-as-an-array)
- [Serializable Themes](#serializable-themes)
- [Dot syntax for `props` and `themeKeys`](#dot-syntax-for-props-and-themekeys)
- [Naming Conventions](#naming-conventions)

### Framework Agnostic

Styled System is designed to work with [React][react]. It has a dependency on `prop-types` (a library for defining runtime type checks on React props) and provides `propTypes` for each of its render functions. It works in harmony with [Styled Components][styled-components] (a React-only CSS in JS library) as well as [Emotion's `styled` API][emotion-styled-components] which maintains a close parity with Styled Components.

The key difference between Emotion and Style Components is that [Emotion is framework agnostic][emotion-framework-agnostic] at its core. And it's not alone. Many other popular [CSS in JS][css-in-js] libraries like [JSS][jss], [Aphrodite][aphrodite], [Glamor][glamor] and [Fela][fela] can also be used with other popular frameworks like [Vue][vue] and [Angular][angular].

As a developer who works with React _and_ Vue in equal measure, picking libraries that are framework agnostic is _desireable_—if not a _requirement_. While developing onno, it was _essential_ that it could be used with any framework to facilitate code reuse between component libraries implemented in React, Vue, Angular et al.

Onno was therefore designed with an interface for providing framework specific integrations like `propTypes` for React. Currently there are extensions of `onno` for React (`onno-react`) and Vue (`onno-vue`) that provide `propTypes` and `props` for these respective frameworks. In the future, additional extensions can eaisly be added for other frameworks if the demand is there.

```jsx
import styled from "styled-components"
import { display } from "onno-react"

const Box = styled.div(display)

Box.propTypes = {
  ...display.propTypes
}
```

### TypeScript

Onno is written in TypeScript and ships with a comprehensive set of `type` definitions and `interfaces`. Furthermore it uses `csstype` for all included render functions to type check the values passed to `props`. Type checking is performed on both _standard_ and _responsive_ prop values as well as `defaultProps` when used with React. For example:

```tsx
import styled from "styled-components"
import { display, flexDirection } from "onno"

const Box = styled.div(display, flexDirection)

Box.defaultProps = {
  display: "flex",
  flexDirection: "foo" // Type "foo" is not assignable to type "Prop<FlexDirectionProperty>"
}
```

Furthermore, onno provides a `Theme` interface with all `themeKeys` that are declared across the suite of [render functions](render-functions.md). This makes writing themes a breeze since you get both autocompletion and type checking out of the box:

```ts
import { Theme } from "onno"

export const theme: Theme = {
  breakpoints: [
    { alias: "xs", value: 0 },
    { alias: "sm", value: 256 },
    { alias: "md", value: 512 },
    { alias: "lg", value: 768 },
    { alias: "xl", value: 1024 }
  ],
  maxWidths: [256, 512, 768, 1024]
}
```

To add your own `themeKeys`, simply create an interface that `extends` from `Theme`.

### Props keys as an array

Styled System's [`style`][styled-system-api-style] function allows you to specify both a `prop` key and optional `alias` for the render function to map values from. Onno takes this one step further by consolidating these two options into a `propsKeys` array which allows you to specify as many aliases as you like, while also enforcing an order of precedence for them. For example:

```jsx
import styled from "styled-system"
import { style } from "onno"

const fontFamily = style({
  propsKeys: ["fontFamily", "font", "ff", "f"]
})

const Text = styled.div(fontFamily)

// [{ fontFamily: "Roboto" }]
<Text fontFamily="Roboto" />

// [{ fontFamily: "Helvetica" }]
<Text font="Helvetica" />

// [{ fontFamily: "Lobster" }]
<Text ff="Lobster" />

// [{ fontFamily: "Monaco" }]
<Text f="Monaco" />

// [{ fontFamily: "Roboto" }]
// The "fontFamily" prop has the highest order of precedence
<Text f="Monaco" fontFamily="Roboto" ff="Lobster" font="Helvetica" />
```

### Style keys as an array

Styled System provides a `cssProperty` option to map a `prop` key to a different CSS property. If the `cssProperty` option is omitted, the `prop` key is used by default. This works well for one-to-one key maps, but does not support one-to-many key maps.

In some cases you need to map a `prop` value to multiple `style` keys. Examples of this are the `size` prop that maps to `width` and `height` style keys and the `marginX` prop that maps to `marginLeft` and `marginRight` style keys. Onno's `styleKeys` option supports this functionality:

```jsx
import styled from "styled-system"
import { style } from "onno"

const font = style({
  propsKeys: ["font", "f"],
  styleKeys: ["fontFamily"]
})

const size = style({
  propsKeys: ["size", "s"],
  styleKeys: ["width", "height"]
})

const Box = styled.div(font, size)

// [{ fontFamily: "Monaco" }, { width: "100px", height: "100px" }]
<Box font="Monaco" size="100px" />

// [{ fontFamily: "Roboto" }, { width: "50%", height: "50%" }]
<Box f="Roboto" s="50%" />
```

Much like Styled System, if you omit the `styleKeys` option then it defaults to an array containing _just_ the first key in the `propsKeys` array. This is the desired behaviour for the majority of one-to-one key maps like `display`, `backgroundColor`, `fontSize` etc.

### Theme keys as an array

Styled System provides a `key` option for specifying a "lookup" location in a `theme` object. This mechanism allows you to share common styles and design tokens between your render functions and the components using them.

Onno takes this one step further by upgrading a single theme `key` to an array of `themeKeys`. In doing so, you can create powerful render functions that resolve values from multiple locations in a `theme` by cascading through them in order of precedence. For example:

```jsx
import styled from "styled-system"
import { style } from "onno"

const size = style({
  propsKeys: ["size", "s"],
  styleKeys: ["width", "height"],
  themeKeys: ["sizes"]
})

const width = style({
  propsKeys: ["width", "w"],
  themeKeys: ["widths", "sizes"]
})

const theme = {
  sizes: ["100px", "200px", "400px"],
  widths: ["80px", "160px"]
}

const Box = styled.div(size, width)

// [{ width: "100px", height: "100px" }, { width: "160px" }]
<Box theme={theme} size={0} width={1} />

// [{ width: "200px", height: "200px" }, { width: "400px" }]
<Box theme={theme} s={1} w={2} />
```

The second `Box` provides a `width` prop value of "2" which falls outside the `widths` array in the `theme`. Since the `width` render function specifies two `themeKeys` of "widths" and "sizes" the resolver then moves onto the `sizes` key in the `theme` where it is able to resolve a value of "400px" at that location.

If the `theme` did not have a `widths` array then the `sizes` array would be used to resolve values for both render functions.

### Serializable Themes

It is good practice to define a `theme` _or facets of a theme_ in a serializable data structure such as JSON. Doing so facilitates the portability of design tokens between languages and platforms. This is how companies like [GitHub][github-primer-primitives] organise their design tokens.

When working with arrays of values in a `theme` (Styled System refers to these as "scales") the only way to retrieve values from them is via an index. For large arrays of values, this can make it difficult to keep track of which index you require for a particular value and often leads to counting through the array with your finger. Further problems arise when values are added or removed from the array causing indexes to resolve to different values.

Styled System's solution to the first problem is to create aliases for indexes by adding string keys to an array of values _after_ it has been created and assigning them to values within the array. Though this approach works in JavaScript, it does not lend itself to serialization and cannot be described with JSON. In addition to this, TypeScript disallows string index signatures on arrays.

To address this problem, onno introduces "alias objects" which support array value lookups using both an `index` and a string `alias`. An alias object takes this form of `{ alias, value }`. This solution lends itself to serialization while also tackling the issue of adding, removing and reordering items in an array (as long as you are referencing the values via the `alias` of course).

For example, a `theme` written in JSON using alias objects in an array would look like this:

```json
{
  "sizes": [
    {
      "alias": "sm",
      "value": 16
    },
    {
      "alias": "md",
      "value": 32
    },
    {
      "alias": "lg",
      "value": 64
    }
  ]
}
```

Using onno's internal `get` utility, you can retrieve the second value in the `sizes` array by doing:

```js
import { get } from "onno"
import theme from "./theme.json"

const a = get("sizes.1", theme) // 32
const b = get("sizes.md", theme) // 32
```

Internally onno uses the `get` method to resolve all `theme` and `defaults` values allowing you to use alias objects throughout your design system. Internally onno uses alias objects for the default `breakpoints` array:

```json
{
  "breakpoints": [
    { "alias": "xs", "value": 0 },
    { "alias": "sm", "value": 360 },
    { "alias": "md", "value": 720 },
    { "alias": "lg", "value": 1080 },
    { "alias": "xl", "value": 1440 }
  ]
}
```

Declaring `breakpoints` as alias objects allows responsive props to use both array and object value maps:

```jsx
import styled from "styled-system"
import { style } from "onno"

const width = style({
  propsKeys: ["width", "w"]
})

const Box = styled.div(width)

// [
//   { "@media(min-width: 0)":     { width: "100%" } },
//   { "@media(min-width: 720px)": { width: "50%"  } }
// ]
<Box theme={theme} width={[ "100%", null, "50%" ]} />

// [
//   { "@media(min-width: 0)":     { width: "100%" } },
//   { "@media(min-width: 720px)": { width: "50%"  } }
// ]
<Box theme={theme} width={{ xs: "100%", md: "50%" }} />
```

### Dot syntax for `props` and `themeKeys`

Styled System supports dot syntax for both `prop` values and theme `key` options. This allows you to lookup values in nested objects and arrays within a `theme` and/or the default `scale` of a render function.

Onno also supports dot syntax for `prop` values _and_ `themeKeys` while also resolving alias objects within arrays. This flexible interface allows you to structure and nest your `theme` however you so choose.

In addition to this, onno also supports value inversion simply by prefixing the whole lookup path with a negative sign "-" _or_ the final segment of a path. For example:

```jsx
import styled from "styled-system"
import { addPx, style } from "onno"

const width = style({
  propsKeys: ["width", "w"],
  transform: addPx,
  defaults: {
    small: [2, 4, 8, 16, 32],
    large: [20, 40, 80, 160, 320]
  }
})

const Box = styled.div(width)

// [{ width: "8px" }]
<Box width="small.2" />

// [{ width: "-32px" }]
<Box width="-small.4" />

// [{ width: "20px" }]
<Box w="large.0" />

// [{ width: "-40px" }]
<Box w="large.-1" />
```

### Naming Conventions

A number of naming conventions have been introduced to onno to enforce consistency and predictability.

1. All _standard_ render functions have the same name as the CSS property they are rendering eg. `fontSize` and `textAlign`.
   - The only exception to this rule are the special render functions that map a `prop` to multiple style keys eg. `marginX`, `marginY`, `paddingX`, `paddingY` and `size`
   - Styled System adopts this convention for all functions par `color` which is a composition of the `textColor` and `backgroundColor` functions.
   - To adhere to the aforementioned convention, onno's `color` function simply renders the text `color` property. It is _not_ a composed function like in Styled System.
2. All _standard_ render functions provide `propsKeys` aliases with the following naming conventions:
   - `background` prop aliases start with `bg`
   - `border` prop aliases start with `bd`
   - `overflow` prop aliases start with `of`
   - `flex` prop aliases start with `fx`
   - `grid` prop aliases start with `g`
   - `place` prop aliases start with `pl`
   - `align` prop aliases start with `al`
   - `justify` prop aliases start with `jf`
   - `margin` prop aliases start with `m`
   - `padding` prop aliases start with `p`
   - `font` prop aliases start with `f`
   - `text` prop aliases start with `t`
   - `shadow` prop aliases end with `sh`
   - `variant` prop aliases end with `st`
3. All _composed_ render functions follow the convention of ending in "Set" eg. `colorSet` and `spaceSet`
   - This convention creates a distinction between _standard_ and _composed_ render functions and circumvents naming collisions such as `border` (the shorthand CSS property) and `borderSet` (a composition of all the border related render functions)
   - With reference to point 1, all _color_ related render functions (`color`, `backgroundColor` and `borderColor`) are composed into a `colorSet` render function.
   - Both `flex` and `grid` render functions are organised into a `ParentSet`, `ChildSet` and complete `Set` which contains both. Eg. `flexParentSet`, `flexChildSet` and `flexSet`.
4. All `theme` keys follow a plural naming convention and use the same name as the _standard_ or _composed_ render functions. The key differences between Styled System and onno are as follows:
   - `fonts` > `fontFamilies`
   - `space` > `spaces`
   - `radii` > `borderRadii`
   - `shadows` > `boxShadows` (onno also has `textShadows`)
   - `buttons` > `buttonStyles`
5. All _variant_ render functions end in "Style" eg. `buttonStyle` and `colorStyle`.
   - The theme keys follow the convention of ending in "Styles" eg. `buttonStyles` and `colorStyles`

[vue]: https://vuejs.org
[react]: https://reactjs.org
[angular]: https://angularjs.org
[typescript]: https://www.typescriptlang.org
[styled-system]: https://styled-system.com
[styled-system-comment]: https://github.com/styled-system/styled-system/issues/463#issuecomment-487167817
[styled-system-contributors]: https://github.com/styled-system/styled-system/graphs/contributors
[styled-system-api-style]: https://styled-system.com/api/#style
[styled-components]: https://www.styled-components.com
[emotion-styled-components]: https://emotion.sh/docs/styled
[emotion-framework-agnostic]: https://emotion.sh/docs/introduction#framework-agnostic
[emotion-facepaint]: https://github.com/emotion-js/facepaint
[github-primer-primitives]: https://github.com/primer/primitives
[css-in-js]: https://github.com/tuchk4/awesome-css-in-js
[aphrodite]: https://github.com/Khan/aphrodite
[glamor]: https://github.com/threepointone/glamor
[fela]: http://fela.js.org
[jss]: https://cssinjs.org
[jxnblk]: https://jxnblk.com
