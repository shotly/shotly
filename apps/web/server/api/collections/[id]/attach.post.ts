import type { CollectionsAttachCreatePayload, CollectionsAttachCreateResult, CollectionsAttachCreateRouteParams } from '#shared/api'
import { collectionsAttachCreatePayloadSchema, collectionsAttachCreateRouteParamsSchema } from '#shared/api'

interface CollectionsAttachCreateRequest {
  body: CollectionsAttachCreatePayload
  routerParams: CollectionsAttachCreateRouteParams
}

/**
 * Attach bookmark to collection
 */
export default defineHttpHandler<CollectionsAttachCreateRequest, CollectionsAttachCreateResult>(async (event) => {
  const _routeParams = await getValidatedRouterParams(event, collectionsAttachCreateRouteParamsSchema.parse)
  const _data = await readValidatedBody(event, collectionsAttachCreatePayloadSchema.parse)

  return {} as CollectionsAttachCreateResult // todo: implement
})
