import type { CollectionsDeleteRouteParams } from '#shared/api'
import { collectionsDeleteRouteParamsSchema } from '#shared/api'

interface CollectionsDeleteRequest {
  routerParams: CollectionsDeleteRouteParams
}

/**
 * Delete collection
 */
export default defineHttpHandler<CollectionsDeleteRequest, void>(async (event) => {
  const _routeParams = await getValidatedRouterParams(event, collectionsDeleteRouteParamsSchema.parse)

  // todo: implement
})
