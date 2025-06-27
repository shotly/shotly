import type { CollectionsUpdatePayload, CollectionsUpdateResult, CollectionsUpdateRouteParams } from '#shared/api'
import { collectionsUpdatePayloadSchema, collectionsUpdateRouteParamsSchema } from '#shared/api'

interface CollectionsUpdateRequest {
  body: CollectionsUpdatePayload
  routerParams: CollectionsUpdateRouteParams
}

/**
 * Update collection
 */
export default defineEventHandler<CollectionsUpdateRequest, CollectionsUpdateResult>(async (event) => {
  const _routeParams = await getValidatedRouterParams(event, collectionsUpdateRouteParamsSchema.parse)
  const _data = await readValidatedBody(event, collectionsUpdatePayloadSchema.parse)

  return {} as CollectionsUpdateResult // todo: implement
})
