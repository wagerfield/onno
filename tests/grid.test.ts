import * as S from "../src"
import * as U from "./test-utils"

test("grid", () => {
  const testProps = U.snapshot(S.grid)
  testProps({ grid: "foo" })
  testProps({ g: "bar" })
})
