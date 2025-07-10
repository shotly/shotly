import type { CollectionsAttachCreatePayload, CollectionsAttachCreateRouteParams } from '#shared/api'
import { collectionsAttachCreatePayloadSchema, collectionsAttachCreateRouteParamsSchema } from '#shared/api'
import { tables, useDatabase } from '@shotly/db'
import { and, eq } from 'drizzle-orm'

interface CollectionsAttachCreateRequest {
  body: CollectionsAttachCreatePayload
  routerParams: CollectionsAttachCreateRouteParams
}

/**
 * Attach bookmark to collection
 */
export default defineHttpHandler<CollectionsAttachCreateRequest, void>(async (event) => {
  const db = useDatabase()
  const user = await getValidatedUser(event)
  const { id } = await getValidatedRouterParams(event, collectionsAttachCreateRouteParamsSchema.parse)
  const data = await readValidatedBody(event, collectionsAttachCreatePayloadSchema.parse)

  await db
    .update(tables.bookmarks)
    .set({
      collectionId: id,
      updatedAt: new Date().toISOString(),
    })
    .where(and(
      eq(tables.bookmarks.id, data.bookmarkId),
      eq(tables.bookmarks.userId, user.id),
    ))
})
