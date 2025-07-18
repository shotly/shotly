import { consola } from 'consola'

export const logger = consola.create({
  level: import.meta.dev ? 4 : 1,
})
