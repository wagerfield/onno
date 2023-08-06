# [![onno](https://raw.github.com/wagerfield/onno/main/assets/onno.svg)][onno]

Tiny ([400B][bundlephobia-onno]) utility for composing class variants using `clsx`

## Features

- Framework agnostic
- Single *tiny* dependency on `clsx` ([330B][bundlephobia-clsx])
- Written in [TypeScript][typescript] with type safe [definitions](#typescript)
- Rigorously tested with 100% code coverage
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

Todo.

### Defaults

Todo.

### Baseline Classes

Todo.

### Compound Classes

Todo.

### Additional Classes

Todo.

## TypeScript

Use `OnnoProps` to infer component variant props:

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
export type ButtonClassNameType = ButtonProps["className"] // `ClassValue` from `clsx`
```

By default *all* variants are *optional*. To require one or more variants, pass a string union of variant keys as the second argument to the `OnnoProps` type:

```ts
import { onno, type OnnoProps } from "onno"

export const button = onno({
  variants: {
    disabled: "...",
    intent: { ... },
    size: { ... },
  },
})

export type ButtonProps = OnnoProps<typeof button, "intent" | "size">

const buttonProps: ButtonProps = {
  intent: "primary"
}
```

## License

[MIT][license] © [Matthew Wagerfield][wagerfield]

[onno]: https://onnojs.com
[wagerfield]: https://github.com/wagerfield
[license]: https://github.com/wagerfield/onno/blob/main/license
[bundlephobia-clsx]: https://bundlephobia.com/package/clsx@2.0.0
[bundlephobia-onno]: https://bundlephobia.com/package/onno@2.0.0
[typescript]: https://www.typescriptlang.org
[tailwindcss]: https://tailwindcss.com
