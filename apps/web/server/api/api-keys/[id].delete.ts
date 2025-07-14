import type { ApiKeysDeleteRouteParams } from '#shared/api'
import { apiKeysDeleteRouteParamsSchema } from '#shared/api'
import { tables, useDatabase } from '@shotly/db'
import { and, eq } from 'drizzle-orm'

interface ApiKeysDeleteRequest {
  routerParams: ApiKeysDeleteRouteParams
}

/**
 * Delete api key
 */
export default defineHttpHandler<ApiKeysDeleteRequest, void>(async (event) => {
  const db = useDatabase()
  const user = await getValidatedUser(event)
  const { id } = await getValidatedRouterParams(event, apiKeysDeleteRouteParamsSchema.parse)

  await db
    .delete(tables.apiKeys)
    .where(and(
      eq(tables.apiKeys.id, id),
      eq(tables.apiKeys.userId, user.id),
    ))
})
