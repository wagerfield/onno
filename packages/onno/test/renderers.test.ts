import * as O from "../src"
import * as U from "./test-utils"

test("sets the transformer property", () => {
  const styleFunc1 = U.style({})
  const styleFunc2 = U.style({ renderers: [] })
  const styleFunc3 = U.style({ renderers: [O.color] })
  expect(styleFunc1.transformer).toBeUndefined()
  expect(styleFunc2.transformer).toBeUndefined()
  expect(styleFunc3.transformer).toBeDefined()
})

test("transforms style through renderers", () => {
  const base = O.extend({
    transform: O.addPx,
    defaults: [0, 10, 20]
  })
  const renderX = base({
    propsKeys: ["x", "xx"],
    styleKeys: ["xxx"]
  })
  const renderY = base({
    propsKeys: ["y", "yy"],
    styleKeys: ["yyy"]
  })
  const styleFunc = U.style({ renderers: [renderX, renderY] })
  const testProps = U.snapshot(styleFunc)
  testProps({ a: 0 })
  testProps({ b: 2 })
  testProps({ c: -4 })
})

test("renderers can be composed into pipelines", () => {
  const renderX = O.style<any, any>({
    propsKeys: ["x"],
    styleKeys: ["x1", "x2"]
  })
  const renderY = O.style<any, any>({
    propsKeys: ["y"],
    styleKeys: ["y1", "y2"]
  })
  const renderXY = O.style<any, any>({
    propsKeys: ["xy"],
    styleKeys: ["x", "y"],
    renderers: [renderX, renderY]
  })
  const renderAB = O.style<any, any>({
    propsKeys: ["ab"],
    styleKeys: ["cd", "xy"],
    renderers: [renderXY, renderX, renderY]
  })

  // xy > x, y > x1, x2, y1, y2
  const testPropsXY = U.snapshot(renderXY)
  testPropsXY({ xy: "foo" })

  // ab > cd, xy > cd, x, y > cd, x1, x2, y1, y2
  const testPropsAB = U.snapshot(renderAB)
  testPropsAB({ ab: "bar" })
})
