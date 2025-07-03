import { logger } from '#shared/logger'
import { tables, useDatabase } from '@shotly/db'

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  onSuccess: async (event, { user: githubUser }) => {
    try {
      const db = useDatabase()
      // @ts-expect-error: todo: Type 'H3Event<EventHandlerRequest>' has no properties in common with type 'GetSiteConfigOptions'.
      const { allowedAuthProviders } = useSiteConfig(event)

      if (!allowedAuthProviders.github || !githubUser.email) {
        throw createHttpError('forbidden')
      }

      const user = await db.query.users.findFirst({
        columns: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
          role: true,
          lastSeenAt: true,
        },
        where: (users, { eq }) => eq(users.email, githubUser.email!),
      })

      if (user) {
        await setUserSession(event, { user })

        return sendRedirect(event, getAuthRedirectTo(event))
      }

      const newUser = await db
        .insert(tables.users)
        .values({
          email: githubUser.email!,
          name: githubUser.name,
          avatarUrl: githubUser.avatar_url,
        })
        .returning({
          id: tables.users.id,
          name: tables.users.name,
          email: tables.users.email,
          avatarUrl: tables.users.avatarUrl,
          role: tables.users.role,
          lastSeenAt: tables.users.lastSeenAt,
        })

      await setUserSession(event, { user: newUser })
    } catch (error) {
      throw await errorServerResolver(event, error)
    }

    return sendRedirect(event, getAuthRedirectTo(event))
  },
  onError: (event, error) => {
    logger.error(`GitHub OAuth error: ${error.message}`)

    return sendRedirect(event, `/login?error=${error.message}`)
  },
})
