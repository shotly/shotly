import type { AuthLoginCreatePayload, AuthLoginCreateResult } from '#shared/api'
import { authLoginCreatePayloadSchema } from '#shared/api'

interface AuthLoginCreateRequest {
  body: AuthLoginCreatePayload
}

/**
 * Login user
 */
export default defineHttpHandler<AuthLoginCreateRequest, AuthLoginCreateResult>(async (event) => {
  const _data = await readValidatedBody(event, authLoginCreatePayloadSchema.parse)

  return {} as AuthLoginCreateResult // todo: implement
})
