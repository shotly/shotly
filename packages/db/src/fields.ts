import { sql } from 'drizzle-orm'
import { integer } from 'drizzle-orm/sqlite-core'

export function createdAtField(name = 'created_at') {
  return integer(name).notNull().default(sql`CURRENT_TIMESTAMP`)
}

export function updatedAtField(name = 'updated_at') {
  return integer(name).notNull().default(sql`CURRENT_TIMESTAMP`).$onUpdate(() => sql`CURRENT_TIMESTAMP`)
}
