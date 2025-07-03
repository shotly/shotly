import type { ProfilePasswordUpdatePayload, ProfilePasswordUpdateResult } from '#shared/api'
import { profilePasswordUpdatePayloadSchema } from '#shared/api'

interface ProfilePasswordUpdateRequest {
  body: ProfilePasswordUpdatePayload
}

/**
 * Update user password
 */
export default defineHttpHandler<ProfilePasswordUpdateRequest, ProfilePasswordUpdateResult>(async (event) => {
  const _data = await readValidatedBody(event, profilePasswordUpdatePayloadSchema.parse)

  return {} as ProfilePasswordUpdateResult // todo: implement
})
