import type { WebhooksCreatePayload, WebhooksCreateResult } from '#shared/api'
import { webhooksCreatePayloadSchema } from '#shared/api'

interface WebhooksCreateRequest {
  body: WebhooksCreatePayload
}

/**
 * Create new webhook
 */
export default defineHttpHandler<WebhooksCreateRequest, WebhooksCreateResult>(async (event) => {
  const _data = await readValidatedBody(event, webhooksCreatePayloadSchema.parse)

  return {} as WebhooksCreateResult // todo: implement
})
