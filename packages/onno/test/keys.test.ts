import * as O from "../src"

type StyleOptionsKeys = "propsKeys" | "styleKeys" | "themeKeys"

interface Index {
  [key: string]: any
}

const index: Index = O

function getStyles(type: O.RenderFunctionType) {
  return Object.keys(index).reduce(
    (fns, key) => {
      const fn = index[key]
      if (fn.options && fn.type === type) fns.push(fn)
      return fns
    },
    [] as O.RenderFunction<any, any>[]
  )
}

function getKeys(key: StyleOptionsKeys, type: O.RenderFunctionType) {
  return getStyles(type).reduce(
    (keys, fn) => {
      const options = fn.options
      const hasKeys = !O.isNil(options) && O.isArray(options[key])
      return hasKeys ? keys.concat(options![key]) : keys
    },
    [] as any[]
  )
}

test("propsKeys are unique", () => {
  const stylePropKeys = getKeys("propsKeys", "style")
  const variantPropKeys = getKeys("propsKeys", "variant")
  const arr = stylePropKeys.concat(variantPropKeys)
  const set = new Set(arr)
  const diff = arr.concat()
  set.forEach((key) => {
    const idx = diff.indexOf(key)
    if (idx !== -1) diff.splice(idx, 1)
  })
  expect(diff).toEqual([])
  expect(arr.length).toBe(set.size)
})
