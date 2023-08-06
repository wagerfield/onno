import { describe, expect, it } from "vitest"
import { onno } from "./onno"

describe("onno(config)", () => {
  it("expects one argument", () => {
    expect(onno).toHaveLength(1)
  })

  it("returns a function", () => {
    const fn = onno({ variants: {} })

    expect(fn).toEqual(expect.any(Function))
    expect(fn).toHaveLength(1)
  })

  it("throws an error for 'className' variant", () => {
    const fn = () => onno({ variants: { className: "not allowed" } })

    expect(fn).toThrow(`"className" cannot be used as a variant name`)
  })

  it("returns baseline string", () => {
    const fn = onno({
      baseline: "base",
      variants: {},
    })

    expect(fn()).toBe("base")
  })

  it("returns baseline string array", () => {
    const fn = onno({
      baseline: ["base", "classes"],
      variants: {},
    })

    expect(fn()).toBe("base classes")
  })

  it("adds className from options", () => {
    const fn = onno({
      baseline: "base",
      variants: {},
    })

    expect(fn({ className: "with className" })).toBe("base with className")
    expect(fn({ className: ["with", "className"] })).toBe("base with className")
  })

  it("supports boolean variants", () => {
    const fn = onno({
      variants: {
        hidden: "invisible",
        disabled: ["not", "allowed"],
      },
    })

    expect(fn()).toBe("")
    expect(fn({ hidden: false })).toBe("")
    expect(fn({ hidden: true })).toBe("invisible")
    expect(fn({ disabled: true })).toBe("not allowed")
    expect(fn({ hidden: true, disabled: true })).toBe("invisible not allowed")
  })

  it("supports mapped variants", () => {
    const fn = onno({
      variants: {
        size: {
          sm: "pretty small",
          lg: ["really", "large"],
        },
      },
    })

    expect(fn()).toBe("")
    expect(fn({ size: "sm" })).toBe("pretty small")
    expect(fn({ size: "lg" })).toBe("really large")
  })

  it("combines boolean and mapped variants", () => {
    const fn = onno({
      variants: {
        hidden: "invisible",
        size: {
          sm: "small",
          lg: "large",
        },
      },
    })

    expect(fn({ size: "sm", hidden: true })).toBe("invisible small")
  })

  it("combines baseline and variant classes", () => {
    const fn = onno({
      baseline: "base",
      variants: {
        hidden: "invisible",
        size: {
          sm: "small",
          lg: "large",
        },
      },
    })

    expect(fn({ size: "lg", hidden: true })).toBe("base invisible large")
  })

  it("supports default variants", () => {
    const fn = onno({
      baseline: "base",
      defaults: {
        size: "sm",
        jazzy: true,
      },
      variants: {
        hidden: "invisible",
        jazzy: "party",
        size: {
          sm: "small",
          lg: "large",
        },
      },
    })

    expect(fn()).toBe("base party small")
    expect(fn({ jazzy: false })).toBe("base small")
    expect(fn({ size: "lg" })).toBe("base party large")
    expect(fn({ hidden: true })).toBe("base invisible party small")
    expect(fn({ size: "lg", hidden: true })).toBe("base invisible party large")
  })

  it("supports compound variants", () => {
    const fn = onno({
      baseline: "base",
      defaults: {
        size: "md",
      },
      variants: {
        hidden: "invisible",
        intent: {
          primary: "bold",
          secondary: "muted",
        },
        size: {
          sm: "small",
          md: "medium",
          lg: "large",
        },
      },
      compound: [
        {
          size: "sm",
          hidden: true,
          className: "hide",
        },
        {
          size: ["sm", "md"],
          intent: "primary",
          className: "highlight",
        },
      ],
    })

    expect(fn()).toBe("base medium")
    expect(fn({ intent: "primary" })).toBe("base bold medium highlight")
    expect(fn({ size: "sm", hidden: true })).toBe("base invisible small hide")
    expect(fn({ size: "sm", intent: "primary", hidden: true })).toBe(
      "base invisible bold small hide highlight",
    )
  })
})
