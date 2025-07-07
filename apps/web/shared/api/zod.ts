import { z } from 'zod'

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
  lastUsedAt: dateTimeTypeSchema,
  expiresAt: dateTimeTypeSchema.nullable(),
  createdAt: dateTimeTypeSchema,
})

export const apiKeysListResultSchema = z.object({
  items: z.array(apiKeysListItemSchema),
  pagination: paginationSchema.optional(),
})

export const apiKeysCreatePayloadSchema = apiKeyFormSchema

export const apiKeysCreateResultSchema = z.object({
  key: z.string().uuid(),
})

export const bookmarksListResultSchema = z.record(z.any())

export const bookmarksCreatePayloadSchema = z.record(z.any())

export const bookmarksCreateResultSchema = z.record(z.any())

export const bookmarksGetResultSchema = z.record(z.any())

export const bookmarksUpdatePayloadSchema = z.record(z.any())

export const bookmarksUpdateResultSchema = z.record(z.any())

export const bookmarksDeletePayloadSchema = z.record(z.any())

export const bookmarksDeleteResultSchema = z.record(z.any())

export const collectionsListResultSchema = z.record(z.any())

export const collectionsCreatePayloadSchema = z.record(z.any())

export const collectionsCreateResultSchema = z.record(z.any())

export const collectionsGetResultSchema = z.record(z.any())

export const collectionsUpdatePayloadSchema = z.record(z.any())

export const collectionsUpdateResultSchema = z.record(z.any())

export const collectionsDeletePayloadSchema = z.record(z.any())

export const collectionsDeleteResultSchema = z.record(z.any())

export const collectionsAttachCreatePayloadSchema = z.record(z.any())

export const collectionsAttachCreateResultSchema = z.record(z.any())

export const collectionsDetachCreatePayloadSchema = z.record(z.any())

export const collectionsDetachCreateResultSchema = z.record(z.any())

export const apiKeysListQuerySchema = z.object({
  page: z.string().optional().default('1'),
  perPage: z.string().optional().default('10'),
})

export const apiKeysDeleteRouteParamsSchema = z.object({
  id: z.string(),
})

export const bookmarksListQuerySchema = z.object({
  page: z.string().optional().default('1'),
  perPage: z.string().optional().default('10'),
})

export const bookmarksGetRouteParamsSchema = z.object({
  id: z.string(),
})

export const bookmarksUpdateRouteParamsSchema = z.object({
  id: z.string(),
})

export const bookmarksDeleteRouteParamsSchema = z.object({
  id: z.string(),
})

export const collectionsListQuerySchema = z.object({
  page: z.string().optional().default('1'),
  perPage: z.string().optional().default('10'),
})

export const collectionsGetRouteParamsSchema = z.object({
  id: z.string(),
})

export const collectionsUpdateRouteParamsSchema = z.object({
  id: z.string(),
})

export const collectionsDeleteRouteParamsSchema = z.object({
  id: z.string(),
})

export const collectionsAttachCreateRouteParamsSchema = z.object({
  id: z.string(),
})

export const collectionsDetachCreateRouteParamsSchema = z.object({
  id: z.string(),
})
