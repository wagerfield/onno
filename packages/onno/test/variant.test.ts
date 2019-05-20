import * as O from "../src"
import * as U from "./test-utils"

test("sets styleKeys to null", () => {
  const styleFunc = O.variant({ propsKeys: ["a"] })
  expect(styleFunc.options.styleKeys).toBeNull()
})

test("returns null for unresolved values", () => {
  const styleFunc = O.variant({ propsKeys: ["a"] })
  const testProps = U.snapshot(styleFunc)
  testProps({ a: "foo" })
})

test("renders style object from defaults", () => {
  const styleFunc = O.variant({
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
  const styleFunc = O.variant({
    propsKeys: ["a", "b"],
    themeKeys: ["var"]
  })
  const theme = {
    var: {
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

describe("variant styles", () => {
  const theme: O.Theme = {
    buttonStyles: {
      one: {
        background: "red",
        color: "white"
      },
      two: {
        background: "blue",
        color: "black"
      }
    },
    colorStyles: {
      one: {
        backgroundColor: "red",
        borderColor: "pink",
        color: "white"
      },
      two: {
        backgroundColor: "blue",
        borderColor: "aqua",
        color: "black"
      }
    },
    textStyles: {
      one: {
        letterSpacing: "1px",
        textTransform: "uppercase"
      },
      two: {
        letterSpacing: "2px",
        textTransform: "lowercase"
      }
    }
  }

  test("buttonStyle", () => {
    const testProps = U.snapshot(O.buttonStyle)
    testProps({ buttonStyle: "one" })
    testProps({ bst: "foo", theme })
    testProps({ bst: "one", theme })
    testProps({ bst: ["one", "two"], theme })
  })

  test("colorStyle", () => {
    const testProps = U.snapshot(O.colorStyle)
    testProps({ colorStyle: "one" })
    testProps({ cst: "foo", theme })
    testProps({ cst: "one", theme })
    testProps({ cst: ["one", "two"], theme })
  })

  test("textStyle", () => {
    const testProps = U.snapshot(O.textStyle)
    testProps({ textStyle: "one" })
    testProps({ tst: "foo", theme })
    testProps({ tst: "one", theme })
    testProps({ tst: ["one", "two"], theme })
  })
})
