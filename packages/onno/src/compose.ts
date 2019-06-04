import * as T from "./types"
import { isArray } from "./utils"

const KEYS: T.StyleOptionsKeys[] = ["propsKeys", "styleKeys", "themeKeys"]

export const push = Array.prototype.push

export function unique(
  renderers: T.AnyRenderFunction[],
  initial: T.AnyRenderFunction[] = []
): T.AnyRenderFunction[] {
  return renderers.reduce((collection, renderer) => {
    const isComposed = renderer.type === "compose"
    const isIncluded = collection.includes(renderer)
    const { renderers: renderFuncs } = renderer.options
    if (!isComposed && !isIncluded) collection.push(renderer)
    if (isArray(renderFuncs)) unique(renderFuncs, initial)
    return collection
  }, initial)
}

export function compose<P extends T.ThemeProps, S extends T.Style>(
  options: T.ComposeOptions
): T.ComposedRenderFunction<P, S> {
  let { name } = options
  if (!/Set$/.test(name)) name += "Set"
  const renderers = unique(options.renderers)
  const composedOptions: T.ComposedRenderOptions = {
    propsKeys: [],
    styleKeys: [],
    themeKeys: [],
    renderers
  }

  // Build options keys
  renderers.forEach((fn) =>
    KEYS.forEach((key) => {
      const keys = fn.options[key]
      if (keys) push.apply(composedOptions[key], keys)
    })
  )

  // Create scoped renderProps style function
  const renderProps: T.ComposedRenderFunction<P, S> = (props: P) => {
    const result: T.StyleArray<S> = renderers.reduce((styles, renderer) => {
      const output = renderer(props)
      if (output) push.apply(styles, output)
      return styles
    }, [])

    // Return the composed style object
    return result.length ? result : null
  }

  // Define renderProps function properties
  renderProps.options = composedOptions
  renderProps.type = "compose" as "compose"
  Object.defineProperty(renderProps, "name", { value: name })

  // Return renderProps function
  return renderProps
}
