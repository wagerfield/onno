import * as T from "./types"
import { isArray, isNil } from "./utils"

export function render<S extends T.Style>(
  keys?: (keyof S)[],
  value?: any
): S | null {
  if (isNil(value) || !isArray(keys) || !keys.length) return null
  return keys.reduce(
    (s, k) => {
      s[k] = value
      return s
    },
    {} as S
  )
}
