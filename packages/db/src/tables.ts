import type { AnyPgColumn } from 'drizzle-orm/pg-core'
import { cuid2 } from 'drizzle-cuid2/postgres'
import { relations } from 'drizzle-orm'
import { boolean, index, integer, pgEnum, pgTable, primaryKey, timestamp, varchar } from 'drizzle-orm/pg-core'

export const userRole = pgEnum('user_roles', ['admin', 'user'])
export const crawlerStatus = pgEnum('crawler_status', ['pending', 'running', 'completed', 'failed'])
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
  lastSeenAt: timestamp('last_seen_at', { mode: 'string', withTimezone: true }),
}, (table) => [
  index('users_name_idx').on(table.name),
])

export const apiKeys = pgTable('api_keys', {
  id: cuid2('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  key: varchar('key').notNull().unique(),
  lastUsedAt: timestamp('last_used_at', { mode: 'string', withTimezone: true }),
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
  userId: cuid2('user_id').notNull().references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  name: varchar('name').notNull(),
  description: varchar('description'),
  icon: varchar('icon').notNull(),
  isShared: boolean('is_shared').notNull().default(false),
  sortOrder: integer('sort_order').notNull(),
  parentId: cuid2('parent_id').references((): AnyPgColumn => collections.id, { onDelete: 'set null', onUpdate: 'set null' }),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
})

export const bookmarks = pgTable('bookmarks', {
  id: cuid2('id').defaultRandom().primaryKey(),
  url: varchar('url').notNull(),
  title: varchar('title'),
  description: varchar('description'),
  thumbnailUrl: varchar('thumbnail_url'),
  isFavorite: boolean('is_favorite').notNull().default(false),
  sortOrder: integer('sort_order').notNull(),
  collectionId: cuid2('collection_id').references(() => collections.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  userId: cuid2('user_id').notNull().references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  crawlerStatus: crawlerStatus('crawler_status').notNull().default('pending'),
  crawledAt: timestamp('crawled_at', { mode: 'string', withTimezone: true }),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
})

export const tags = pgTable('tags', {
  id: cuid2('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  description: varchar('description'),
  color: varchar('color').notNull(),
  userId: cuid2('user_id').notNull().references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
})

export const bookmarkTags = pgTable('bookmark_tags', {
  bookmarkId: cuid2('bookmark_id').notNull().references(() => bookmarks.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  tagId: cuid2('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
}, (table) => [
  primaryKey({ columns: [table.bookmarkId, table.tagId] }),
])

export const crawlerLogs = pgTable('crawler_logs', {
  id: cuid2('id').defaultRandom().primaryKey(),
  bookmarkId: cuid2('bookmark_id').notNull().references(() => bookmarks.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  status: crawlerStatus('status').notNull(),
  message: varchar('message'),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: true }).notNull().defaultNow(),
})

// Relations

export const userRelations = relations(users, ({ many }) => ({
  apiKeys: many(apiKeys),
  webhooks: many(webhooks),
  collections: many(collections),
  bookmarks: many(bookmarks),
  tags: many(tags),
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

export const collectionRelations = relations(collections, ({ one, many }) => ({
  parent: one(collections, {
    fields: [collections.parentId],
    references: [collections.id],
  }),
  bookmarks: many(bookmarks),
}))

export const bookmarkRelations = relations(bookmarks, ({ one, many }) => ({
  collection: one(collections, {
    fields: [bookmarks.collectionId],
    references: [collections.id],
  }),
  tags: many(bookmarkTags),
  crawlerLogs: many(crawlerLogs),
}))

export const tagRelations = relations(tags, ({ many }) => ({
  bookmarks: many(bookmarkTags),
}))

export const bookmarkTagRelations = relations(bookmarkTags, ({ one }) => ({
  bookmark: one(bookmarks, {
    fields: [bookmarkTags.bookmarkId],
    references: [bookmarks.id],
  }),
  tag: one(tags, {
    fields: [bookmarkTags.tagId],
    references: [tags.id],
  }),
}))

export const crawlerLogRelations = relations(crawlerLogs, ({ one }) => ({
  bookmark: one(bookmarks, {
    fields: [crawlerLogs.bookmarkId],
    references: [bookmarks.id],
  }),
}))
