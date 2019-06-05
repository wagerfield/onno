import * as O from "../src"
import * as U from "./test-utils"

const theme: O.Theme = {
  fontFamilies: {
    foo: "Foo",
    bar: "Bar"
  },
  fontSizes: {
    sm: 10,
    md: 20,
    lg: 40
  },
  fontWeights: {
    light: 200,
    normal: 500,
    bold: 800
  },
  lineHeights: {
    wide: 2,
    zero: 0
  },
  letterSpacings: {
    sparse: "1em",
    dense: -2
  }
}

test("fontFamily", () => {
  const testProps = U.snapshot(O.fontFamily)
  testProps({ fontFamily: "main" })
  testProps({ ff: "mono" })
  testProps({ ff: "foo", theme })
})

test("fontSize", () => {
  const testProps = U.snapshot(O.fontSize)
  testProps({ fontSize: 0 })
  testProps({ fs: 4 })
  testProps({ fs: "sm", theme })
})

test("fontSmoothing", () => {
  const testProps = U.snapshot(O.fontSmoothing)
  testProps({ fontSmoothing: "antialiased" })
  testProps({ fsm: "subpixel-antialiased" })
})

test("fontStyle", () => {
  const testProps = U.snapshot(O.fontStyle)
  testProps({ fontStyle: "oblique" })
  testProps({ fst: "italic" })
})

test("fontWeight", () => {
  const testProps = U.snapshot(O.fontWeight)
  testProps({ fontWeight: "normal" })
  testProps({ fw: "bold" })
  testProps({ fw: "light", theme })
})

test("lineHeight", () => {
  const testProps = U.snapshot(O.lineHeight)
  testProps({ lineHeight: "normal" })
  testProps({ lh: "narrow" })
  testProps({ lh: "wide", theme })
})

test("letterSpacing", () => {
  const testProps = U.snapshot(O.letterSpacing)
  testProps({ letterSpacing: 0 })
  testProps({ ls: 2 })
  testProps({ ls: "dense", theme })
})

test("textAlign", () => {
  const testProps = U.snapshot(O.textAlign)
  testProps({ textAlign: "center" })
  testProps({ ta: "justify" })
})

test("textDecoration", () => {
  const testProps = U.snapshot(O.textDecoration)
  testProps({ textDecoration: "none" })
  testProps({ td: "underline" })
})

test("textTransform", () => {
  const testProps = U.snapshot(O.textTransform)
  testProps({ textTransform: "lowercase" })
  testProps({ tt: "uppercase" })
})

test("textSet", () => {
  const testProps = U.snapshot(O.textSet)
  testProps({
    fontFamily: "bar",
    fontSize: "lg",
    fontSmoothing: "antialiased",
    fontStyle: "italic",
    fontWeight: "bold",
    lineHeight: "zero",
    letterSpacing: "sparse",
    textAlign: "right",
    textDecoration: "none",
    textTransform: "lowercase",
    color: "link",
    theme
  })
  testProps({
    ff: "Times New Roman",
    fs: "100px",
    fsm: "subpixel-antialiased",
    fst: "normal",
    fw: 100,
    lh: 2,
    ls: "3px",
    ta: "left",
    td: "underline",
    tt: "uppercase",
    tc: "gray.2"
  })
})
