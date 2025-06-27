import type { ApiKeysDeletePayload, ApiKeysDeleteResult, ApiKeysDeleteRouteParams } from '#shared/api'
import { apiKeysDeletePayloadSchema, apiKeysDeleteRouteParamsSchema } from '#shared/api'

interface ApiKeysDeleteRequest {
  body: ApiKeysDeletePayload
  routerParams: ApiKeysDeleteRouteParams
}

/**
 * Delete api key
 */
export default defineEventHandler<ApiKeysDeleteRequest, ApiKeysDeleteResult>(async (event) => {
  const _routeParams = await getValidatedRouterParams(event, apiKeysDeleteRouteParamsSchema.parse)
  const _data = await readValidatedBody(event, apiKeysDeletePayloadSchema.parse)

  return {} as ApiKeysDeleteResult // todo: implement
})
