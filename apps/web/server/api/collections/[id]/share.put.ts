import type { CollectionsShareUpdatePayload, CollectionsShareUpdateRouteParams } from '#shared/api'
import { collectionsShareUpdatePayloadSchema, collectionsShareUpdateRouteParamsSchema } from '#shared/api'
import { tables, useDatabase } from '@shotly/db'
import { and, eq } from 'drizzle-orm'

interface CollectionsShareUpdateRequest {
  body: CollectionsShareUpdatePayload
  routerParams: CollectionsShareUpdateRouteParams
}

/**
 * Share collection
 */
export default defineHttpHandler<CollectionsShareUpdateRequest, void>(async (event) => {
  const db = useDatabase()
  const user = await getValidatedUser(event)
  const { id } = await getValidatedRouterParams(event, collectionsShareUpdateRouteParamsSchema.parse)
  const data = await readValidatedBody(event, collectionsShareUpdatePayloadSchema.parse)

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
