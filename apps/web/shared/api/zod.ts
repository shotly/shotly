import { z } from 'zod'

export const paginationSchema = z.object({
  total: z.number().default(0),
})

export const cuidSchema = z.string().min(24).max(24)

export const apiKeySchema = z.string().uuid()

export const profileDetailsUpdatePayloadSchema = z.record(z.any())

export const profileDetailsUpdateResultSchema = z.record(z.any())

export const profilePasswordUpdatePayloadSchema = z.record(z.any())

export const profilePasswordUpdateResultSchema = z.record(z.any())

export const profileDeletePayloadSchema = z.record(z.any())

export const profileDeleteResultSchema = z.record(z.any())

export const apiKeysListResultSchema = z.record(z.any())

export const apiKeysCreatePayloadSchema = z.record(z.any())

export const apiKeysCreateResultSchema = z.record(z.any())

export const apiKeysDeletePayloadSchema = z.record(z.any())

export const apiKeysDeleteResultSchema = z.record(z.any())

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
