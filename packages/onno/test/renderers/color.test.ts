import * as O from "../../src"
import * as U from "../test-utils"

const theme: O.Theme = {
  colors: {
    r: "#F00",
    g: "#0F0",
    b: "#00F"
  }
}

test("background", () => {
  const testProps = U.snapshot(O.background)
  testProps({ background: "red" })
  testProps({ bg: "link" })
  testProps({ bg: "g", theme })
})

test("backgroundColor", () => {
  const testProps = U.snapshot(O.backgroundColor)
  testProps({ backgroundColor: "red" })
  testProps({ bgc: "link" })
  testProps({ bgc: "r", theme })
})

test("borderColor", () => {
  const testProps = U.snapshot(O.borderColor)
  testProps({ borderColor: "gray.1" })
  testProps({ bdc: "blue" })
  testProps({ bdc: "b", theme })
})

test("color", () => {
  const testProps = U.snapshot(O.color)
  testProps({ color: "rgba(255,0,0,0.5)" })
  testProps({ tc: "text" })
  testProps({ tc: "r", theme })
})

test("fill", () => {
  const testProps = U.snapshot(O.fill)
  testProps({ fill: "link" })
  testProps({ fc: "crimson" })
  testProps({ fc: "black", theme })
})

test("outlineColor", () => {
  const testProps = U.snapshot(O.outlineColor)
  testProps({ outlineColor: "gray.0" })
  testProps({ olc: "plum" })
  testProps({ olc: "g", theme })
})

test("colorSet", () => {
  const testProps = U.snapshot(O.colorSet)
  testProps({
    background: "gray.0",
    backgroundColor: "link",
    borderColor: "lime",
    color: "blue",
    fill: "orange",
    outlineColor: "text"
  })
  testProps({
    bg: "purple",
    bgc: "r",
    bdc: "g",
    tc: "b",
    fc: "sage",
    olc: "coral",
    theme
  })
})
