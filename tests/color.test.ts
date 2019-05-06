import * as S from "../src"
import * as U from "./test-utils"

const theme: S.Theme = {
  colors: {
    r: "#F00",
    g: "#0F0",
    b: "#00F"
  }
}

test("background", () => {
  const testProps = U.snapshot(S.background)
  testProps({ background: "red" })
  testProps({ bg: "link" })
  testProps({ bg: "g", theme })
})

test("backgroundColor", () => {
  const testProps = U.snapshot(S.backgroundColor)
  testProps({ backgroundColor: "red" })
  testProps({ bgc: "bg" })
  testProps({ bgc: "r", theme })
})

test("borderColor", () => {
  const testProps = U.snapshot(S.borderColor)
  testProps({ borderColor: "gray.1" })
  testProps({ bdc: "blue" })
  testProps({ bdc: "b", theme })
})

test("color", () => {
  const testProps = U.snapshot(S.color)
  testProps({ color: "rgba(255,0,0,0.5)" })
  testProps({ tc: "text" })
  testProps({ tc: "r", theme })
})

test("colorSet", () => {
  const testProps = U.snapshot(S.colorSet)
  testProps({
    background: "gray.0",
    backgroundColor: "bg",
    borderColor: "lime",
    color: "blue"
  })
  testProps({
    bg: "purple",
    bgc: "r",
    bdc: "g",
    tc: "b",
    theme
  })
})
