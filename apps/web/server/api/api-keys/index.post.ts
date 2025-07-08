import type { ApiKeysCreatePayload, ApiKeysCreateResult } from '#shared/api'
import type { ManipulateType } from 'dayjs'
import { randomUUID } from 'node:crypto'
import { apiKeysCreatePayloadSchema } from '#shared/api'
import { tables, useDatabase } from '@shotly/db'
import dayjs from 'dayjs'

interface ApiKeysCreateRequest {
  body: ApiKeysCreatePayload
}

/**
 * Create new api key
 */
export default defineHttpHandler<ApiKeysCreateRequest, ApiKeysCreateResult>(async (event) => {
  const db = useDatabase()
  const user = await getValidatedUser(event)
  const data = await readValidatedBody(event, apiKeysCreatePayloadSchema.parse)

  const [expiresAtValue, expiresAtUnit] = data.expiresAt.split('')
  const expiresAtUnitMap: Record<string, ManipulateType> = {
    d: 'day',
    w: 'week',
    m: 'month',
    y: 'year',
  }

  const expiresAt
    = data.expiresAt === 'never'
      ? null
      : dayjs()
          .add(Number(expiresAtValue), expiresAtUnitMap[expiresAtUnit as keyof typeof expiresAtUnitMap])
          .toISOString()

  const [apiKey] = await db
    .insert(tables.apiKeys)
    .values({
      ...data,
      key: randomUUID(),
      userId: user.id,
      expiresAt,
    })
    .returning({
      id: tables.apiKeys.id,
      key: tables.apiKeys.key,
    })

  if (!apiKey) {
    throw createHttpError('internalServerError')
  }

  return apiKey
})
