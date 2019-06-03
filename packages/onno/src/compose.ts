import * as T from "./types"

const KEYS: T.StyleOptionsKeys[] = ["propsKeys", "styleKeys", "themeKeys"]

const push = Array.prototype.push

export function unique(
  renderers: T.AnyRenderFunction[],
  initial: T.AnyRenderFunction[] = []
): T.AnyRenderFunction[] {
  return renderers.reduce((collection, renderer) => {
    if (renderer.options.renderers) {
      unique(renderer.options.renderers, initial)
    } else if (collection.indexOf(renderer) === -1) {
      collection.push(renderer)
    }
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
