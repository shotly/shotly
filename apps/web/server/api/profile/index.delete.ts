import type { ProfileDeletePayload, ProfileDeleteResult } from '#shared/api'
import { profileDeletePayloadSchema } from '#shared/api'

interface ProfileDeleteRequest {
  body: ProfileDeletePayload
}

/**
 * Delete user profile
 */
export default defineHttpHandler<ProfileDeleteRequest, ProfileDeleteResult>(async (event) => {
  const _data = await readValidatedBody(event, profileDeletePayloadSchema.parse)

  return {} as ProfileDeleteResult // todo: implement
})
