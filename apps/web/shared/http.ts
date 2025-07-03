export type HttpStatusKey = keyof typeof httpStatuses

/**
 * Used to get the error code by key.
 * For i18n, use the key `httpStatuses.${key}`.
 */
export const httpStatuses = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  requestTimeout: 408,
  internalServerError: 500,
} as const
