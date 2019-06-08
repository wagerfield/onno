import * as O from "../src"
import * as U from "./test-utils"

test("returns style function", () => {
  const styleSet = O.compose({
    name: "test",
    renderers: []
  })
  expect(styleSet).toEqual(expect.any(Function))
  expect(styleSet).toHaveLength(1)
})

test("adds Set to function name", () => {
  const testSet1 = O.compose({ name: "test1", renderers: [] })
  const testSet2 = O.compose({ name: "test2Set", renderers: [] })
  expect(testSet1.name).toBe("test1Set")
  expect(testSet2.name).toBe("test2Set")
})

test("returns null for empty arrays ", () => {
  const styleSet = O.compose<any, any>({
    name: "test",
    renderers: [O.style({ propsKeys: ["a"] })]
  })
  expect(styleSet({ b: 2 })).toBeNull()
})

test("returns style object array or null", () => {
  const styleSet = O.compose<any, any>({
    name: "test",
    renderers: [
      O.style({ propsKeys: ["a", "b"] }),
      O.style({ propsKeys: ["c", "d"] })
    ]
  })
  const testProps = U.snapshot(styleSet)

  testProps({})
  testProps({ a: 1 })
  testProps({ b: 2, d: 4 })
  testProps({ a: 1, b: 2, c: 3, d: 4 })
})

test("respects order of style functions", () => {
  const styleSet = O.compose<any, any>({
    name: "test",
    renderers: [
      O.style({ propsKeys: ["a", "b"], styleKeys: ["z"] }),
      O.style({ propsKeys: ["a", "c"], styleKeys: ["a"] })
    ]
  })
  const testProps = U.snapshot(styleSet)

  testProps({ a: 1 })
  testProps({ b: 2 })
  testProps({ c: 3 })
})

test("deduplicates style functions", () => {
  const styleFunc1 = O.style<any, any>({ propsKeys: ["a", "b"] })
  const styleFunc2 = O.style<any, any>({ propsKeys: ["c", "d"] })
  const styleFunc3 = O.style<any, any>({ propsKeys: ["e", "f"] })

  const styleSet1 = O.compose<any, any>({
    name: "test1",
    renderers: [styleFunc1, styleFunc2, styleFunc1]
  })
  const styleSet2 = O.compose<any, any>({
    name: "test2",
    renderers: [styleFunc2, styleFunc3, styleFunc1]
  })
  const styleSet3 = O.compose<any, any>({
    name: "test3",
    renderers: [styleFunc3, styleSet1, styleSet2]
  })

  const testProps = U.snapshot(styleSet3)

  testProps({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 })
})

test("deduplicates options keys", () => {
  const styleFunc1 = O.style<any, any>({
    propsKeys: ["p1", "p2"],
    styleKeys: ["s1", "s2"],
    themeKeys: ["t1", "t2"]
  })
  const styleFunc2 = O.style<any, any>({
    propsKeys: ["p4", "p2", "p1", "p3"],
    styleKeys: ["s4", "s2", "s1", "s3"],
    themeKeys: ["t4", "t2", "t1", "t3"]
  })
  const styleSet1 = O.compose<any, any>({
    name: "test",
    renderers: [styleFunc1, styleFunc2]
  })
  expect(styleSet1.options.propsKeys).toEqual(["p1", "p2", "p4", "p3"])
  expect(styleSet1.options.styleKeys).toEqual(["s1", "s2", "s4", "s3"])
  expect(styleSet1.options.themeKeys).toEqual(["t1", "t2", "t4", "t3"])
})
