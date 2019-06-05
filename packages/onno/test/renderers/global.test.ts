import * as O from "../../src"
import * as U from "../test-utils"

test("globalSet", () => {
  const testProps = U.snapshot(O.globalSet)
  testProps({
    border: "1px solid red",
    borderRadius: 4,
    boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
    background: "red url(onno.png) center no-repeat",
    backgroundColor: "gray.0",
    borderColor: "gray.1",
    color: "link",
    opacity: 0.5,
    margin: 0,
    marginX: 1,
    marginY: 2,
    marginTop: 3,
    marginRight: 4,
    marginBottom: 5,
    marginLeft: 6,
    padding: 0,
    paddingX: 1,
    paddingY: 2,
    paddingTop: 3,
    paddingRight: 4,
    paddingBottom: 5,
    paddingLeft: 6,
    size: 0.5,
    width: {
      all: 1,
      md: 1 / 2,
      xl: 1 / 4
    },
    minWidth: 0.25,
    maxWidth: 8,
    height: "auto",
    minHeight: "100vh",
    maxHeight: 1000,
    fontFamily: "main",
    fontSize: [2, 3],
    fontStyle: "italic",
    fontWeight: "bold",
    lineHeight: "normal",
    letterSpacing: 2,
    textAlign: "justify",
    textDecoration: "none",
    textTransform: "uppercase",
    transition: "all 0.1s ease-out"
  })
})
