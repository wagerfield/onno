/* eslint-disable @typescript-eslint/no-explicit-any */

export type Nil = null | undefined

export type Obj = Record<string, any>

export type Void<T> = T | undefined

export type Func = (...args: any[]) => any
