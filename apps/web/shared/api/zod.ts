import type { CollectionsListItem } from './types'
import { z } from 'zod'

export const webhooksEventSchema = z.union([z.literal('bookmarkCreated'), z.literal('bookmarkDeleted'), z.literal('collectionCreated'), z.literal('collectionDeleted')])

export const paginationSchema = z.object({
  total: z.number().default(0),
})

export const dateTypeSchema = z.string()

export const dateTimeTypeSchema = z.string()

export const cuidSchema = z.string().min(24).max(24)

export const profileDetailsUpdatePayloadSchema = z.object({
  name: z.string().min(3),
})

export const apiKeyFormSchema = z.object({
  name: z.string().min(3),
  expiresAt: z.union([z.literal('1d'), z.literal('1w'), z.literal('1m'), z.literal('1y'), z.literal('never')]),
})

export const apiKeysListItemSchema = z.object({
  id: cuidSchema,
  name: z.string().min(3),
  lastUsedAt: dateTimeTypeSchema.nullable(),
  expiresAt: dateTimeTypeSchema.nullable(),
  createdAt: dateTimeTypeSchema,
})

export const apiKeysListResultSchema = z.object({
  items: z.array(apiKeysListItemSchema),
  pagination: paginationSchema.optional(),
})

export const apiKeysCreatePayloadSchema = apiKeyFormSchema

export const apiKeysCreateResultSchema = z.object({
  id: cuidSchema,
  key: z.string().uuid(),
})

export const webhooksFormSchema = z.object({
  url: z.string().url(),
  events: z.array(webhooksEventSchema).min(1),
})

export const webhooksListItemSchema = z.object({
  id: cuidSchema,
  url: z.string().url(),
  events: z.array(webhooksEventSchema),
  createdAt: dateTimeTypeSchema,
})

export const webhooksListResultSchema = z.array(webhooksListItemSchema)

export const webhooksCreatePayloadSchema = webhooksFormSchema

export const webhooksCreateResultSchema = z.object({
  id: cuidSchema,
  secret: z.string().uuid(),
})

export const bookmarksItemSchema = z.record(z.any())

export const bookmarksListResultSchema = z.record(z.any())

export const bookmarksCreatePayloadSchema = z.record(z.any())

export const bookmarksCreateResultSchema = z.record(z.any())

export const bookmarksGetResultSchema = z.record(z.any())

export const bookmarksUpdatePayloadSchema = z.record(z.any())

export const bookmarksUpdateResultSchema = z.record(z.any())

export const bookmarksDeletePayloadSchema = z.record(z.any())

export const bookmarksDeleteResultSchema = z.record(z.any())

export const collectionsFormSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  icon: z.string().min(5),
  parentId: cuidSchema.optional(),
  isShared: z.boolean().optional(),
})

export const collectionsListItemSchema: z.ZodSchema<CollectionsListItem> = z.lazy(() => z.object({
  id: cuidSchema,
  name: z.string(),
  description: z.string().nullable(),
  icon: z.string(),
  isShared: z.boolean(),
  sortOrder: z.number(),
  children: z.array(collectionsListItemSchema).optional(),
  createdAt: dateTimeTypeSchema,
}))

export const collectionsItemSchema = z.object({
  id: cuidSchema,
  name: z.string().min(3),
  description: z.string(),
  icon: z.string().min(5),
  isShared: z.boolean(),
  sortOrder: z.number(),
  createdAt: dateTimeTypeSchema,
})

export const collectionsListResultSchema = z.array(collectionsListItemSchema)

export const collectionsCreatePayloadSchema = collectionsFormSchema

export const collectionsCreateResultSchema = z.object({
  id: cuidSchema,
})

export const collectionsUpdatePayloadSchema = collectionsFormSchema

export const collectionsBookmarksListResultSchema = z.array(bookmarksItemSchema)

export const collectionsAttachCreatePayloadSchema = z.object({
  bookmarkId: cuidSchema,
})

export const collectionsDetachCreatePayloadSchema = z.object({
  bookmarkId: cuidSchema,
})

export const apiKeysListQuerySchema = z.object({
  page: z.string().optional().default('1'),
  perPage: z.string().optional().default('10'),
})

export const apiKeysDeleteRouteParamsSchema = z.object({
  id: cuidSchema,
})

export const webhooksDeleteRouteParamsSchema = z.object({
  id: cuidSchema,
})

export const bookmarksListQuerySchema = z.object({
  page: z.string().optional().default('1'),
  perPage: z.string().optional().default('10'),
})

export const bookmarksGetRouteParamsSchema = z.object({
  id: cuidSchema,
})

export const bookmarksUpdateRouteParamsSchema = z.object({
  id: cuidSchema,
})

export const bookmarksDeleteRouteParamsSchema = z.object({
  id: cuidSchema,
})

export const collectionsUpdateRouteParamsSchema = z.object({
  id: cuidSchema,
})

export const collectionsDeleteRouteParamsSchema = z.object({
  id: cuidSchema,
})

export const collectionsBookmarksListRouteParamsSchema = z.object({
  id: cuidSchema,
})

export const collectionsAttachCreateRouteParamsSchema = z.object({
  id: cuidSchema,
})

export const collectionsDetachCreateRouteParamsSchema = z.object({
  id: cuidSchema,
})
