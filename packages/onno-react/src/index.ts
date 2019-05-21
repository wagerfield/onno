export * from "onno"
import { toArray, AnyRenderFunction } from "onno"
import {
  number,
  string,
  arrayOf,
  objectOf,
  oneOfType,
  Requireable
} from "prop-types"

export interface PropTypes {
  [key: string]: Requireable<number | string | object | any[]>
}

export const VALUE_TYPE = oneOfType([number, string])

export const OBJECT_TYPE = objectOf(VALUE_TYPE)

export const ARRAY_TYPE = arrayOf(VALUE_TYPE)

export const PROP_TYPES = oneOfType([VALUE_TYPE, OBJECT_TYPE, ARRAY_TYPE])

export function propTypes(renderers: AnyRenderFunction[]): PropTypes
export function propTypes(...renderers: AnyRenderFunction[]): PropTypes
export function propTypes(...args: any[]): PropTypes {
  return (toArray(args) as AnyRenderFunction[]).reduce(
    (result, renderer) => {
      renderer.options.propsKeys.forEach((key) => {
        result[key] = PROP_TYPES
      })
      return result
    },
    {} as PropTypes
  )
}
