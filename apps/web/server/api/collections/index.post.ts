import type { CollectionsCreatePayload, CollectionsCreateResult } from '#shared/api'
import { collectionsCreatePayloadSchema } from '#shared/api'
import { tables, useDatabase } from '@shotly/db'
import { and, eq, isNull, max } from 'drizzle-orm'

interface CollectionsCreateRequest {
  body: CollectionsCreatePayload
}

/**
 * Create new collection
 */
export default defineHttpHandler<CollectionsCreateRequest, CollectionsCreateResult>(async (event) => {
  const db = useDatabase()
  const user = await getValidatedUser(event)
  const data = await readValidatedBody(event, collectionsCreatePayloadSchema.parse)

  /**
   * Find max sortOrder among siblings (same parentId & userId),
   * So new collection is always added to the end of its group (gap-based ordering)
   * Ensures correct order for nested drag&drop operations
   */
  const [maxSortOrder] = await db
    .select({ value: max(tables.collections.sortOrder) })
    .from(tables.collections)
    .where(
      and(
        eq(tables.collections.userId, user.id),
        data.parentId
          ? eq(tables.collections.parentId, data.parentId)
          : isNull(tables.collections.parentId),
      ),
    )
    .limit(1)

  const [collection] = await db
    .insert(tables.collections)
    .values({
      ...data,
      userId: user.id,
      sortOrder: (maxSortOrder?.value ?? 0) + 1000,
    })
    .returning({
      id: tables.collections.id,
    })

  if (!collection) {
    throw createHttpError('internalServerError')
  }

  return collection
})
