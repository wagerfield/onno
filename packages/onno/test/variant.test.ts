import * as O from "../src"
import * as U from "./test-utils"

test("sets styleKeys to null", () => {
  const styleFunc = O.variant<any, any>({ propsKeys: ["a"] })
  expect(styleFunc.options.styleKeys).toBeNull()
})

test("returns null for unresolved values", () => {
  const styleFunc = O.variant<any, any>({ propsKeys: ["a"] })
  expect(styleFunc({ a: "foo" })).toBeNull()
})

test("renders style object from defaults", () => {
  const styleFunc = O.variant<any, any>({
    propsKeys: ["a", "b"],
    defaults: {
      foo: {
        background: "foo",
        color: "foo"
      },
      bar: {
        background: "bar",
        color: "bar"
      }
    }
  })
  const testProps = U.snapshot(styleFunc)
  testProps({ a: "foo" })
  testProps({ b: "bar" })
})

test("renders style object from theme", () => {
  const styleFunc = O.variant<any, any>({
    propsKeys: ["a", "b"],
    themeKeys: ["testStyles"]
  })
  const theme = {
    testStyles: {
      foo: {
        background: "foo",
        color: "foo"
      },
      bar: {
        background: "bar",
        color: "bar"
      }
    }
  }
  const testProps = U.snapshot(styleFunc)
  testProps({ a: "foo", theme })
  testProps({ b: "bar", theme })
})

test("transforms values through renderers", () => {
  const styleFunc = O.variant<any, any>({
    propsKeys: ["a", "b"],
    themeKeys: ["testStyles"],
    renderers: [O.color, O.width]
  })
  const theme = {
    testStyles: {
      foo: {
        color: "text",
        width: 0.5
      },
      bar: {
        color: "link",
        width: 8
      }
    }
  }
  const testProps = U.snapshot(styleFunc)
  expect(styleFunc.transformer).toBeDefined()
  testProps({ a: "foo", theme })
  testProps({ b: "bar", theme })
})
