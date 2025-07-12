import type { CollectionsDeleteRouteParams } from '#shared/api'
import { collectionsDeleteRouteParamsSchema } from '#shared/api'
import { tables, useDatabase } from '@shotly/db'
import { and, eq } from 'drizzle-orm'

interface CollectionsDeleteRequest {
  routerParams: CollectionsDeleteRouteParams
}

/**
 * Delete collection
 */
export default defineHttpHandler<CollectionsDeleteRequest, void>(async (event) => {
  const db = useDatabase()
  const user = await getValidatedUser(event)
  const { id } = await getValidatedRouterParams(event, collectionsDeleteRouteParamsSchema.parse)

  await db
    .delete(tables.collections)
    .where(and(
      eq(tables.collections.id, id),
      eq(tables.collections.userId, user.id),
    ))
})
