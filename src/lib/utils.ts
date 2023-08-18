/* eslint-disable @typescript-eslint/no-explicit-any */

import { browser } from "$app/environment"
import type { Nil, Obj } from "./types"

// Flags

export const isClient = browser ? true : false

export const isServer = browser ? false : true

// General

export const noop = () => {}

export const identity = <T>(x: T): T => x

// Guards

export const isNil = (x: unknown): x is Nil => x === null || x === undefined

export const isBoolean = (x: unknown): x is boolean => typeof x === "boolean"

export const isNumber = (x: unknown): x is number => typeof x === "number"

export const isString = (x: unknown): x is string => typeof x === "string"

export const isArray = (x: unknown): x is any[] => Array.isArray(x)

export const isObject = (x: unknown): x is Obj =>
  x != null && typeof x === "object" && !isArray(x)

// Aliases

export const now = isClient ? performance.now : Date.now

export const raf = isClient ? requestAnimationFrame : noop

export const caf = isClient ? cancelAnimationFrame : noop
