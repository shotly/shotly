import type { CollectionsDetachCreatePayload, CollectionsDetachCreateRouteParams } from '#shared/api'
import { collectionsDetachCreatePayloadSchema, collectionsDetachCreateRouteParamsSchema } from '#shared/api'
import { tables, useDatabase } from '@shotly/db'
import { and, eq } from 'drizzle-orm'

interface CollectionsDetachCreateRequest {
  body: CollectionsDetachCreatePayload
  routerParams: CollectionsDetachCreateRouteParams
}

/**
 * Detach bookmark from collection
 */
export default defineHttpHandler<CollectionsDetachCreateRequest, void>(async (event) => {
  const db = useDatabase()
  const user = await getValidatedUser(event)
  const _routeParams = await getValidatedRouterParams(event, collectionsDetachCreateRouteParamsSchema.parse)
  const data = await readValidatedBody(event, collectionsDetachCreatePayloadSchema.parse)

  await db
    .update(tables.bookmarks)
    .set({
      collectionId: null,
      updatedAt: new Date().toISOString(),
    })
    .where(and(
      eq(tables.bookmarks.id, data.bookmarkId),
      eq(tables.bookmarks.userId, user.id),
    ))
})
