import type { HttpStatusKey } from '#shared/http'
import type { EventHandler, EventHandlerRequest, EventHandlerResponse, H3Event } from 'h3'
import { httpStatuses } from '#shared/http'
import { consola } from 'consola'
import defu from 'defu'
import { DrizzleQueryError } from 'drizzle-orm/errors'
import { eventHandler, H3Error } from 'h3'
import { camelCase } from 'scule'
import { z } from 'zod'

type HttpStatusesCodesMap = Record<string, HttpStatusKey>
type HttpErrorOptions = Pick<H3Error, 'cause' | 'fatal'>

/**
 * Custom error class for HTTP errors.
 *
 * @param httpStatusKey - The key representing the HTTP status.
 * @param options - Additional error options (cause, fatal).
 */
class HttpError extends Error {
  constructor(
    public readonly httpStatusKey: HttpStatusKey,
    public readonly options?: HttpErrorOptions,
  ) {
    super('Http Error')
  }
}

/**
 * Default HTTP status codes map.
 */
const defaultHttpCodes = {
  default: 'internalServerError',
  zod: 'badRequest',
  db: 'internalServerError',
} as const

/**
 * Returns a localized HTTP status message for a given status key.
 *
 * @param event - The H3 event object.
 * @param httpStatusKey - The key representing the HTTP status.
 * @returns The localized HTTP status message.
 */
export async function getHttpStatusMessage(event: H3Event, httpStatusKey: HttpStatusKey) {
  const t = await useTranslation(event)

  return t(`httpStatuses.${httpStatusKey}`)
}

/**
 * Extracts the HTTP status key from an error object using a mapping.
 *
 * @param error - The error object to extract the status key from.
 * @param httpCodesMap - Optional custom mapping for error types to status keys.
 * @returns The extracted HTTP status key.
 */
function extractHttpStatusKey<K extends keyof typeof defaultHttpCodes>(error: unknown, httpCodesMap: HttpStatusesCodesMap = {}): HttpStatusKey {
  const codesMap = defu(defaultHttpCodes, httpCodesMap)

  if (error instanceof HttpError) {
    return error.httpStatusKey
  } else if (error instanceof z.ZodError) {
    return codesMap.zod
  } else if (error instanceof DrizzleQueryError) {
    const maybeStatus = `db_${(error.cause as { code?: string } | undefined)?.code}`
    return codesMap[maybeStatus as K] ?? codesMap.db
  } else if (error instanceof H3Error && error.cause instanceof HttpError) {
    return error.cause.httpStatusKey
  } else if (error instanceof Error) {
    const maybeStatus = camelCase(error.message)

    return codesMap[maybeStatus as K] ?? codesMap.default
  }

  return codesMap.default
}

/**
 * Enriches an error object with additional data for HTTP responses.
 * For Zod errors, attaches validation issues.
 *
 * @param error - The error object to enrich.
 * @returns The enriched error object.
 */
function enrichHttpError(error: unknown): Partial<H3Error> {
  if (error instanceof z.ZodError) {
    return { data: error.issues }
  }

  return {}
}

/**
 * Resolves and formats an error for server HTTP responses.
 * Logs the error and returns a formatted H3Error with status code and message.
 *
 * @param event - The H3 event object.
 * @param error - The error to resolve.
 * @param httpCodesMap - Optional custom mapping for error types to status keys.
 * @returns The formatted H3Error for the response.
 */
async function errorServerResolver(event: H3Event, error: unknown, httpCodesMap: HttpStatusesCodesMap = {}) {
  const httpStatusKey = extractHttpStatusKey(error, httpCodesMap)
  const httpStatusMessage = await getHttpStatusMessage(event, httpStatusKey)
  const httpStatusCode = httpStatuses[httpStatusKey]

  consola.error.raw({
    key: httpStatusKey,
    code: httpStatusCode,
    ...(error instanceof HttpError ? {} : { error }),
  })

  return createError(defu(
    {
      statusCode: httpStatusCode,
      message: httpStatusMessage,
    },
    enrichHttpError(error),
  ))
}

/**
 * Creates a new HttpError instance with the given status key and options.
 *
 * @param errorStatusKey - The key representing the HTTP status.
 * @param options - Additional error options (cause, fatal).
 * @returns The created HttpError instance.
 */
export function createHttpError(errorStatusKey: HttpStatusKey, options?: HttpErrorOptions): HttpError {
  return new HttpError(errorStatusKey, options)
}

/**
 * Defines an HTTP handler that wraps the provided handler and processes errors.
 * Catches and formats errors for HTTP responses, including validation and database errors.
 *
 * @typeParam Request - The type of the request object.
 * @typeParam Response - The type of the response object.
 * @param handler - The main handler function.
 * @param options - Optional custom mapping for error types to status keys.
 * @param options.httpCodesMap - Optional custom mapping for error types to status keys.
 * @returns The wrapped event handler with error handling.
 */
export function defineHttpHandler<
  Request extends EventHandlerRequest,
  Response extends EventHandlerResponse,
>(handler: EventHandler<Request, Response | Promise<Response>>, options?: { httpCodesMap?: HttpStatusesCodesMap }): EventHandler<Request, Promise<Response>> {
  return eventHandler(async (event) => {
    try {
      return await handler(event)
    } catch (e) {
      /**
       * Since h3 wraps around validation errors, they must be handled manually.
       * @see https://github.com/unjs/h3/blob/main/src/utils/internal/validate.ts#L38
       */
      let error = e as any

      if (error.cause?.data instanceof Error) {
        error = error.cause?.data
      }

      throw await errorServerResolver(event, error, options?.httpCodesMap)
    }
  })
}
