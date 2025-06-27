import type { CollectionsDeletePayload, CollectionsDeleteResult, CollectionsDeleteRouteParams } from '#shared/api'
import { collectionsDeletePayloadSchema, collectionsDeleteRouteParamsSchema } from '#shared/api'

interface CollectionsDeleteRequest {
  body: CollectionsDeletePayload
  routerParams: CollectionsDeleteRouteParams
}

/**
 * Delete collection
 */
export default defineEventHandler<CollectionsDeleteRequest, CollectionsDeleteResult>(async (event) => {
  const _routeParams = await getValidatedRouterParams(event, collectionsDeleteRouteParamsSchema.parse)
  const _data = await readValidatedBody(event, collectionsDeletePayloadSchema.parse)

  return {} as CollectionsDeleteResult // todo: implement
})
