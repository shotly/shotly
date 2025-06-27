import type { CollectionsGetResult, CollectionsGetRouteParams } from '#shared/api'
import { collectionsGetRouteParamsSchema } from '#shared/api'

interface CollectionsGetRequest {
  routerParams: CollectionsGetRouteParams
}

/**
 * Get collection by id
 */
export default defineEventHandler<CollectionsGetRequest, CollectionsGetResult>(async (event) => {
  const _routeParams = await getValidatedRouterParams(event, collectionsGetRouteParamsSchema.parse)

  return {} as CollectionsGetResult // todo: implement
})
