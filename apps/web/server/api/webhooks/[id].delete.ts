import type { WebhooksDeleteRouteParams } from '#shared/api'
import { webhooksDeleteRouteParamsSchema } from '#shared/api'

interface WebhooksDeleteRequest {
  routerParams: WebhooksDeleteRouteParams
}

/**
 * Delete webhook
 */
export default defineHttpHandler<WebhooksDeleteRequest, void>(async (event) => {
  const _routeParams = await getValidatedRouterParams(event, webhooksDeleteRouteParamsSchema.parse)

  // todo: implement
})
