import type { WebhooksDeleteRouteParams } from '#shared/api'
import { webhooksDeleteRouteParamsSchema } from '#shared/api'
import { tables, useDatabase } from '@shotly/db'
import { and, eq } from 'drizzle-orm'

interface WebhooksDeleteRequest {
  routerParams: WebhooksDeleteRouteParams
}

/**
 * Delete webhook
 */
export default defineHttpHandler<WebhooksDeleteRequest, void>(async (event) => {
  const db = useDatabase()
  const user = await getValidatedUser(event)
  const { id } = await getValidatedRouterParams(event, webhooksDeleteRouteParamsSchema.parse)

  await db
    .delete(tables.webhooks)
    .where(and(
      eq(tables.webhooks.id, id),
      eq(tables.webhooks.userId, user.id),
    ))
})
