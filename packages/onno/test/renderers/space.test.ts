import * as O from "../../src"
import * as U from "../test-utils"

const theme: O.Theme = {
  spaces: [10, 20, 30]
}

test("marginTop", () => {
  const testProps = U.snapshot(O.marginTop)
  testProps({ marginTop: 0 })
  testProps({ mt: 1 })
})

test("marginRight", () => {
  const testProps = U.snapshot(O.marginRight)
  testProps({ marginRight: 2 })
  testProps({ mr: 3 })
})

test("marginBottom", () => {
  const testProps = U.snapshot(O.marginBottom)
  testProps({ marginBottom: 4 })
  testProps({ mb: 5 })
})

test("marginLeft", () => {
  const testProps = U.snapshot(O.marginLeft)
  testProps({ marginLeft: 6 })
  testProps({ ml: 7 })
})

test("marginX", () => {
  const testProps = U.snapshot(O.marginX)
  testProps({ marginX: 8 })
  testProps({ mx: 9 })
})

test("marginY", () => {
  const testProps = U.snapshot(O.marginY)
  testProps({ marginY: 10 })
  testProps({ my: "20rem" })
})

test("margin", () => {
  const testProps = U.snapshot(O.margin)
  testProps({ margin: "10%" })
  testProps({ m: "auto" })
  testProps({ m: 2, theme })
  testProps({ m: 3, theme })
})

test("paddingTop", () => {
  const testProps = U.snapshot(O.paddingTop)
  testProps({ paddingTop: 0 })
  testProps({ pt: 1 })
})

test("paddingRight", () => {
  const testProps = U.snapshot(O.paddingRight)
  testProps({ paddingRight: 2 })
  testProps({ pr: 3 })
})

test("paddingBottom", () => {
  const testProps = U.snapshot(O.paddingBottom)
  testProps({ paddingBottom: 4 })
  testProps({ pb: 5 })
})

test("paddingLeft", () => {
  const testProps = U.snapshot(O.paddingLeft)
  testProps({ paddingLeft: 6 })
  testProps({ pl: 7 })
})

test("paddingX", () => {
  const testProps = U.snapshot(O.paddingX)
  testProps({ paddingX: 8 })
  testProps({ px: 9 })
})

test("paddingY", () => {
  const testProps = U.snapshot(O.paddingY)
  testProps({ paddingY: 10 })
  testProps({ py: "20rem" })
})

test("padding", () => {
  const testProps = U.snapshot(O.padding)
  testProps({ padding: "10%" })
  testProps({ p: "auto" })
  testProps({ p: 2, theme })
  testProps({ p: 3, theme })
})

test("marginSet", () => {
  const testProps = U.snapshot(O.marginSet)
  testProps({
    margin: 0,
    marginX: 1,
    marginY: 2,
    marginTop: 3,
    marginRight: 4,
    marginBottom: 5,
    marginLeft: 6
  })
  testProps({
    m: 0,
    mx: 1,
    my: 2,
    mt: 3,
    mr: 4,
    mb: 5,
    ml: 6
  })
})

test("paddingSet", () => {
  const testProps = U.snapshot(O.paddingSet)
  testProps({
    padding: 0,
    paddingX: 1,
    paddingY: 2,
    paddingTop: 3,
    paddingRight: 4,
    paddingBottom: 5,
    paddingLeft: 6
  })
  testProps({
    p: 7,
    px: 8,
    py: 9,
    pt: 10,
    pr: "10em",
    pb: "20%",
    pl: "auto"
  })
})

test("spaceSet", () => {
  const testProps = U.snapshot(O.spaceSet)
  testProps({
    margin: 0,
    marginX: 1,
    marginY: 2,
    marginTop: 3,
    marginRight: 4,
    marginBottom: 5,
    marginLeft: 6,
    padding: 7,
    paddingX: 8,
    paddingY: 9,
    paddingTop: 10,
    paddingRight: "10em",
    paddingBottom: "20%",
    paddingLeft: "auto"
  })
  testProps({
    m: 0,
    mx: 1,
    my: 2,
    mt: 3,
    mr: 4,
    mb: 5,
    ml: 6,
    p: 7,
    px: 8,
    py: 9,
    pt: 10,
    pr: "10em",
    pb: "20%",
    pl: "auto"
  })
})
