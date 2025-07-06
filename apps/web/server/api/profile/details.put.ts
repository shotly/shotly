import type { ProfileDetailsUpdatePayload } from '#shared/api'
import { profileDetailsUpdatePayloadSchema } from '#shared/api'

interface ProfileDetailsUpdateRequest {
  body: ProfileDetailsUpdatePayload
}

/**
 * Update user details
 */
export default defineHttpHandler<ProfileDetailsUpdateRequest, void>(async (event) => {
  const _data = await readValidatedBody(event, profileDetailsUpdatePayloadSchema.parse)

  // todo: implement
})
