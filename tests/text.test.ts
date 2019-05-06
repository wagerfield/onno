import * as S from "../src"
import * as U from "./test-utils"

const theme: S.Theme = {
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
  const testProps = U.snapshot(S.fontFamily)
  testProps({ fontFamily: "text" })
  testProps({ ff: "mono" })
  testProps({ ff: "foo", theme })
})

test("fontSize", () => {
  const testProps = U.snapshot(S.fontSize)
  testProps({ fontSize: 0 })
  testProps({ fs: 4 })
  testProps({ fs: "sm", theme })
})

test("fontStyle", () => {
  const testProps = U.snapshot(S.fontStyle)
  testProps({ fontStyle: "oblique" })
  testProps({ fst: "italic" })
})

test("fontWeight", () => {
  const testProps = U.snapshot(S.fontWeight)
  testProps({ fontWeight: "normal" })
  testProps({ fw: "bold" })
  testProps({ fw: "light", theme })
})

test("lineHeight", () => {
  const testProps = U.snapshot(S.lineHeight)
  testProps({ lineHeight: "normal" })
  testProps({ lh: "narrow" })
  testProps({ lh: "wide", theme })
})

test("letterSpacing", () => {
  const testProps = U.snapshot(S.letterSpacing)
  testProps({ letterSpacing: 0 })
  testProps({ ls: 2 })
  testProps({ ls: "dense", theme })
})

test("textAlign", () => {
  const testProps = U.snapshot(S.textAlign)
  testProps({ textAlign: "center" })
  testProps({ ta: "justify" })
})

test("textSet", () => {
  const testProps = U.snapshot(S.textSet)
  testProps({
    fontFamily: "bar",
    fontSize: "lg",
    fontStyle: "italic",
    fontWeight: "bold",
    lineHeight: "zero",
    letterSpacing: "sparse",
    textAlign: "right",
    color: "link",
    theme
  })
  testProps({
    ff: "Times New Roman",
    fs: "100px",
    fst: "normal",
    fw: 100,
    lh: 2,
    ls: "3px",
    ta: "left",
    tc: "gray.2"
  })
})
