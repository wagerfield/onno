import * as S from "../src"
import * as U from "./test-utils"

test("backgroundColor", () => {
  const testProps = U.snapshot(S.backgroundColor)
  testProps({ backgroundColor: "red" })
  testProps({ bgc: "bg" })
})

test("borderColor", () => {
  const testProps = U.snapshot(S.borderColor)
  testProps({ borderColor: "gray.1" })
  testProps({ bc: "blue" })
})

test("textColor", () => {
  const testProps = U.snapshot(S.textColor)
  testProps({ color: "rgba(255,0,0,0.5)" })
  testProps({ tc: "text" })
})

test("color", () => {
  const testProps = U.snapshot(S.color)
  testProps({
    backgroundColor: "red",
    borderColor: "lime",
    color: "blue"
  })
  testProps({
    bgc: "red",
    bc: "lime",
    tc: "blue"
  })
})
