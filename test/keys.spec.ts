import * as S from "../src"

type StyleOptionsKeys = "propsKeys" | "styleKeys" | "themeKeys"

interface Index {
  [key: string]: any
}

const index: Index = S

const styles = Object.keys(index).reduce(
  (fns, key) => {
    const val = index[key]
    if (val.options) fns.push(val)
    return fns
  },
  [] as S.StyleFunction<any, any>[]
)

export function getKeys(key: StyleOptionsKeys) {
  return styles.reduce(
    (keys, fn) => {
      const options = fn.options
      const hasKeys = !S.isNil(options) && S.isArray(options[key])
      return hasKeys ? keys.concat(options![key]) : keys
    },
    [] as any[]
  )
}

test("propsKeys are unique", () => {
  const arr = getKeys("propsKeys")
  const set = new Set(arr)
  const diff = arr.concat()
  set.forEach((key) => {
    const idx = diff.indexOf(key)
    if (idx !== -1) diff.splice(idx, 1)
  })
  expect(diff).toEqual([])
  expect(arr.length).toBe(set.size)
})
