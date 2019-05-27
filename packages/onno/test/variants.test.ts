import * as O from "../src"
import * as U from "./test-utils"

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
