import * as S from "../src"
import * as U from "./test-utils"

test("fontFamily", () => {
  const testProps = U.snapshot(S.fontFamily)
  testProps({ fontFamily: "text" })
  testProps({ ff: "mono" })
})

test("fontSize", () => {
  const testProps = U.snapshot(S.fontSize)
  testProps({ fontSize: 0 })
  testProps({ fs: 4 })
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
})

test("lineHeight", () => {
  const testProps = U.snapshot(S.lineHeight)
  testProps({ lineHeight: "normal" })
  testProps({ lh: "narrow" })
})

test("letterSpacing", () => {
  const testProps = U.snapshot(S.letterSpacing)
  testProps({ letterSpacing: 0 })
  testProps({ ls: 2 })
})

test("textAlign", () => {
  const testProps = U.snapshot(S.textAlign)
  testProps({ textAlign: "center" })
  testProps({ ta: "justify" })
})

test("textSet", () => {
  const testProps = U.snapshot(S.textSet)
  testProps({
    fontFamily: "Roboto Mono",
    fontSize: "3rem",
    fontStyle: "italic",
    fontWeight: 300,
    lineHeight: "2em",
    letterSpacing: "0.5em",
    textAlign: "right",
    color: "link"
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
