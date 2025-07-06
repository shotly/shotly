import type { ApiKeysListQuery, ApiKeysListResult } from '#shared/api'
import { apiKeysListQuerySchema } from '#shared/api'
import { tables, useDatabase } from '@shotly/db'
import { desc, eq, sql } from 'drizzle-orm'

interface ApiKeysListRequest {
  query: ApiKeysListQuery
}

/**
 * Get api keys list
 */
export default defineHttpHandler<ApiKeysListRequest, ApiKeysListResult>(async (event) => {
  const db = useDatabase()
  const user = await getValidatedUser(event)
  const query = await getValidatedQuery(event, apiKeysListQuerySchema.parse)
  const { perPage, pageOffset } = getValidatedPagination(query)

  const items = await db
    .select({
      id: tables.apiKeys.id,
      name: tables.apiKeys.name,
      key: tables.apiKeys.key,
      lastUsedAt: tables.apiKeys.lastUsedAt,
      createdAt: tables.apiKeys.createdAt,
      expiresAt: tables.apiKeys.expiresAt,
      total: sql<number>`count(*) over()`.mapWith(Number),
    })
    .from(tables.apiKeys)
    .where(eq(tables.apiKeys.userId, user.id))
    .orderBy(desc(tables.apiKeys.createdAt))
    .limit(perPage)
    .offset(pageOffset)

  return extractPaginationData(items)
})
