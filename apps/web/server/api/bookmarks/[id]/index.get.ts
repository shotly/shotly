import type { BookmarksGetResult, BookmarksGetRouteParams } from '#shared/api'
import { bookmarksGetRouteParamsSchema } from '#shared/api'

interface BookmarksGetRequest {
  routerParams: BookmarksGetRouteParams
}

/**
 * Get bookmark by id
 */
export default defineHttpHandler<BookmarksGetRequest, BookmarksGetResult>(async (event) => {
  const _routeParams = await getValidatedRouterParams(event, bookmarksGetRouteParamsSchema.parse)

  return {} as BookmarksGetResult // todo: implement
})
