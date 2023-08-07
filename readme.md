# [![onno](https://raw.github.com/wagerfield/onno/main/assets/onno.svg)][onno]

[![Bundle Size](https://img.shields.io/bundlephobia/minzip/onno?style=flat-square&logo=npm&logoColor=FFF&label=size&color=4C8)][bundlephobia-onno]
[![Code Coverage](https://img.shields.io/codecov/c/gh/wagerfield/onno?style=flat-square&logo=codecov&logoColor=FFF&color=4C8)][codecov]
[![Workflow Status](https://img.shields.io/github/actions/workflow/status/wagerfield/onno/test.yml?style=flat-square&logo=github&logoColor=FFF&color=4C8)][workflow]
[![License](https://img.shields.io/github/license/wagerfield/onno?style=flat-square&color=4C8)][license]

Tiny ([596B][bundlephobia-onno]) utility for composing class variants using `clsx`

    pnpm add onno

## Features

- Framework agnostic
- Single _tiny_ dependency on `clsx` ([330B][bundlephobia-clsx])
- Written in [TypeScript][typescript] with delicious [type helpers](#typescript)
- Rigorously tested with [100% code coverage][codecov]
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
const classes = button({
  size: "md",
  intent: "primary",
  disabled: true,
})
```

### Variants

```js
// Name your function however you like eg. `getClasses` or `buttonClasses`
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

Baseline classes can be added using the `baseline` config option:

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

Todo

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

### Class Order

Classes are applied in the following order:

1. `baseline`
2. `variants`
3. `compound`
4. `className`

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

Todo

## License

[MIT][license] © [Matthew Wagerfield][wagerfield]

[onno]: https://onnojs.com
[wagerfield]: https://github.com/wagerfield
[codecov]: https://codecov.io/gh/wagerfield/onno
[license]: https://github.com/wagerfield/onno/blob/main/license
[workflow]: https://github.com/wagerfield/onno/actions/workflows/test.yml
[bundlephobia-clsx]: https://bundlephobia.com/package/clsx
[bundlephobia-onno]: https://bundlephobia.com/package/onno
[typescript]: https://www.typescriptlang.org
[tailwindcss]: https://tailwindcss.com
