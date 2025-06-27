import type { CollectionsListQuery, CollectionsListResult } from '#shared/api'
import { collectionsListQuerySchema } from '#shared/api'

interface CollectionsListRequest {
  query: CollectionsListQuery
}

/**
 * Get collections list
 */
export default defineEventHandler<CollectionsListRequest, CollectionsListResult>(async (event) => {
  const _query = await getValidatedQuery(event, collectionsListQuerySchema.parse)

  return {} as CollectionsListResult // todo: implement
})
