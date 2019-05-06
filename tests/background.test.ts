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
  testProps({ bgp: 100 })
  testProps({ bgp: 0.2 })
  testProps({ bgp: 0 })
  testProps({ bgp: 1 })
})

test("backgroundRepeat", () => {
  const testProps = U.snapshot(S.backgroundRepeat)
  testProps({ backgroundRepeat: "none" })
  testProps({ bgr: "repeat-x" })
})

test("backgroundSize", () => {
  const testProps = U.snapshot(S.backgroundSize)
  testProps({ backgroundSize: "cover" })
  testProps({ backgroundSize: 3 / 4 })
  testProps({ backgroundSize: 0 })
  testProps({ backgroundSize: 1 })
  testProps({ bgs: "contain" })
  testProps({ bgs: 20 })
})

test("backgroundSet", () => {
  const testProps = U.snapshot(S.backgroundSet)
  testProps({
    background: "red url(baz.jpg) center no-repeat",
    backgroundColor: "link",
    backgroundImage: "src(baz.png)",
    backgroundPosition: "left bottom",
    backgroundRepeat: "repeat-y",
    backgroundSize: "cover"
  })
  testProps({
    bg: "bg",
    bgc: "gray.1",
    bgi: "src(zoo.png)",
    bgp: "top right",
    bgr: "repeat-x",
    bgs: "contain"
  })
})
