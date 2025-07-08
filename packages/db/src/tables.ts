import { cuid2 } from 'drizzle-cuid2/postgres'
import { relations } from 'drizzle-orm'
import { boolean, index, pgEnum, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const userRole = pgEnum('user_roles', ['admin', 'user'])
export const webhookEvents = pgEnum('webhook_events', [
  'bookmarkCreated',
  'bookmarkDeleted',
  'collectionCreated',
  'collectionDeleted',
])

export const users = pgTable('users', {
  id: cuid2('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').unique().notNull(),
  role: userRole('role').notNull().default('user'),
  avatarUrl: varchar('avatar_url'),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
  lastSeenAt: timestamp('last_seen_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index('users_name_idx').on(table.name),
])

export const apiKeys = pgTable('api_keys', {
  id: cuid2('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  key: varchar('key').notNull().unique(),
  lastUsedAt: timestamp('last_used_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
  expiresAt: timestamp('expires_at', { mode: 'string', withTimezone: true }),
  userId: varchar('user_id').notNull().references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
})

export const webhooks = pgTable('webhooks', {
  id: cuid2('id').defaultRandom().primaryKey(),
  url: varchar('url').notNull(),
  events: webhookEvents('events').array().notNull(),
  secret: varchar('secret').notNull(),
  userId: varchar('user_id').notNull().references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
})

export const collections = pgTable('collections', {
  id: cuid2('id').defaultRandom().primaryKey(),
  userId: varchar('user_id').references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
  icon: varchar('icon'),
  isShared: boolean('is_shared').notNull().default(false),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
})

export const bookmarks = pgTable('bookmarks', {
  id: cuid2('id').defaultRandom().primaryKey(),
  url: varchar('url').notNull(),
  title: varchar('title').notNull(),
  description: varchar('description'),
  thumbnailUrl: varchar('thumbnail_url'),
  isFavorite: boolean('is_favorite').notNull().default(false),
  collectionId: varchar('collection_id').references(() => collections.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  userId: varchar('user_id').references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
})

export const tags = pgTable('tags', {
  id: cuid2('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  color: varchar('color'),
  userId: varchar('user_id').references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
})

// Relations

export const userRelations = relations(users, ({ many }) => ({
  apiKeys: many(apiKeys),
  webhooks: many(webhooks),
}))

export const apiKeyRelations = relations(apiKeys, ({ one }) => ({
  user: one(users, {
    fields: [apiKeys.userId],
    references: [users.id],
  }),
}))

export const webhookRelations = relations(webhooks, ({ one }) => ({
  user: one(users, {
    fields: [webhooks.userId],
    references: [users.id],
  }),
}))
