import * as S from "../src"
import * as U from "./test-utils"

test("backgroundImage", () => {
  const testProps = U.snapshot(S.backgroundImage)
  testProps({ backgroundImage: "src(foo.png)" })
  testProps({ bgi: "src(bar.png)" })
})

test("backgroundPosition", () => {
  const testProps = U.snapshot(S.backgroundPosition)
  testProps({ backgroundPosition: "center" })
  testProps({ bgp: "0 50%" })
})

test("backgroundRepeat", () => {
  const testProps = U.snapshot(S.backgroundRepeat)
  testProps({ backgroundRepeat: "none" })
  testProps({ bgr: "repeat-x" })
})

test("backgroundSize", () => {
  const testProps = U.snapshot(S.backgroundSize)
  testProps({ backgroundSize: "cover" })
  testProps({ bgs: "contain" })
})

test("background", () => {
  const testProps = U.snapshot(S.background)
  testProps({
    backgroundColor: "link",
    backgroundImage: "src(baz.png)",
    backgroundPosition: "left bottom",
    backgroundRepeat: "repeat-y",
    backgroundSize: "cover"
  })
  testProps({
    bgc: "gray.1",
    bgi: "src(zoo.png)",
    bgp: "top right",
    bgr: "repeat-x",
    bgs: "contain"
  })
})
