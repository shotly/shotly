import type { ApiKeysCreatePayload, ApiKeysCreateResult } from '#shared/api'
import { randomUUID } from 'node:crypto'
import { apiKeysCreatePayloadSchema } from '#shared/api'
import { tables, useDatabase } from '@shotly/db'

interface ApiKeysCreateRequest {
  body: ApiKeysCreatePayload
}

/**
 * Create new api key
 */
export default defineHttpHandler<ApiKeysCreateRequest, ApiKeysCreateResult>(async (event) => {
  const db = useDatabase()
  const { user } = await requireUserSession(event)
  const data = await readValidatedBody(event, apiKeysCreatePayloadSchema.parse)

  const [apiKey] = await db
    .insert(tables.apiKeys)
    .values({
      ...data,
      key: randomUUID(),
      userId: user.id,
    })
    .returning({
      id: tables.apiKeys.id,
    })

  if (!apiKey) {
    throw createHttpError('internalServerError')
  }

  return apiKey
})
