import type { BookmarksDeletePayload, BookmarksDeleteResult, BookmarksDeleteRouteParams } from '#shared/api'
import { bookmarksDeletePayloadSchema, bookmarksDeleteRouteParamsSchema } from '#shared/api'

interface BookmarksDeleteRequest {
  body: BookmarksDeletePayload
  routerParams: BookmarksDeleteRouteParams
}

/**
 * Delete bookmark
 */
export default defineEventHandler<BookmarksDeleteRequest, BookmarksDeleteResult>(async (event) => {
  const _routeParams = await getValidatedRouterParams(event, bookmarksDeleteRouteParamsSchema.parse)
  const _data = await readValidatedBody(event, bookmarksDeletePayloadSchema.parse)

  return {} as BookmarksDeleteResult // todo: implement
})
