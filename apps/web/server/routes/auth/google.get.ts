import { logger } from '#shared/logger'
import { useDatabase } from '@shotly/db'

export default defineOAuthGoogleEventHandler({
  config: {
    scope: ['profile', 'email'],
  },
  onSuccess: async (event, { user: googleUser }) => {
    try {
      const _db = useDatabase()
      // @ts-expect-error: todo: Type 'H3Event<EventHandlerRequest>' has no properties in common with type 'GetSiteConfigOptions'.
      const { allowedAuthProviders } = useSiteConfig(event)

      if (!allowedAuthProviders.google || !googleUser.email) {
        throw createHttpError('forbidden')
      }

      // todo: implement
    } catch (error) {
      throw await errorServerResolver(event, error)
    }
  },
  onError: (event, error) => {
    logger.error(`Google OAuth error: ${error.message}`)

    return sendRedirect(event, `/login?error=${error.message}`)
  },
})
