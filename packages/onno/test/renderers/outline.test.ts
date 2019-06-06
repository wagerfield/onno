import * as O from "../../src"
import * as U from "../test-utils"

const theme: O.Theme = {
  outlines: {
    one: "1px solid gold",
    two: "2px dashed red"
  },
  outlineOffsets: {
    one: 4,
    two: -2
  },
  outlineStyles: {
    one: "solid",
    two: "dashed"
  },
  outlineWidths: {
    one: 11,
    two: 22
  }
}

test("outline", () => {
  const testProps = U.snapshot(O.outline)
  testProps({ outline: "4px dotted orange" })
  testProps({ ol: "one", theme })
})

test("outlineOffset", () => {
  const testProps = U.snapshot(O.outlineOffset)
  testProps({ outlineOffset: 10 })
  testProps({ olo: "two", theme })
})

test("outlineStyle", () => {
  const testProps = U.snapshot(O.outlineStyle)
  testProps({ outlineStyle: "dotted" })
  testProps({ ols: "one", theme })
})

test("outlineWidth", () => {
  const testProps = U.snapshot(O.outlineWidth)
  testProps({ outlineWidth: 4 })
  testProps({ olw: "two", theme })
})

test("outlineSet", () => {
  const testProps = U.snapshot(O.outlineSet)
  testProps({
    theme,
    outline: "10px inset crimson",
    outlineColor: "gray.2",
    outlineOffset: "-1rem",
    outlineStyle: "groove",
    outlineWidth: 0
  })
  testProps({
    theme,
    ol: "two",
    olc: "link",
    olo: "one",
    ols: "two",
    olw: "one"
  })
})
