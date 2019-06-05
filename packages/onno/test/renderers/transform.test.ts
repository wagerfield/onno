import * as O from "../../src"
import * as U from "../test-utils"

test("perspective", () => {
  const testProps = U.snapshot(O.perspective)
  testProps({ perspective: 500 })
  testProps({ ps: 1000 })
})

test("perspectiveOrigin", () => {
  const testProps = U.snapshot(O.perspectiveOrigin)
  testProps({ perspectiveOrigin: "center" })
  testProps({ pso: "100% 50%" })
})

test("transform", () => {
  const testProps = U.snapshot(O.transform)
  testProps({ transform: "scale(0.5)" })
  testProps({ tf: "translate(100px, 25%)" })
})

test("transformOrigin", () => {
  const testProps = U.snapshot(O.transformOrigin)
  testProps({ transformOrigin: "50%" })
  testProps({ tfo: "bottom 50px" })
})

test("transformSet", () => {
  const testProps = U.snapshot(O.transformSet)
  testProps({
    perspective: 500,
    perspectiveOrigin: "center",
    transform: "scale(0.5)",
    transformOrigin: "50%"
  })
  testProps({
    ps: 1000,
    pso: "100% 50%",
    tf: "translate(100px, 25%)",
    tfo: "bottom 50px"
  })
})
