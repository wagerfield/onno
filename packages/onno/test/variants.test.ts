import * as O from "../src"
import * as U from "./test-utils"

const theme: O.Theme = {
  buttonStyles: {
    one: {
      "foo": "bar",
      "paddingX": 5,
      "paddingY": 4,
      "borderRadius": 2,
      "fontFamily": "main",
      "fontWeight": "bold",
      "background": "link",
      "color": "#FFF",
      ":hover": {
        fontFamily: "mono",
        background: "gray.2"
      }
    },
    two: {
      "backgroundColor": "gray.1",
      "textTransform": "uppercase",
      "width": 0.5,
      ":active": {
        my: -2,
        px: 4,
        w: 1
      }
    }
  },
  colorStyles: {
    one: {
      background: "link",
      backgroundColor: "gray.2",
      borderColor: "gray.1",
      color: "text"
    },
    two: {
      backgroundColor: "blue",
      borderColor: "aqua",
      color: "black"
    }
  },
  textStyles: {
    one: {
      fontSize: 2,
      fontFamily: "main",
      fontWeight: "bold",
      letterSpacing: 1,
      textTransform: "uppercase"
    },
    two: {
      fontSize: 0,
      fontFamily: "mono",
      fontWeight: "normal",
      letterSpacing: 2,
      textTransform: "lowercase"
    }
  },
  globalStyles: {
    "html": {
      fontFamily: "main",
      lineHeight: "normal",
      fontSize: 2
    },
    "body": {
      background: "#FAFAFA",
      margin: 0
    },
    "h1,h2,h3": {
      lineHeight: "narrow"
    },
    "h1": {
      fontSize: 6
    },
    "h2": {
      fontSize: 5
    },
    "h3": {
      fontSize: 4
    },
    "code": {
      fontFamily: "code"
    }
  }
}

test("globalStyle", () => {
  const testProps = U.snapshot(O.globalStyle, false)
  testProps({ globalStyle: "" })
  testProps({ gst: "", theme })
})

test("buttonStyle", () => {
  const testProps = U.snapshot(O.buttonStyle, false)
  testProps({ buttonStyle: "one" })
  testProps({ bst: "foo", theme })
  testProps({ bst: "one", theme })
  testProps({ bst: ["one", "two"], theme })
})

test("colorStyle", () => {
  const testProps = U.snapshot(O.colorStyle, false)
  testProps({ colorStyle: "one" })
  testProps({ cst: "foo", theme })
  testProps({ cst: "one", theme })
  testProps({ cst: ["one", "two"], theme })
})

test("textStyle", () => {
  const testProps = U.snapshot(O.textStyle, false)
  testProps({ textStyle: "one" })
  testProps({ tst: "foo", theme })
  testProps({ tst: "one", theme })
  testProps({ tst: ["one", "two"], theme })
})
