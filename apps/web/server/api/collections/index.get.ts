import type { CollectionsListItem, CollectionsListResult } from '#shared/api'
import { tables, useDatabase } from '@shotly/db'
import { asc, eq } from 'drizzle-orm'
import buildTree from 'fast-tree-builder'

interface CollectionsListRequest {

}

interface UnnormalizedCollectionsListItem {
  id: string
  name: string
  description: string | null
  icon: string
  isShared: boolean
  sortOrder: number
  createdAt: string
  parentId: string | null
  children?: UnnormalizedCollectionsListItem[]
}

function normalizeCollections(collections: UnnormalizedCollectionsListItem[]): CollectionsListItem[] {
  return collections.map((collection) => ({
    ...collection,
    children: collection.children ? normalizeCollections(collection.children) : [],
  }))
}

/**
 * Get collections list
 */
export default defineHttpHandler<CollectionsListRequest, CollectionsListResult>(async (event) => {
  const db = useDatabase()
  const user = await getValidatedUser(event)

  const collections = await db
    .select({
      id: tables.collections.id,
      name: tables.collections.name,
      description: tables.collections.description,
      icon: tables.collections.icon,
      isShared: tables.collections.isShared,
      sortOrder: tables.collections.sortOrder,
      createdAt: tables.collections.createdAt,
      parentId: tables.collections.parentId,
    })
    .from(tables.collections)
    .where(eq(tables.collections.userId, user.id))
    .orderBy(asc(tables.collections.sortOrder))

  const { roots } = buildTree(collections, {
    id: 'id',
    parentId: 'parentId',
    childrenKey: 'children',
    parentKey: false,
    valueKey: false,
  })

  return normalizeCollections(roots)
})
