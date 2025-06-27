import { cuid2 } from 'drizzle-cuid2/sqlite'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createdAtField, updatedAtField } from './fields'

export const users = sqliteTable('users', {
  id: cuid2('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role', { enum: ['admin', 'user'] }).notNull().default('user'),
  createdAt: createdAtField(),
  updatedAt: updatedAtField(),
})
