import type { AuthRegisterCreatePayload, AuthRegisterCreateResult } from '#shared/api'
import { authRegisterCreatePayloadSchema } from '#shared/api'

interface AuthRegisterCreateRequest {
  body: AuthRegisterCreatePayload
}

/**
 * Register new user
 */
export default defineEventHandler<AuthRegisterCreateRequest, AuthRegisterCreateResult>(async (event) => {
  const _data = await readValidatedBody(event, authRegisterCreatePayloadSchema.parse)

  return {} as AuthRegisterCreateResult // todo: implement
})
