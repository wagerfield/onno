import * as S from "../src"
import * as U from "./test-utils"

test("backgroundColor", () => {
  const testProps = U.snapshot(S.backgroundColor)
  testProps({ backgroundColor: "red" })
  testProps({ bgc: "blue" })
})

test("borderColor", () => {
  const testProps = U.snapshot(S.borderColor)
  testProps({ borderColor: "red" })
  testProps({ bc: "blue" })
})

test("textColor", () => {
  const testProps = U.snapshot(S.textColor)
  testProps({ color: "red" })
  testProps({ tc: "blue" })
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
