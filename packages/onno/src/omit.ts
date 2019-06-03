import * as T from "./types"
import { isArray } from "./utils"
import { compose, push } from "./compose"

export function omit<P extends T.Props>(
  options: T.OmitOptions
): T.OmitFunction<P> {
  const { propsKeys, renderers } = options
  const keys: T.Keys = []

  // Add options propsKeys
  if (isArray(propsKeys)) {
    push.apply(keys, propsKeys)
  }

  // Add renderers propsKeys
  if (isArray(renderers)) {
    const omitSet = compose({ name: "omit", renderers })
    push.apply(keys, omitSet.options.propsKeys)
  }

  // Scoped omitProps function
  const omitProps: T.OmitFunction<P> = (props: P) => {
    const filteredProps: Partial<P> = Object.assign({}, props)
    keys.forEach((key) => delete filteredProps[key])
    return filteredProps
  }

  // Return omitProps function
  return omitProps
}
