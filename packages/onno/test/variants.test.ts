import * as O from "../src"
import * as U from "./test-utils"

const theme: O.Theme = {
  fontFamilies: {
    heading: "Merriweather",
    body: "Roboto",
    code: "Roboto Mono"
  },
  colors: {
    gray: ["#444", "#888", "#CCC"],
    white: "#FAFAFA",
    black: "#202428",
    brand: "coral",
    status: {
      info: "dodgerblue",
      warning: "orange",
      error: "crimson"
    }
  },
  buttonStyles: {
    primary: {
      "foo": "bar",
      "paddingX": 5,
      "paddingY": 4,
      "borderRadius": 2,
      "fontFamily": "body",
      "fontWeight": "bold",
      "background": "brand",
      "color": "white",
      ":hover": {
        foo: "bar",
        background: "black"
      },
      ":disabled": {
        foo: "bar",
        opacity: 0.5
      }
    },
    secondary: {
      "foo": "bar",
      "width": 0.5,
      "bgc": "gray.1",
      "tt": "uppercase",
      ":active": {
        my: -2,
        px: 4,
        w: 1
      }
    }
  },
  colorStyles: {
    callout: {
      foo: "bar",
      backgroundColor: "brand",
      color: "white"
    },
    error: {
      foo: "bar",
      background: "status.warning",
      backgroundColor: "status.error",
      borderColor: "gray.0",
      color: "black"
    }
  },
  textStyles: {
    body: {
      foo: "bar",
      fontSize: 2,
      fontFamily: "body",
      fontWeight: "normal",
      lineHeight: "normal"
    },
    code: {
      foo: "bar",
      fontFamily: "code"
    },
    heading: {
      foo: "bar",
      fontSize: 5,
      fontFamily: "heading",
      fontWeight: "bold",
      lineHeight: "narrow",
      letterSpacing: 2
    }
  },
  globalStyles: {
    "html": {
      foo: "bar",
      fontFamily: "body",
      lineHeight: "normal",
      fontSize: 2
    },
    "body": {
      bg: "white",
      tc: "black",
      margin: 0
    },
    "h1,h2,h3": {
      ff: "heading",
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
    "a": {
      tc: "brand",
      td: "none"
    },
    "code": {
      ff: "code"
    }
  }
}

test("globalStyle", () => {
  const testProps = U.snapshot(O.globalStyle, false)
  testProps({ globalStyle: "." })
  testProps({ gst: "html", theme })
  testProps({ theme })
})

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
  testProps({ cst: "callout", theme })
  testProps({ cst: { sm: "error", lg: "callout" }, theme })
})

test("textStyle", () => {
  const testProps = U.snapshot(O.textStyle, false)
  testProps({ textStyle: "body" })
  testProps({ tst: "foo", theme })
  testProps({ tst: "body", theme })
  testProps({ tst: ["code", "heading"], theme })
})
