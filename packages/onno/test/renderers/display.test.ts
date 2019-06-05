import * as O from "../../src"
import * as U from "../test-utils"

test("display", () => {
  const testProps = U.snapshot(O.display)
  testProps({ display: "block" })
  testProps({ d: "inline-block" })
})

test("opacity", () => {
  const testProps = U.snapshot(O.opacity)
  testProps({ opacity: 0.5 })
  testProps({ o: 1 })
  testProps({
    o: "two",
    theme: {
      opacities: {
        one: 0.2,
        two: 0.4
      }
    }
  })
})

test("overflow", () => {
  const testProps = U.snapshot(O.overflow)
  testProps({ overflow: "hidden" })
  testProps({ of: "scroll auto" })
})

test("overflowX", () => {
  const testProps = U.snapshot(O.overflowX)
  testProps({ overflowX: "visible" })
  testProps({ ofx: "clip" })
})

test("overflowY", () => {
  const testProps = U.snapshot(O.overflowY)
  testProps({ overflowY: "hidden" })
  testProps({ ofy: "initial" })
})

test("visibility", () => {
  const testProps = U.snapshot(O.visibility)
  testProps({ visibility: "hidden" })
  testProps({ vis: "visible" })
})

test("overflowSet", () => {
  const testProps = U.snapshot(O.overflowSet)
  testProps({
    overflow: "hidden",
    overflowX: "visible",
    overflowY: "scroll"
  })
  testProps({
    of: "visible",
    ofx: "auto",
    ofy: "clip"
  })
})

test("displaySet", () => {
  const testProps = U.snapshot(O.displaySet)
  testProps({
    display: "block",
    opacity: 0.8,
    overflow: "hidden",
    overflowX: "visible",
    overflowY: "scroll",
    visibility: "hidden"
  })
  testProps({
    d: "flex",
    o: 0.5,
    of: "visible",
    ofx: "auto",
    ofy: "clip",
    vis: "revert"
  })
})
