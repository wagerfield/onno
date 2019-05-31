import * as O from "../src"
import * as U from "./test-utils"

const theme: O.Theme = {
  fontFamilies: {
    main: "Roboto",
    code: "Roboto Mono"
  },
  colors: {
    gray: ["#444", "#888", "#CCC"],
    black: "#202428",
    white: "ivory",
    brand: "coral",
    status: {
      info: "dodgerblue",
      error: "crimson"
    }
  },
  colorStyles: {
    brand: {
      foo: "bar",
      backgroundColor: "brand",
      color: "white"
    },
    error: {
      foo: "bar",
      background: "peach",
      bgc: "status.error",
      bdc: "gray.0",
      tc: "black"
    }
  },
  textStyles: {
    main: {
      foo: "bar",
      fontSize: 2,
      fontFamily: "main",
      fontWeight: "normal",
      lineHeight: "normal"
    },
    code: {
      foo: "bar",
      ff: "code"
    },
    caps: {
      foo: "bar",
      fw: "bold",
      tt: "uppercase"
    }
  },
  buttonStyles: {
    primary: {
      "foo": "bar",
      "paddingX": 5,
      "paddingY": 4,
      "borderRadius": 2,
      "colorStyle": "brand",
      "textStyle": "main",
      ":hover": {
        background: "white",
        color: "brand"
      },
      ":disabled": {
        foo: "bar",
        px: 50,
        w: 0.5,
        o: 0.5
      }
    },
    secondary: {
      bgc: "gray.1",
      tc: "black"
    }
  },
  globalStyles: {
    "html": {
      foo: "bar",
      textStyle: "main"
    },
    "body": {
      bg: "white",
      tc: "black",
      margin: 0
    },
    "h1,h2,h3": {
      lh: "narrow"
    },
    "h1": {
      fs: 6
    },
    "h2": {
      fs: 5
    },
    "h3": {
      fs: 4
    },
    // "padding" should be transformed
    "padding": 1,
    // "py" should be mapped to "paddingTop"
    // and "paddingBottom" then deleted
    "py": 2,
    // "p" is shorthand for "padding" but
    // should not be deleted since it is
    // assigned to an object
    "p": {
      m: 3
    },
    "a": {
      tc: "brand",
      td: "none"
    },
    "pre,code": {
      // merge code textStyle
      tst: "code",
      // override fontSize
      fontSize: 1,
      // value is not split
      padding: "0.2em 0.4em"
    },
    "button": {
      // merge secondary buttonStyle
      bst: "primary",
      // merge error colorStyle
      cst: "error",
      // set borderColor
      borderColor: "status.info"
    }
  }
}

test("buttonStyle", () => {
  const testProps = U.snapshot(O.buttonStyle, false)
  testProps({ buttonStyle: "primary" })
  testProps({ bst: "foo", theme })
  testProps({ bst: "primary", theme })
  testProps({ bst: ["secondary", "primary"], theme })
})

test("colorStyle", () => {
  const testProps = U.snapshot(O.colorStyle, false)
  testProps({ colorStyle: "error" })
  testProps({ cst: "foo", theme })
  testProps({ cst: "brand", theme })
  testProps({ cst: { sm: "error", lg: "brand" }, theme })
})

test("textStyle", () => {
  const testProps = U.snapshot(O.textStyle, false)
  testProps({ textStyle: "main" })
  testProps({ tst: "foo", theme })
  testProps({ tst: "main", theme })
  testProps({ tst: ["code", "caps"], theme })
})

test("globalStyle", () => {
  const testProps = U.snapshot(O.globalStyle, false)
  testProps({ globalStyle: "." })
  testProps({ gst: "html", theme })
  testProps({ theme })
})
