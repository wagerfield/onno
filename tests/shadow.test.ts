import * as S from "../src"
import * as U from "./test-utils"

test("boxShadow", () => {
  const testProps = U.snapshot(S.boxShadow)
  testProps({ boxShadow: "0 1px 2px black" })
  testProps({ bs: "0 0 0 red" })
})

test("textShadow", () => {
  const testProps = U.snapshot(S.textShadow)
  testProps({ textShadow: "0 1px 2px black" })
  testProps({ ts: "0 0 0 red" })
})
