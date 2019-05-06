import * as S from "../src"
import * as U from "./test-utils"

test("returns style function", () => {
  const styleSet = S.compose([])
  expect(styleSet).toEqual(expect.any(Function))
  expect(styleSet).toHaveLength(1)
})

test("returns null for empty arrays ", () => {
  const styleSet = S.compose([S.style({ propsKeys: ["a"] })])
  expect(styleSet({ b: 2 })).toBeNull()
})

test("returns style object array or null", () => {
  const styleSet = S.compose([
    S.style({ propsKeys: ["a", "b"] }),
    S.style({ propsKeys: ["c", "d"] })
  ])
  const testProps = U.snapshot(styleSet)

  testProps({})
  testProps({ a: 1 })
  testProps({ b: 2, d: 4 })
  testProps({ a: 1, b: 2, c: 3, d: 4 })
})

test("respects order of style functions", () => {
  const styleSet = S.compose([
    S.style({ propsKeys: ["a", "b"], styleKeys: ["x"] }),
    S.style({ propsKeys: ["a", "c"], styleKeys: ["y"] })
  ])
  const testProps = U.snapshot(styleSet)

  testProps({ a: 1 })
  testProps({ b: 2 })
  testProps({ c: 3 })
})

test("only calls a style function once", () => {
  const styleFunc = S.style({ propsKeys: ["a", "b"] })
  const styleSet = S.compose([styleFunc, styleFunc, styleFunc])
  const testProps = U.snapshot(styleSet)

  testProps({ a: 1 })
  testProps({ b: 2 })
})
