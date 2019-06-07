# Utils<!-- omit in toc -->

Onno uses a number of utility functions internally to resolve, query and transform values.

These functions can be useful for when you create your own transform functions or component style sets.

## Table of Contents<!-- omit in toc -->

- [`isNil`](#isnil)
- [`isUndefined`](#isundefined)
- [`isType`](#istype)
- [`isArray`](#isarray)
- [`isNumber`](#isnumber)
- [`isObject`](#isobject)
- [`isPlainObject`](#isplainobject)
- [`isString`](#isstring)
- [`isUnitless`](#isunitless)
- [`isFraction`](#isfraction)
- [`when`](#when)
- [`addPx`](#addpx)
- [`addPc`](#addpc)
- [`addRem`](#addrem)
- [`addPcOrPx`](#addpcorpx)
- [`get`](#get)
- [`resolve`](#resolve)
- [`omit`](#omit)
- [`pick`](#pick)
- [`merge`](#merge)

### `isNil`

Returns `true` for `null` or `undefined` values, `false` otherwise.

```js
isNil() // true
isNil(null) // true
isNil(undefined) // true
isNil("") // false
isNil(0) // false
```

### `isUndefined`

Returns `true` for `undefined` values, `false` otherwise.

```js
isUndefined() // true
isUndefined(undefined) // true
isUndefined(null) // false
isUndefined("") // false
isUndefined(0) // false
```

### `isType`

Creates a `typeof` check function for a given `type`.

```js
const isNumber = isType("number")
isNumber(0) // true
isNumber(1) // true
isNumber("2") // false

const isString = isType("string")
isString("foo") // true
isString({}) // false
isString(5) // false
```

### `isArray`

Returns `true` for array values, `false` otherwise.

```js
isArray([1, 2, 3]) // true
isArray([]) // true
isArray({}) // false
isArray(1) // false
```

### `isNumber`

Returns `true` for `typeof value === "number"` values, `false` otherwise.

```js
isNumber(1) // true
isNumber(0) // true
isNumber(-1) // true
isNumber(null) // false
isNumber([]) // false
isNumber("") // false
```

### `isObject`

Returns `true` for `typeof value === "object"` values, `false` otherwise.

```js
isObject({}) // true
isObject([]) // true
isObject(null) // true
isObject(undefined) // false
isObject("") // false
isObject(0) // false
```

### `isPlainObject`

Returns `true` for `!!value && isObject(value) && !isArray(value)` values, `false` otherwise.

```js
isPlainObject({}) // true
isPlainObject([]) // false
isPlainObject(null) // false
isPlainObject(undefined) // false
isPlainObject("") // false
isPlainObject(0) // false
```

### `isString`

Returns `true` for `typeof value === "string"` values, `false` otherwise.

```js
isString("") // true
isString("foo") // true
isString(undefined) // false
isString(null) // false
isString(10) // false
isString({}) // false
```

### `isUnitless`

Returns `true` for `typeof value === "number"` values that are _not_ zero, `false` otherwise.

```js
isUnitless(1) // true
isUnitless(-1) // true
isUnitless(0) // false
isUnitless("1") // false
isUnitless({}) // false
```

### `isFraction`

Returns `true` for decimal values between `-1` and `1` that are _not_ zero, `false` otherwise.

```js
isFraction(0.9) // true
isFraction(-0.2) // true
isFraction(0) // false
isFraction("0.1") // false
```

### `when`

Branching logic function that takes a `predicate` and calls a `transform` function for any given value when the predicate returns `true` for that value. When the predicate returns `false` the original value is returned.

```js
// Predicate Function
const isBig = (x) => x === "big"

// Transform Function
const toUpper = (x) => x.toUpperCase()

// Branching Function
const whenBig = when(isBig)

// Branching Transform Function
const makeBigger = whenBig(toUpper)

makeBigger("big") // "BIG"
makeBigger("small") // "small"
makeBigger("just right") // "just right"
```

The `when` function is used in combination with the predicates documented above to build the `transform` functions included with onno. For example:

```js
const addPx = when(isUnitless)((x) => x + "px")
const addPc = when(isFraction)((x) => x * 100 + "%")
```

### `addPx`

[Transform](api.md#transform) function that adds "px" to [unitless values](#isunitless).

```js
addPx(32) // "32px"
addPx(-4) // "-4px"
addPx(0) // 0
addPx("2em") // "2em"
```

### `addPc`

[Transform](api.md#transform) function that multiplies [fractional values](#isfraction) by 100 and adds "%" to them.

```js
addPx(1 / 4) // "25%"
addPx(-0.5) // "-50%"
addPx(0) // 0
addPx("4ch") // "4ch"
```

### `addRem`

[Transform](api.md#transform) function that adds "rem" to [unitless values](#isunitless).

```js
addRem(1.5) // "1.5rem"
addRem(3 / 4) // "0.75rem"
addRem(0) // 0
addRem("2px") // "2px"
```

### `addPcOrPx`

[Transform](api.md#transform) function that first attempts to convert a value [to percent](#addpc) and then [to pixels](#addpx).

```js
addPcOrPx(3 / 4) // "75%"
addPcOrPx(-0.1) // "-10%"
addPcOrPx(100) // "100px"
addPcOrPx(-1) // "-1px"
addPcOrPx(0) // 0
addPcOrPx("50vw") // "50vw"
```

### `get`

Resolves a value at a given `path` within a `lookup` object or array. Path values can be in string format using dot syntax like `"foo.bar.1"` or an array of path keys like `["foo", "bar", 1]`. Passing `"."` or `["."]` will return the lookup object or array.

Resolved values can be inverted by prefixing the `path` with a negative sign eg. `-2` or `"-foo.bar.1"`. Lookup arrays can contain alias objects.

```js
const theme = {
  breakpoints: [
    { alias: "all", value: 0 },
    { alias: "sm", value: 360 },
    { alias: "md", value: 720 },
    { alias: "lg", value: 1080 },
    { alias: "xl", value: 1440 }
  ]
  colors: {
    gray: ["#EEE", "#AAA", "#666"],
    text: "#222",
    link: "#00F"
  },
  spaces: [0, 2, 4, 8, 16, 32, 64]
}

get("breakpoints.0", theme) // 0
get("breakpoints.all", theme) // 0
get(["breakpoints", 2], theme) // 720
get(["breakpoints", "lg"], theme) // 1080
get(["breakpoints", "foo"], theme) // undefined

get("colors.gray.1", theme) // "#AAA"
get(["colors", "link"], theme) // "#00F"
get("colors.orange", theme) // undefined

get("spaces.1", theme) // 2
get("-spaces.2", theme) // -4
get(["spaces", 3], theme) // 8
get(["-spaces", 4], theme) // -16
get(["spaces", 10], theme) // undefined

get("spaces", theme) // theme.spaces array
get(["spaces"], theme) // theme.spaces array

get(".", theme) // theme object
get(["."], theme) // theme object

get("foo", theme) // undefined
```

### `resolve`

Takes an array of `paths` and iterates over them against a `lookup` object to try and resolve a value.

Paths are resolved from left to right.

```js
const lookup = {
  sizes: [0, 10, 20, 30],
  widths: [0, 100, 200]
}

resolve(["widths.2", "sizes.2"], lookup) // 200
resolve(["-widths.3", "-sizes.3"], lookup) // -30
resolve(["widths.4", "sizes.4"], lookup) // undefined
```

This is the function that onno uses internally to resolve `theme` and `defaults` values. It calls the `get` method for each `path` in turn to try and resolve a value in the `lookup` object.

### `omit`

Takes an `options` object with _optional_ `propsKeys` and/or `renderers` and returns a props `filter` function.

When the `filter` function is called with a `props` object, it will return another object with the `propsKeys` removed.

The `theme` key is removed automatically, so you do not need to pass it to the `propsKeys` array.

This is useful when working with React where you want to sanitize `props` before spreading them onto an intrinsic element or component.

```js
import { style, omit } from "onno"

const margin = style({
  propsKeys: ["margin", "m"]
})

const padding = style({
  propsKeys: ["padding", "p"]
})

// omit "theme" key
const omitNothing = omit({})

// omit "theme", "foo" and "bar" keys
const omitPropsKeys = omit({
  propsKeys: ["foo", "bar"]
})

// omit "theme", "margin", "m", "padding" and "p" keys
const omitRenderers = omit({
  renderers: [margin, padding]
})

// omit all of the above keys
const omitEverything = omit({
  propsKeys: ["foo", "bar"],
  renderers: [margin, padding]
})

const props = {
  foo: "foo",
  bar: "bar",
  baz: "baz",
  margin: 1,
  m: 2,
  padding: 3,
  p: 4,
  theme: {
    spaces: [1, 2, 3]
  }
}

// {
//   foo: "foo",
//   bar: "bar",
//   baz: "baz",
//   margin: 1,
//   m: 2,
//   padding: 3,
//   p: 4
// }
omitNothing(props)

// {
//   baz: "baz",
//   margin: 1,
//   m: 2,
//   padding: 3,
//   p: 4
// }
omitPropsKeys(props)

// {
//   foo: "foo",
//   bar: "bar",
//   baz: "baz"
// }
omitRenderers(props)

// {
//   baz: "baz"
// }
omitEverything(props)
```

### `pick`

Takes an `options` object with _optional_ `propsKeys` and/or `renderers` and returns a props `filter` function.

When the `filter` function is called with a `props` object, it will return another object with the picked `propsKeys`.

```js
import { style, pick } from "onno"

const margin = style({
  propsKeys: ["margin", "m"]
})

const padding = style({
  propsKeys: ["padding", "p"]
})

// pick "foo" and "bar" keys
const pickPropsKeys = pick({
  propsKeys: ["foo", "bar"]
})

// pick "margin", "m", "padding" and "p" keys
const pickRenderers = pick({
  renderers: [margin, padding]
})

// pick all of the above keys
const pickEverything = pick({
  propsKeys: ["foo", "bar"],
  renderers: [margin, padding]
})

const props = {
  foo: "foo",
  bar: "bar",
  baz: "baz",
  margin: 1,
  m: 2,
  padding: 3,
  p: 4,
  theme: {
    spaces: [1, 2, 3]
  }
}

// {
//   foo: "foo",
//   bar: "bar"
// }
pickPropsKeys(props)

// {
//   margin: 1,
//   m: 2,
//   padding: 3,
//   p: 4
// }
pickRenderers(props)

// {
//   foo: "foo",
//   bar: "bar",
//   margin: 1,
//   m: 2,
//   padding: 3,
//   p: 4
// }
pickEverything(props)
```

### `merge`

Takes a multidimensional `array` of objects and merges them into a single object. An optional `initial` object can be passed as the first argument to merge the other objects into.

```js
import { merge } from "onno"

merge([{ a: 1 }, { a: 2 }]) // { a: 2 }

merge([{ a: 1 }, { b: 2 }]) // { a: 1, b: 2 }

merge([{ a: 1 }, { b: 2 }], { c: 3 }) // { a: 1, b: 2, c: 3 }

merge([{ a: 1 }, [{ b: 2 }, [{ c: 3 }]]], { d: 4 }) // { a: 1, b: 2, c: 3, d: 4 }
```
