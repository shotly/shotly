import type { BookmarksListQuery, BookmarksListResult } from '#shared/api'
import { bookmarksListQuerySchema } from '#shared/api'

interface BookmarksListRequest {
  query: BookmarksListQuery
}

/**
 * Get bookmarks list
 */
export default defineEventHandler<BookmarksListRequest, BookmarksListResult>(async (event) => {
  const _query = await getValidatedQuery(event, bookmarksListQuerySchema.parse)

  return {} as BookmarksListResult // todo: implement
})
