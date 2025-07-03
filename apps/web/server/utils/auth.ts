import type { H3Event } from 'h3'
import { REDIRECT_TO_COOKIE } from '#shared/auth'

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
