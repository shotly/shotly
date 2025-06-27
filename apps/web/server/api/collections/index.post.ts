import type { CollectionsCreatePayload, CollectionsCreateResult } from '#shared/api'
import { collectionsCreatePayloadSchema } from '#shared/api'

interface CollectionsCreateRequest {
  body: CollectionsCreatePayload
}

/**
 * Create new collection
 */
export default defineEventHandler<CollectionsCreateRequest, CollectionsCreateResult>(async (event) => {
  const _data = await readValidatedBody(event, collectionsCreatePayloadSchema.parse)

  return {} as CollectionsCreateResult // todo: implement
})
