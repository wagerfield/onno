import type { ClassValue } from "clsx"

// Class Types

export type { ClassValue }

export type ClassKey = "className"

export type ClassProps = Partial<Record<ClassKey, ClassValue>>

// Utility Types

export type Flatten<T> = T extends object ? {} & { [P in keyof T]: T[P] } : T

// Onno Class Types

export type OnnoClassValue = string | string[]

export type OnnoClassProps = Record<ClassKey, OnnoClassValue>

export type OnnoClassMap = Record<string, OnnoClassValue>

// Onno Config Types

export type OnnoVariants = Record<string, OnnoClassValue | OnnoClassMap>

export type OnnoDefaults<T extends OnnoVariants> = {
  [K in keyof T]?: T[K] extends OnnoClassMap ? keyof T[K] : boolean
}

export type OnnoCompound<T extends OnnoVariants> = {
  [K in keyof T]?: T[K] extends OnnoClassMap
    ? keyof T[K] | Array<keyof T[K]>
    : boolean
} & OnnoClassProps

export interface OnnoConfig<T extends OnnoVariants> {
  base?: OnnoClassValue
  compounds?: Flatten<OnnoCompound<T>>[]
  defaults?: Flatten<OnnoDefaults<T>>
  variants: T
}

export type OnnoOptions<T extends OnnoVariants> = OnnoDefaults<T> & ClassProps

// Onno Function Types

export type OnnoFunction<T extends OnnoVariants> = (
  options?: Flatten<OnnoOptions<T>>,
) => string

export type OnnoFactory = <T extends OnnoVariants>(
  config: OnnoConfig<T>,
) => OnnoFunction<T>

// Onno Prop Types

export type OnnoVariantProps<F extends OnnoFunction<any>> = Omit<
  Exclude<Parameters<F>[0], undefined>,
  ClassKey
>

export type OnnoProps<
  F extends OnnoFunction<any>,
  K extends keyof OnnoVariantProps<F> = never,
> = Flatten<
  OnnoVariantProps<F> & Required<Pick<OnnoVariantProps<F>, K>> & ClassProps
>
