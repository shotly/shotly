import type { CollectionsUpdatePayload, CollectionsUpdateRouteParams } from '#shared/api'
import { collectionsUpdatePayloadSchema, collectionsUpdateRouteParamsSchema } from '#shared/api'

interface CollectionsUpdateRequest {
  body: CollectionsUpdatePayload
  routerParams: CollectionsUpdateRouteParams
}

/**
 * Update collection
 */
export default defineHttpHandler<CollectionsUpdateRequest, void>(async (event) => {
  const _routeParams = await getValidatedRouterParams(event, collectionsUpdateRouteParamsSchema.parse)
  const _data = await readValidatedBody(event, collectionsUpdatePayloadSchema.parse)

  // todo: implement
})
