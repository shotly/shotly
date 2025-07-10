import type { CollectionsBookmarksListResult, CollectionsBookmarksListRouteParams } from '#shared/api'
import { collectionsBookmarksListRouteParamsSchema } from '#shared/api'
import { tables, useDatabase } from '@shotly/db'
import { and, eq } from 'drizzle-orm'

interface CollectionsBookmarksListRequest {
  routerParams: CollectionsBookmarksListRouteParams
}

/**
 * Get bookmarks list by collection
 */
export default defineHttpHandler<CollectionsBookmarksListRequest, CollectionsBookmarksListResult>(async (event) => {
  const db = useDatabase()
  const user = await getValidatedUser(event)
  const { id } = await getValidatedRouterParams(event, collectionsBookmarksListRouteParamsSchema.parse)

  const bookmarks = await db
    .select({})
    .from(tables.bookmarks)
    .where(and(
      eq(tables.bookmarks.collectionId, id),
      eq(tables.bookmarks.userId, user.id),
    ))

  return bookmarks
})
