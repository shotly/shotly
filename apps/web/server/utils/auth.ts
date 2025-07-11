import type { User } from '#auth-utils'
import type { H3Event } from 'h3'
import { REDIRECT_TO_COOKIE } from '#shared/auth'
import { useSiteConfig } from '#site-config/server/composables'
import { tables, useDatabase } from '@shotly/db'

/**
 * Retrieves the redirect URL after authentication.
 *
 * @param event - The H3 event.
 * @returns The redirect URL.
 */
export function getAuthRedirectTo(event: H3Event): string {
  const cookieValue = getCookie(event, REDIRECT_TO_COOKIE)

  return cookieValue ? decodeURIComponent(cookieValue) : '/'
}

/**
 * Processes the OAuth flow for a given provider and user.
 *
 * @param event - The H3 event.
 * @param provider - The OAuth provider.
 * @param oauthUser - The OAuth user.
 * @param oauthUser.email - The email of the OAuth user.
 * @param oauthUser.name - The name of the OAuth user.
 * @param oauthUser.avatarUrl - The avatar URL of the OAuth user.
 */
export async function processOAuthFlow(
  event: H3Event,
  provider: string,
  oauthUser: { email: string, name: string, avatarUrl: string },
) {
  try {
    const db = useDatabase()
    const { allowedAuthProviders } = useSiteConfig(event)

    if (!allowedAuthProviders[provider] || !oauthUser.email) {
      throw createHttpError('forbidden')
    }

    let user = await db.query.users.findFirst({
      columns: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        role: true,
        lastSeenAt: true,
      },
      where: (users, { eq }) => eq(users.email, oauthUser.email),
    })

    if (!user) {
      [user] = await db
        .insert(tables.users)
        .values({
          email: oauthUser.email,
          name: oauthUser.name,
          avatarUrl: oauthUser.avatarUrl,
        })
        .returning({
          id: tables.users.id,
          name: tables.users.name,
          email: tables.users.email,
          avatarUrl: tables.users.avatarUrl,
          role: tables.users.role,
          lastSeenAt: tables.users.lastSeenAt,
        })
    }

    if (!user) {
      throw createHttpError('internalServerError')
    }

    await setUserSession(event, { user })
  } catch (error) {
    throw await errorServerResolver(event, error)
  }
}

/**
 * Get validated user
 *
 * @param event - The H3 event.
 * @returns The user.
 */
export async function getValidatedUser(event: H3Event): Promise<User> {
  const apiKeyHeader = getHeader(event, 'x-api-key')

  if (!apiKeyHeader) {
    const { user } = await requireUserSession(event)
    return user
  }

  // todo: add cache for api keys (redis), ttl 1 hour, delete on update user https://github.com/shotly/shotly/issues/54

  const db = useDatabase()
  const apiKey = await db.query.apiKeys.findFirst({
    columns: {
      userId: true,
    },
    where: (apiKeys, { eq, or, isNull, gt, and }) => and(
      eq(apiKeys.key, apiKeyHeader),
      or(
        isNull(apiKeys.expiresAt),
        gt(apiKeys.expiresAt, new Date().toISOString()),
      ),
    ),
  })

  if (!apiKey) {
    throw createHttpError('unauthorized')
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
    where: (users, { eq }) => eq(users.id, apiKey.userId),
  })

  if (!user) {
    throw createHttpError('unauthorized')
  }

  return user
}
