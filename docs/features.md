# Rationale

Onno was heavily inspired by [Styled System][styled-system]. A lot of the ideas are owed to the brilliant work of [Brent Jackson][jxnblk] and the [numerous contributors][styled-system-contributors] to this library.

Truth be told, onno actually started life as a rewrite of Styled System in TypeScript following a [discussion on GitHub][styled-system-comment]. However during the course of this rewrite, a number of new ideas, features and refinements to the API were introduced that eventually warranted another library.

## Features

Below are a list of additional features and alterations to Styled System's API that have been introduced into onno.

### `props` keys as an array

Styled System's [`style`][styled-system-api-style] function allows you to provide both a `prop` key and optional `alias` key for the render function to map values from. Onno takes this one step further by consolidating these two option keys into a `propsKeys` array which allows you to specify as many aliases as you like while also enforcing an order of precedence for them. For example:

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

### `style` keys as an array

Styled System provides a `cssProperty` option to map a `prop` key to different CSS property. If the `cssProperty` is omitted, the `prop` key is used by default. This works well for one-to-one key mappings, but does not support one-to-many key mappings.

In some cases you need to map a `prop` key value to multiple `style` keys. Such examples of this are a `size` prop that maps to `width` and `height` style keys or a `marginX` prop that maps to `marginLeft` and `marginRight` style keys. Onno's `styleKeys` option supports this behaviour:

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
```

Much like Styled System, if you omit the `styleKeys` option then it defaults to an array containing _just_ the first key in the `propsKeys` array.

### `theme` keys as an array

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

const Box = styled.div(size, width)

const theme = {
  sizes: ["100px", "200px", "400px"],
  widths: ["80px", "160px"]
}

// [{ width: "100px", height: "100px" }, { width: "160px" }]
<Box theme={theme} size={0} width={1} />

// [{ width: "200px", height: "200px" }, { width: "400px" }]
<Box theme={theme} s={1} w={2} />
```

The second `Box` provides a `width` prop value of "2" which falls outside the `widths` array in the `theme`. Since the `width` render function specifies two `themeKeys` of "widths" and "sizes" the resolver then moves onto the `sizes` key in the `theme` where it is able to resolve a value of "400px" at that location.

### Serialisable Themes

It is good practice to define a `theme` or facets of a theme in a serialisable data structure such as JSON. Doing so facilitates greater portability between languages and platforms. This is how companies like [GitHub][github-primer-primitives] organise their design tokens.

When working with arrays of values in a `theme` (Styled System refers to these as `scales`) the only way to retrieve values from them is via an index. For large arrays of values, this can make it difficult to keep track of which index you require for a particular value and often leads to counting along the array with your finger or writing lookup tables. Further problems arise when values are added or removed from the array causing indexes to resolve to different values.

Styled System's approach to the first problem is to create aliases for indexes by adding string keys to the array _after_ it has been created and assigning them to values in the array. Though this approach works in JavaScript, it does not lend itself to serialisation. Furthermore, TypeScript disallows string index signatures on arrays.

To address this problem, onno introduces "alias objects" which allow you to lookup values in an array using both an `index` and a string `alias` key. An alias object takes this form of `{ alias, value }`.

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

Internally onno uses this `get` method to resolve all `theme` and `defaults` values allowing you to use alias objects everywhere.

### Dot syntax for `props` _and_ `themeKeys`

Styled System supports dot syntax for both `prop` values and theme `key` options. This allows you to lookup values in nested objects and arrays within a `theme` and/or default `scale`.

Onno also supports dot syntax for `prop` values _and_ `themeKeys` while also resolving alias objects within arrays. This flexible interface allows you to structure and nest your `theme` however you so choose.

In addition to this, onno also supports value inversion simply by prefixing the whole lookup path with a negative sign ("-") _or_ the final segment of a path. For example:

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

[jxnblk]: https://jxnblk.com
[styled-system]: https://styled-system.com
[styled-system-comment]: https://github.com/styled-system/styled-system/issues/463#issuecomment-487167817
[styled-system-contributors]: https://github.com/styled-system/styled-system/graphs/contributors
[styled-system-api-style]: https://styled-system.com/api/#style
[github-primer-primitives]: https://github.com/primer/primitives
