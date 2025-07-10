import type { ProfileDetailsUpdatePayload } from '#shared/api'
import { profileDetailsUpdatePayloadSchema } from '#shared/api'
import { tables, useDatabase } from '@shotly/db'
import { eq } from 'drizzle-orm'

interface ProfileDetailsUpdateRequest {
  body: ProfileDetailsUpdatePayload
}

/**
 * Update user details
 */
export default defineHttpHandler<ProfileDetailsUpdateRequest, void>(async (event) => {
  const db = useDatabase()
  const user = await getValidatedUser(event)
  const data = await readValidatedBody(event, profileDetailsUpdatePayloadSchema.parse)

  await db
    .update(tables.users)
    .set({
      ...data,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(tables.users.id, user.id))

  await setUserSession(event, {
    user: data,
  })
})
