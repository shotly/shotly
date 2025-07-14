import type { ApiKeysListResult } from '#shared/api'
import { tables, useDatabase } from '@shotly/db'
import { desc, eq } from 'drizzle-orm'

interface ApiKeysListRequest {

}

/**
 * Get api keys list
 */
export default defineHttpHandler<ApiKeysListRequest, ApiKeysListResult>(async (event) => {
  const db = useDatabase()
  const user = await getValidatedUser(event)

  const items = await db
    .select({
      id: tables.apiKeys.id,
      name: tables.apiKeys.name,
      lastUsedAt: tables.apiKeys.lastUsedAt,
      createdAt: tables.apiKeys.createdAt,
      expiresAt: tables.apiKeys.expiresAt,
    })
    .from(tables.apiKeys)
    .where(eq(tables.apiKeys.userId, user.id))
    .orderBy(desc(tables.apiKeys.createdAt))

  return items
})
