# Utils <!-- omit in toc -->

Onno uses a number of utility functions internally to resolve, query and transform values. These functions can be useful for when you create your own transform functions or component style sets.

## Table of Contents <!-- omit in toc -->

- [`isNil`](#isnil)
- [`isUndefined`](#isundefined)
- [`isArray`](#isarray)
- [`isObject`](#isobject)
- [`isUnitless`](#isunitless)
- [`isFraction`](#isfraction)
- [`when`](#when)
- [`addPx`](#addpx)
- [`addPc`](#addpc)
- [`addPcOrPx`](#addpcorpx)
- [`get`](#get)
- [`resolve`](#resolve)

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

### `isArray`

Returns `true` for array values, `false` otherwise.

```js
isArray([1, 2, 3]) // true
isArray([]) // true
isArray({}) // false
isArray(1) // false
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

Branching logic function that takes a `predicate` and calls a `transform` function with the passed value when the predicate returns `true` for that value. When the predicate returns `false`, the original value is simply returned.

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

This is used in combination with the predicates documented above to build the `transform` functions included with onno. For example:

```js
const addPx = when(isUnitless)((x) => x + "px")
const addPc = when(isFraction)((x) => x * 100 + "%")
```

### `addPx`

A [`transform`](api.md#transform) function that adds "px" to [unitless values](#isunitless).

```js
addPx(32) // "32px"
addPx(-4) // "-4px"
addPx(0) // 0
addPx("2em") // "2em"
```

### `addPc`

A [`transform`](api.md#transform) function that multiplies [fractional values](#isfraction) by 100 and adds "%" to them.

```js
addPx(1 / 4) // "25%"
addPx(-0.5) // "-50%"
addPx(0) // 0
addPx("4ch") // "4ch"
```

### `addPcOrPx`

A [`transform`](api.md#transform) function that first attempts to convert a value [to percent](#addpc) and then [to pixels](#addpx).

```js
addPcOrPx(3 / 4) // "75%"
addPcOrPx(-0.1) // "-10%"
addPcOrPx(100) // "100px"
addPcOrPx(-1) // "-1px"
addPcOrPx(0) // 0
addPcOrPx("50vw") // "50vw"
```

### `get`

Resolves a value at a given `path` within a "lookup" object. Expects a `path` as the first argument and the "lookup" object as the second argument. Path values can be in string format using dot syntax like `"foo.bar.1"` or an array of path keys like `["foo", "bar", 1]`. Lookup arrays can contain alias objects.

```js
const theme = {
  breakpoints: [
    { alias: "xs", value: 0 },
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
get("breakpoints.xs", theme) // 0
get(["breakpoints", 2], theme) // 720
get(["breakpoints", "lg"], theme) // 1080
get(["breakpoints", "foo"], theme) // undefined

get("colors.gray.1", theme) // "#AAA"
get(["colors", "link"], theme) // "#00F"
get("colors.orange", theme) // undefined

get("spaces.2", theme) // 4
get(["spaces", 4], theme) // 16
get(["spaces", 10], theme) // undefined

get("foo", theme) // undefined
```

### `resolve`

Takes an array of `paths` and iterates over them against a lookup object to try and resolve a value. Paths towards the start of the array will be resolved first.

```js
const lookup = {
  sizes: [0, 1, 2, 3],
  widths: [0, 10, 20]
}

resolve(["widths.2", "sizes.2"], lookup) // 20
resolve(["widths.3", "sizes.3"], lookup) // 3
resolve(["widths.4", "sizes.4"], lookup) // undefined
```

This is the function that onno uses internally to resolve `theme` and `defaults` values. It calls the `get` method for each `path` in turn to try and resolve a value in the lookup object.
