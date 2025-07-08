import type { WebhooksCreatePayload, WebhooksCreateResult } from '#shared/api'
import { randomUUID } from 'node:crypto'
import { webhooksCreatePayloadSchema } from '#shared/api'
import { tables, useDatabase } from '@shotly/db'

interface WebhooksCreateRequest {
  body: WebhooksCreatePayload
}

/**
 * Create new webhook
 */
export default defineHttpHandler<WebhooksCreateRequest, WebhooksCreateResult>(async (event) => {
  const db = useDatabase()
  const user = await getValidatedUser(event)
  const data = await readValidatedBody(event, webhooksCreatePayloadSchema.parse)

  const [webhook] = await db
    .insert(tables.webhooks)
    .values({
      ...data,
      userId: user.id,
      secret: randomUUID(),
    })
    .returning({
      id: tables.webhooks.id,
      secret: tables.webhooks.secret,
    })

  if (!webhook) {
    throw createHttpError('internalServerError')
  }

  return webhook
})
