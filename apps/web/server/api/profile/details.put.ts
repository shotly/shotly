import type { ProfileDetailsUpdatePayload, ProfileDetailsUpdateResult } from '#shared/api'
import { profileDetailsUpdatePayloadSchema } from '#shared/api'

interface ProfileDetailsUpdateRequest {
  body: ProfileDetailsUpdatePayload
}

/**
 * Update user details
 */
export default defineHttpHandler<ProfileDetailsUpdateRequest, ProfileDetailsUpdateResult>(async (event) => {
  const _data = await readValidatedBody(event, profileDetailsUpdatePayloadSchema.parse)

  return {} as ProfileDetailsUpdateResult // todo: implement
})
