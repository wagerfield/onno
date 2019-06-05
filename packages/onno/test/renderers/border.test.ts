import * as O from "../../src"
import * as U from "../test-utils"

const theme: O.Theme = {
  borders: {
    one: "1px solid gold",
    two: "2px dashed red"
  },
  borderStyles: {
    one: "solid",
    two: "hidden"
  },
  borderWidths: {
    one: 11,
    two: 22
  },
  borderRadii: [111, 222]
}

test("border", () => {
  const testProps = U.snapshot(O.border)
  testProps({ border: "1px solid red" })
  testProps({ bd: "one", theme })
})

test("borderTop", () => {
  const testProps = U.snapshot(O.borderTop)
  testProps({ borderTop: "2px dashed green" })
  testProps({ bdt: "two", theme })
})

test("borderRight", () => {
  const testProps = U.snapshot(O.borderRight)
  testProps({ borderRight: "3px dotted blue" })
  testProps({ bdr: "one", theme })
})

test("borderBottom", () => {
  const testProps = U.snapshot(O.borderBottom)
  testProps({ borderBottom: "4px double orange" })
  testProps({ bdb: "two", theme })
})

test("borderLeft", () => {
  const testProps = U.snapshot(O.borderLeft)
  testProps({ borderLeft: "5px groove purple" })
  testProps({ bdl: "one", theme })
})

test("borderStyle", () => {
  const testProps = U.snapshot(O.borderStyle)
  testProps({ borderStyle: "dotted" })
  testProps({ bds: "two", theme })
})

test("borderWidth", () => {
  const testProps = U.snapshot(O.borderWidth)
  testProps({ borderWidth: "5%" })
  testProps({ bdw: "two", theme })
})

test("borderRadius", () => {
  const testProps = U.snapshot(O.borderRadius)
  testProps({ borderRadius: 10, theme })
  testProps({ borderRadius: 4, theme })
  testProps({ rad: 0.5, theme })
  testProps({ rad: 0, theme })
  testProps({ rad: 1, theme })
})

test("borderSet", () => {
  const testProps = U.snapshot(O.borderSet)
  testProps({
    theme,
    border: "1px solid red",
    borderTop: "dashed",
    borderRight: "5px blue",
    borderBottom: "one",
    borderLeft: "two",
    borderColor: "gray.2",
    borderStyle: "two",
    borderWidth: 2,
    borderRadius: 1 / 4
  })
  testProps({
    theme,
    bd: "one",
    bdt: "two",
    bdr: 1,
    bdb: 10,
    bdl: "1px dotted lime",
    bdc: "#0FF",
    bds: "inset",
    bdw: "two",
    rad: 0
  })
})
