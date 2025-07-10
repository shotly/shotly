import type { CollectionsBookmarksListResult, CollectionsBookmarksListRouteParams } from '#shared/api'
import { collectionsBookmarksListRouteParamsSchema } from '#shared/api'

interface CollectionsBookmarksListRequest {
  routerParams: CollectionsBookmarksListRouteParams
}

/**
 * Get bookmarks list by collection
 */
export default defineHttpHandler<CollectionsBookmarksListRequest, CollectionsBookmarksListResult>(async (event) => {
  const _routeParams = await getValidatedRouterParams(event, collectionsBookmarksListRouteParamsSchema.parse)

  return {} as CollectionsBookmarksListResult // todo: implement
})
