# [![onno](https://raw.github.com/wagerfield/onno/main/assets/onno.svg)][onno]

[![Bundle Size](https://img.shields.io/bundlephobia/minzip/onno?style=flat-square&logo=npm&logoColor=FFF&label=size&color=4C8)][onno-bundlephobia]
[![Code Coverage](https://img.shields.io/codecov/c/gh/wagerfield/onno?style=flat-square&logo=codecov&logoColor=FFF&color=4C8)][onno-codecov]
[![Workflow Status](https://img.shields.io/github/actions/workflow/status/wagerfield/onno/test.yml?style=flat-square&logo=github&logoColor=FFF&color=4C8)][onno-workflow]
[![License](https://img.shields.io/github/license/wagerfield/onno?style=flat-square&color=4C8)][onno-license]

Tiny ([266B][onno-bundlephobia]) utility for composing class variants using `clsx`

    pnpm add onno

## Features

- Framework agnostic
- Single _tiny_ dependency on `clsx` ([330B][clsx-bundlephobia])
- Written in [TypeScript][typescript] with delicious [type helpers](#typescript)
- Rigorously tested with [100% code coverage][onno-codecov]
- Perfect companion to [Tailwind CSS][tailwindcss]

## Usage

```js
const button = onno({
  variants: {
    size: {
      sm: "h-8 px-1",
      md: "h-10 px-2",
      lg: "h-12 px-3",
    },
    intent: {
      primary: "bg-blue-600 text-white",
      secondary: "bg-gray-200 text-black",
    },
    disabled: "opacity-50",
  },
})

// "h-10 px-2 bg-blue-600 text-white opacity-50"
const classes = button({ size: "md", intent: "primary", disabled: true })
```

### Variants

Define variant names and the classes to be applied using the `variants` config option:

```js
// Name your function whatever you like eg. `getClasses`
const button = onno({
  variants: {
    // This is a `boolean` variant applied when `disabled === true`
    disabled: "access denied", // Class values can be a single `string`

    // This is a `boolean` variant applied when `hidden === true`
    hidden: ["barely", "visible"], // Class values can also be a `string[]`

    // This is a `enum` variant applied when `size === "sm" || "lg"`
    size: {
      sm: ["pretty", "small"], // Here we are using a `string[]` class list
      lg: "really large", // ...and here we are using a `string` class list
    },
  },
})

button() // ""
button({}) // ""
button({ size: "sm" }) // "pretty small"
button({ disabled: true }) // "access denied"
button({ hidden: true, size: "lg" }) // "barely visible really large"
```

### Defaults

Default variants can be set using the `defaults` config option:

```js
const button = onno({
  defaults: {
    hidden: true,
    intent: "secondary",
  },
  variants: {
    hidden: "barely visible",
    intent: {
      primary: "super punchy",
      secondary: "quite bland",
    },
    size: {
      sm: "pretty small",
      lg: "really large",
    },
  },
})

button() // "barely visible quite bland"
button({}) // "barely visible quite bland"
button({ hidden: false }) // "quite bland"
button({ intent: "primary" }) // "barely visible super punchy"
button({ size: "lg" }) // "barely visible quite bland really large"
```

### Baseline Classes

Common classes can be applied using the `baseline` config option:

```js
const button = onno({
  baseline: "solid base", // Can also use a `string[]` class list
  variants: {
    size: {
      sm: "pretty small",
      lg: "really large",
    },
  },
})

button() // "solid base"
button({}) // "solid base"
button({ size: "sm" }) // "solid base pretty small"
```

### Compound Classes

Apply classes when certain variants are combined using the `compound` config option:

```js
const button = onno({
  variants: {
    hidden: "barely visible",
    size: {
      sm: "pretty small",
      md: "kinda normal",
      lg: "really large",
    },
  },
  compound: [
    {
      size: ["sm", "lg"],
      className: "compound one", // Apply when `size === "sm" || "lg"`
    },
    {
      size: "md",
      hidden: true,
      className: ["compound", "two"], // Apply when `size === "md" && hidden === true`
    },
  ],
})

button() // ""
button({}) // ""
button({ size: "md" }) // "kinda normal"
button({ hidden: true }) // "barely visible"
button({ size: "lg" }) // "really large compound one"
button({ size: "md", hidden: true }) // "kinda normal compound two"
```

### Additional Classes

Additional classes can be applied using the `className` option:

```js
const button = onno({
  baseline: "solid base",
  variants: {
    size: {
      sm: "pretty small",
      lg: "really large",
    },
  },
})

button() // "solid base"
button({ className: "with more" }) // "solid base with more"
button({ className: "with more", size: "sm" }) // "solid base pretty small with more"
```

### Class Composition

Classes are applied in the following order:

1. `baseline`
2. `variants`
3. `compound`
4. `className`

Under the hood `onno` uses `clsx` to build the class list.

For convenience `clsx` is exported from `onno` so you can use it to compose classes:

```js
import { onno, clsx } from "onno"

const button = onno({
  variants: {
    size: {
      sm: "pretty small",
      lg: "really large",
    },
  },
})

clsx("foo", ["bar", { baz: true }], button({ size: "sm" })) // "foo bar baz pretty small"
```

Note that onno's `className` option also accepts any `clsx.ClassValue` ([see docs][clsx]) so you can do:

```js
import { onno, clsx } from "onno"

const button = onno({
  variants: {
    size: {
      sm: "pretty small",
      lg: "really large",
    },
  },
})

button({ size: "lg", className: ["foo", ["bar"], { baz: true }] }) // "really large foo bar baz"
```

## TypeScript

Use `OnnoProps` to infer variant props from an `OnnoFunction`

```ts
import { onno, type OnnoProps } from "onno"

export const button = onno({
  variants: {
    disabled: "not allowed",
    size: {
      sm: "pretty small",
      lg: "really large",
    },
  },
})

export type ButtonProps = OnnoProps<typeof button>
export type ButtonSizeType = ButtonProps["size"] // "sm" | "lg" | undefined
export type ButtonDisabledType = ButtonProps["disabled"] // boolean | undefined
```

Note that inferred `OnnoProps` also include the `className` option alongside the variant types:

```ts
export type ButtonClassNameType = ButtonProps["className"] // clsx.ClassValue
```

By default all variants are _optional_. To require one or more variants, pass a union of _required_ variant keys as the second argument to the `OnnoProps` type:

```ts
import { onno, type OnnoProps } from "onno"

export const button = onno({
  variants: {
    disabled: "not allowed",
    intent: {
      primary: "super punchy",
      secondary: "quite bland",
    },
    size: {
      sm: "pretty small",
      lg: "really large",
    },
  },
})

export type ButtonProps = OnnoProps<typeof button, "intent" | "size">

// Error: Property 'intent' is missing in type '{ size: "md" }'
const buttonProps: ButtonProps = { size: "md" }
```

## Tailwind CSS

If you are using the [Tailwind CSS VSCode extension][tailwindcss-vscode] add the following configuration to your workspace `.vscode/settings.json` file:

```json
{
  "tailwindCSS.experimental.classRegex": [
    ["onno\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

This will trigger Tailwind's autocompletion within the `onno()` function.

## License

[MIT][onno-license] © [Matthew Wagerfield][wagerfield]

[wagerfield]: https://github.com/wagerfield
[onno]: https://github.com/wagerfield/onno#readme
[onno-workflow]: https://github.com/wagerfield/onno/actions/workflows/test.yml
[onno-license]: https://github.com/wagerfield/onno/blob/main/license
[onno-codecov]: https://codecov.io/gh/wagerfield/onno
[clsx-bundlephobia]: https://bundlephobia.com/package/clsx
[onno-bundlephobia]: https://bundlephobia.com/package/onno
[clsx]: https://github.com/lukeed/clsx#readme
[typescript]: https://www.typescriptlang.org
[tailwindcss]: https://tailwindcss.com
[tailwindcss-vscode]: https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss
