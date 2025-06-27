import type { ApiKeysListQuery, ApiKeysListResult } from '#shared/api'
import { apiKeysListQuerySchema } from '#shared/api'

interface ApiKeysListRequest {
  query: ApiKeysListQuery
}

/**
 * Get api keys list
 */
export default defineEventHandler<ApiKeysListRequest, ApiKeysListResult>(async (event) => {
  const _query = await getValidatedQuery(event, apiKeysListQuerySchema.parse)

  return {} as ApiKeysListResult // todo: implement
})
