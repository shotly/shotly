import { cuid2 } from 'drizzle-cuid2/postgres'
import { index, pgEnum, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const userRole = pgEnum('user_roles', ['admin', 'user'])

export const users = pgTable('users', {
  id: cuid2('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').unique().notNull(),
  password: varchar('password').notNull(),
  role: userRole('role').notNull().default('user'),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
}, (table) => [
  index('users_name_idx').on(table.name),
])
