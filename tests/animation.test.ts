import * as S from "../src"
import * as U from "./test-utils"

const theme: S.Theme = {
  animations: {
    one: "animation-one",
    two: "animation-two"
  },
  transitions: {
    one: "transition-one",
    two: "transition-two"
  }
}

test("animation", () => {
  const testProps = U.snapshot(S.animation)
  testProps({ animation: "foo", theme })
  testProps({ animation: "one", theme })
})

test("transition", () => {
  const testProps = U.snapshot(S.transition)
  testProps({ transition: "bar", theme })
  testProps({ transition: "two", theme })
})
