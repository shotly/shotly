import type { BookmarksCreatePayload, BookmarksCreateResult } from '#shared/api'
import { bookmarksCreatePayloadSchema } from '#shared/api'

interface BookmarksCreateRequest {
  body: BookmarksCreatePayload
}

/**
 * Create new bookmark
 */
export default defineEventHandler<BookmarksCreateRequest, BookmarksCreateResult>(async (event) => {
  const _data = await readValidatedBody(event, bookmarksCreatePayloadSchema.parse)

  return {} as BookmarksCreateResult // todo: implement
})
