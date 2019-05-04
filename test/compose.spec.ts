import * as S from "../src"
import * as U from "./test-utils"

test("returns style function", () => {
  const styleFunc = S.compose([])
  expect(styleFunc).toEqual(expect.any(Function))
  expect(styleFunc).toHaveLength(1)
})

test("returns an array", () => {
  const styleFunc = S.compose([])
  expect(styleFunc({})).toEqual([])
})

test("returns style object array", () => {
  const styleFunc = S.compose([
    S.style({ propsKeys: ["a", "b"] }),
    S.style({ propsKeys: ["c", "d"] })
  ])
  const testProps = U.snapshot(styleFunc)

  testProps({})
  testProps({ a: 1 })
  testProps({ b: 2, d: 4 })
  testProps({ a: 1, b: 2, c: 3, d: 4 })
})

test("respects order of style functions", () => {
  const styleFunc = S.compose([
    S.style({ propsKeys: ["a", "b"], styleKeys: ["x"] }),
    S.style({ propsKeys: ["a", "c"], styleKeys: ["y"] })
  ])
  const testProps = U.snapshot(styleFunc)

  testProps({ a: 1 })
  testProps({ b: 2 })
  testProps({ c: 3 })
})
