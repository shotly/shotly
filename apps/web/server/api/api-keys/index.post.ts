import type { ApiKeysCreatePayload, ApiKeysCreateResult } from '#shared/api'
import { apiKeysCreatePayloadSchema } from '#shared/api'

interface ApiKeysCreateRequest {
  body: ApiKeysCreatePayload
}

/**
 * Create new api key
 */
export default defineHttpHandler<ApiKeysCreateRequest, ApiKeysCreateResult>(async (event) => {
  const _data = await readValidatedBody(event, apiKeysCreatePayloadSchema.parse)

  return {} as ApiKeysCreateResult // todo: implement
})
