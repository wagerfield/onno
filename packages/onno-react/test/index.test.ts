import * as O from "../src"
import { checkPropTypes, resetWarningCache } from "prop-types"

const propTypesA = O.propTypes([O.display, O.opacity, O.padding])
const propTypesB = O.propTypes(O.display, O.opacity, O.padding)

test("returns propTypes object", () => {
  expect(propTypesA).toMatchSnapshot("array")
  expect(propTypesB).toMatchSnapshot("args")
})

test("warns about invalid props", () => {
  const noop = () => null
  const spy = jest.spyOn(global.console, "error").mockImplementation(noop)

  const validProps = {
    display: "foo",
    opacity: ["bar"],
    padding: { sm: "baz" }
  }

  const invalidProps = {
    display: true,
    opacity: [true],
    padding: { sm: true }
  }

  checkPropTypes(propTypesA, validProps, "prop", "TestComponent")
  checkPropTypes(propTypesA, invalidProps, "prop", "TestComponent")
  resetWarningCache()

  checkPropTypes(propTypesB, validProps, "prop", "TestComponent")
  checkPropTypes(propTypesB, invalidProps, "prop", "TestComponent")
  resetWarningCache()

  expect(spy).toHaveBeenCalledTimes(6)

  spy.mockRestore()
})
