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
    intent: {
      primary: "bg-blue-600 text-white",
      secondary: "bg-gray-200 text-black",
    },
    size: {
      sm: "h-8 px-1",
      md: "h-10 px-2",
      lg: "h-12 px-3",
    },
  },
})

// "bg-blue-600 text-white h-10 px-2"
const classes = button({
  intent: "primary",
  size: "md",
})
```

### Variants

Todo

### Defaults

Todo

### Baseline Classes

Todo

### Compound Classes

Todo

### Additional Classes

Todo

## TypeScript

Use `OnnoProps` to infer variant props from an `OnnoFunction`

```ts
import { onno, type OnnoProps } from "onno"

export const button = onno({
  variants: {
    size: {
      sm: "pretty small",
      lg: "really large",
    },
  },
})

export type ButtonProps = OnnoProps<typeof button>
export type ButtonSizeType = ButtonProps["size"] // "sm" | "lg" | undefined
```

Note that inferred `OnnoProps` include the `className` option alongside the variant types:

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
      primary: "very punchy",
      secondary: "quite normal",
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
