import { tables, useDatabase } from '@shotly/db'
import { eq } from 'drizzle-orm'

/**
 * Delete user profile
 */
export default defineHttpHandler(async (event) => {
  const db = useDatabase()
  const user = await getValidatedUser(event)

  await db
    .delete(tables.users)
    .where(eq(tables.users.id, user.id))

  await clearUserSession(event)
})
