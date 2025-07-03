import type { CollectionsDetachCreatePayload, CollectionsDetachCreateResult, CollectionsDetachCreateRouteParams } from '#shared/api'
import { collectionsDetachCreatePayloadSchema, collectionsDetachCreateRouteParamsSchema } from '#shared/api'

interface CollectionsDetachCreateRequest {
  body: CollectionsDetachCreatePayload
  routerParams: CollectionsDetachCreateRouteParams
}

/**
 * Detach bookmark from collection
 */
export default defineHttpHandler<CollectionsDetachCreateRequest, CollectionsDetachCreateResult>(async (event) => {
  const _routeParams = await getValidatedRouterParams(event, collectionsDetachCreateRouteParamsSchema.parse)
  const _data = await readValidatedBody(event, collectionsDetachCreatePayloadSchema.parse)

  return {} as CollectionsDetachCreateResult // todo: implement
})
