import * as O from "../src"

type StyleOptionsKeys = "propsKeys" | "styleKeys" | "themeKeys"

interface Index {
  [key: string]: any
}

const index: Index = O

function getStyles(composed: boolean) {
  return Object.keys(index).reduce(
    (fns, key) => {
      const fn = index[key]
      if (fn.options && fn.composed === composed) fns.push(fn)
      return fns
    },
    [] as O.StyleFunction<any, any>[]
  )
}

function getKeys(key: StyleOptionsKeys, composed: boolean) {
  return getStyles(composed).reduce(
    (keys, fn) => {
      const options = fn.options
      const hasKeys = !O.isNil(options) && O.isArray(options[key])
      return hasKeys ? keys.concat(options![key]) : keys
    },
    [] as any[]
  )
}

test("propsKeys are unique", () => {
  const arr = getKeys("propsKeys", false)
  const set = new Set(arr)
  const diff = arr.concat()
  set.forEach((key) => {
    const idx = diff.indexOf(key)
    if (idx !== -1) diff.splice(idx, 1)
  })
  expect(diff).toEqual([])
  expect(arr.length).toBe(set.size)
})
