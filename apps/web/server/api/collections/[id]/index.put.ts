import type { CollectionsUpdatePayload, CollectionsUpdateRouteParams } from '#shared/api'
import { collectionsUpdatePayloadSchema, collectionsUpdateRouteParamsSchema } from '#shared/api'
import { tables, useDatabase } from '@shotly/db'
import { and, eq } from 'drizzle-orm'

interface CollectionsUpdateRequest {
  body: CollectionsUpdatePayload
  routerParams: CollectionsUpdateRouteParams
}

/**
 * Update collection
 */
export default defineHttpHandler<CollectionsUpdateRequest, void>(async (event) => {
  const db = useDatabase()
  const user = await getValidatedUser(event)
  const { id } = await getValidatedRouterParams(event, collectionsUpdateRouteParamsSchema.parse)
  const data = await readValidatedBody(event, collectionsUpdatePayloadSchema.parse)

  await db
    .update(tables.collections)
    .set({
      ...data,
      updatedAt: new Date().toISOString(),
    })
    .where(and(
      eq(tables.collections.id, id),
      eq(tables.collections.userId, user.id),
    ))
})
