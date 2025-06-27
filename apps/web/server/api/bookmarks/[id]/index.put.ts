import type { BookmarksUpdatePayload, BookmarksUpdateResult, BookmarksUpdateRouteParams } from '#shared/api'
import { bookmarksUpdatePayloadSchema, bookmarksUpdateRouteParamsSchema } from '#shared/api'

interface BookmarksUpdateRequest {
  body: BookmarksUpdatePayload
  routerParams: BookmarksUpdateRouteParams
}

/**
 * Update bookmark
 */
export default defineEventHandler<BookmarksUpdateRequest, BookmarksUpdateResult>(async (event) => {
  const _routeParams = await getValidatedRouterParams(event, bookmarksUpdateRouteParamsSchema.parse)
  const _data = await readValidatedBody(event, bookmarksUpdatePayloadSchema.parse)

  return {} as BookmarksUpdateResult // todo: implement
})
