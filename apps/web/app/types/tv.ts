import type { ClassValue } from 'tailwind-variants'

type Id<T> = {} & {
  [P in keyof T]: T[P];
}

export type ComponentSlots<T extends {
  slots?: Record<string, any>
}> = Id<{
  [K in keyof T['slots']]?: ClassValue;
}>
