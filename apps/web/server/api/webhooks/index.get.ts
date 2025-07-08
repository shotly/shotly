import type { WebhooksListResult } from '#shared/api'
import { tables, useDatabase } from '@shotly/db'
import { desc, eq, sql } from 'drizzle-orm'

interface WebhooksListRequest {

}

/**
 * Get webhook list
 */
export default defineHttpHandler<WebhooksListRequest, WebhooksListResult>(async (event) => {
  const db = useDatabase()
  const user = await getValidatedUser(event)

  const items = await db
    .select({
      id: tables.webhooks.id,
      url: tables.webhooks.url,
      events: tables.webhooks.events,
      createdAt: tables.webhooks.createdAt,
      total: sql<number>`count(*) over()`.mapWith(Number),
    })
    .from(tables.webhooks)
    .where(eq(tables.webhooks.userId, user.id))
    .orderBy(desc(tables.webhooks.createdAt))

  return items
})
