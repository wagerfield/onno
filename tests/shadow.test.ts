import * as S from "../src"
import * as U from "./test-utils"

const theme: S.Theme = {
  boxShadows: {
    one: "box-shadow-one",
    two: "box-shadow-two"
  },
  textShadows: {
    one: "text-shadow-one",
    two: "text-shadow-two"
  }
}

test("boxShadow", () => {
  const testProps = U.snapshot(S.boxShadow)
  testProps({ boxShadow: "0 1px 2px black" })
  testProps({ bsh: "0 0 0 red" })
  testProps({ bsh: "one", theme })
})

test("textShadow", () => {
  const testProps = U.snapshot(S.textShadow)
  testProps({ textShadow: "0 1px 2px black" })
  testProps({ tsh: "0 0 0 red" })
  testProps({ tsh: "two", theme })
})
