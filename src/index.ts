import { clsx } from "clsx"
export { clsx } from "clsx"

export * from "./types"

import type { OnnoFactory, OnnoClassValue } from "./types"

const matches = (c: any, o: any) => (Array.isArray(c) ? c.includes(o) : c === o)

export const onno: OnnoFactory = ({
  compound = [],
  baseline,
  defaults,
  variants,
}) => {
  if (variants.className) {
    throw new Error(`"className" cannot be used as a variant name`)
  }

  const cl = compound.length || 1
  const cn = compound.map((c) => c.className)

  return (options) => {
    const vc: OnnoClassValue = []
    const cc = [...cn]

    for (let i = 0; i < cl; i++) {
      for (const k in variants) {
        const o = options?.[k] ?? defaults?.[k]
        const c = compound[i]?.[k]
        const v = variants[k]

        if (!i && o && v) vc.push((v as any)[o] ?? v) // variant classes
        if (c && cc[i] && !matches(c, o)) cc[i] = "" // compound classes
      }
    }

    return clsx(baseline, vc, cc, options?.className)
  }
}
