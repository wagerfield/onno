import * as T from "./types"
import { isArray, push, isNil } from "./utils"
import { compose } from "./compose"

export function filter<P extends T.Props>(
  options: T.FilterOptions<P>
): T.FilterFunction<P> {
  const { propsKeys, renderers, reducer, initial } = options
  const keys: T.Keys = []

  // Add options propsKeys
  if (isArray(propsKeys)) {
    push.apply(keys, propsKeys)
  }

  // Add renderers propsKeys
  if (isArray(renderers)) {
    const filterSet = compose({ name: "filter", renderers })
    push.apply(keys, filterSet.options.propsKeys)
  }

  // Scoped filterProps function
  const filterProps: T.PickFunction<P> = (props: P) => {
    return keys.reduce((acc, key) => {
      return reducer(acc, key, props)
    }, initial(props))
  }

  // Return filterProps function
  return filterProps
}

export function omit<P extends T.Props>(
  options: T.OmitOptions<P>
): T.OmitFunction<P> {
  const propsKeys = options.propsKeys || ["theme"]
  if (!propsKeys.includes("theme")) propsKeys.push("theme")
  return filter({
    propsKeys,
    renderers: options.renderers,
    initial: (props) => Object.assign({}, props),
    reducer: (acc, key) => {
      delete acc[key]
      return acc
    }
  })
}

export function pick<P extends T.Props>(
  options: T.PickOptions<P>
): T.PickFunction<P> {
  return filter({
    propsKeys: options.propsKeys,
    renderers: options.renderers,
    initial: () => ({}),
    reducer: (acc, key, props) => {
      const value = props[key]
      if (!isNil(value)) acc[key] = value
      return acc
    }
  })
}
