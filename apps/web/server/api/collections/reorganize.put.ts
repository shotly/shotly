import type { CollectionsReorganizeCreatePayload } from '#shared/api'
import { collectionsReorganizeCreatePayloadSchema } from '#shared/api'
import { useDatabase } from '@shotly/db'
import { sql } from 'drizzle-orm'

interface CollectionsReorganizeCreateRequest {
  body: CollectionsReorganizeCreatePayload
}

/**
 * Reorganize collections
 */
export default defineHttpHandler<CollectionsReorganizeCreateRequest, void>(async (event) => {
  const db = useDatabase()
  const user = await getValidatedUser(event)
  const data = await readValidatedBody(event, collectionsReorganizeCreatePayloadSchema.parse)

  const parentIdCases = data
    .map((u) => `WHEN id = '${u.id}' THEN ${u.parentId === null ? 'NULL' : `'${u.parentId}'`}`)
    .join(' ')

  const sortOrderCases = data
    .map((u) => `WHEN id = '${u.id}' THEN ${u.sortOrder}`)
    .join(' ')

  const query = sql`
    UPDATE collections
    SET
      parent_id = CASE ${sql.raw(parentIdCases)} ELSE parent_id END,
      sort_order = CASE ${sql.raw(sortOrderCases)} ELSE sort_order END
    WHERE
      user_id = '${sql.raw(user.id)}'
      AND id IN (${sql.raw(data.map((c) => `'${c.id}'`).join(','))})
  `

  await db.execute(query)
})
