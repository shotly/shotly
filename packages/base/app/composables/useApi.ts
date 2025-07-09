import type { AvailableRouterMethod, NitroFetchRequest } from 'nitropack'
import type { AsyncData, FetchResult, UseFetchOptions } from 'nuxt/app'
import type { DefaultAsyncDataValue } from 'nuxt/app/defaults'
import type { FetchError } from 'ofetch'
import { defu } from 'defu'

type PickFrom<T, K extends Array<string>> = T extends Array<any> ? T : T extends Record<string, any> ? keyof T extends K[number] ? T : K[number] extends never ? T : Pick<T, K[number]> : T
type KeysOf<T> = Array<T extends T ? (keyof T extends string ? keyof T : never) : never>

/**
 * Currently, it is not possible to use `useFetch` with a custom $fetch,
 * so we have to use this workaround.
 * https://github.com/nuxt/nuxt/issues/14736
 */
export function useApi<
  ResT = void,
  ErrorT = FetchError,
  ReqT extends NitroFetchRequest = NitroFetchRequest,
  Method extends AvailableRouterMethod<ReqT> = ResT extends void
    ? 'get' extends AvailableRouterMethod<ReqT>
      ? 'get'
      : AvailableRouterMethod<ReqT>
    : AvailableRouterMethod<ReqT>,
  _ResT = ResT extends void ? FetchResult<ReqT, Method> : ResT,
  DataT = _ResT,
  PickKeys extends KeysOf<DataT> = KeysOf<DataT>,
  DefaultT = DefaultAsyncDataValue,
>(
  request: Ref<ReqT> | ReqT | (() => ReqT),
  opts?: UseFetchOptions<_ResT, DataT, PickKeys, DefaultT, ReqT, Method>,
): AsyncData<PickFrom<DataT, PickKeys> | DefaultT, ErrorT | DefaultAsyncDataValue> {
  const $api = useNuxtApp().$api as typeof $fetch

  return useFetch(
    request,
    defu(
      {
        $fetch: $api,
      },
      <UseFetchOptions<_ResT, DataT, PickKeys, DefaultT, ReqT, Method>>{
        ...opts,
      },
    ),
  )
}
