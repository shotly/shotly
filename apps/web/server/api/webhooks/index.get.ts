import type { WebhooksListResult } from '#shared/api'

interface WebhooksListRequest {
}

/**
 * Get webhook list
 */
export default defineHttpHandler<WebhooksListRequest, WebhooksListResult>(() => {
  return {} as WebhooksListResult // todo: implement
})
