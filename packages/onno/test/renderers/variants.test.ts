import * as O from "../../src"
import * as U from "../test-utils"

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
      name: "color-style-brand",
      backgroundColor: "brand",
      color: "white"
    },
    error: {
      name: "color-style-error",
      background: "peach",
      bgc: "status.error",
      bdc: "gray.0",
      tc: "black"
    }
  },
  textStyles: {
    main: {
      name: "text-style-main",
      fontSize: 2,
      fontFamily: "main",
      fontWeight: "normal",
      lineHeight: "normal"
    },
    code: {
      name: "text-style-code",
      ff: "code",
      fs: 0
    },
    caps: {
      name: "text-style-caps",
      fw: "bold",
      tt: "uppercase"
    }
  },
  buttonStyles: {
    primary: {
      "name": "button-style-primary", // should override to "color-style-brand"
      "paddingX": 5,
      "paddingY": 4,
      "borderRadius": 2,
      "colorStyle": "brand",
      "color": "red",
      ":hover": {
        name: "button-style-primary:hover", // should override to "color-style-error"
        colorStyle: "error",
        background: "firestone", // override error color style
        opacity: 0.8
      },
      ":disabled": {
        name: "button-style-primary:disabled", // should override to "text-style-caps"
        cst: "brand",
        tst: "caps",
        fw: 900, // override caps text style
        mx: -4,
        minw: 1 / 4
      }
    },
    secondary: {
      name: "button-style-secondary",
      bgc: "gray.1",
      tc: "black"
    }
  },
  globalStyles: {
    "html": {
      name: "global-style-html",
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
      m: 0,
      mb: 3
    },
    "a": {
      tc: "brand",
      td: "none"
    },
    "pre,code": {
      textStyle: "code", // merge code textStyle
      fontSize: "1rem", // override fontSize
      padding: "0.2em 0.4em" // value is not split
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

test("colorStyle", () => {
  const testProps = U.snapshot(O.colorStyle, false)
  testProps({ colorStyle: "error" })
  testProps({ cst: "foo", theme })
  testProps({ colorStyle: "brand", theme })
  testProps({ cst: { sm: "error", lg: "brand" }, theme })
})

test("textStyle", () => {
  const testProps = U.snapshot(O.textStyle, false)
  testProps({ textStyle: "main" })
  testProps({ tst: "foo", theme })
  testProps({ textStyle: "main", theme })
  testProps({ tst: ["code", "caps"], theme })
})

test("buttonStyle", () => {
  const testProps = U.snapshot(O.buttonStyle, false)
  testProps({ buttonStyle: "primary" })
  testProps({ bst: "foo", theme })
  testProps({ buttonStyle: "primary", theme })
  testProps({ bst: ["secondary", "primary"], theme })
})

test("globalStyle", () => {
  const testProps = U.snapshot(O.globalStyle, false)
  expect(O.globalStyle.transformer).toBeDefined()
  testProps({ globalStyle: "." })
  testProps({ gst: "html", theme })
  testProps({ theme })
})
