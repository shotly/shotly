import type { Pagination } from '#shared/api'
import type { KeysMatching } from '#shared/types/utils'

export function extractPaginationData<T extends { total: number }>(data: T[]): { items: Omit<T, 'total'>[], pagination: Pagination }
export function extractPaginationData<T extends object, K extends KeysMatching<T, number>>(data: T[], key: K): { items: Omit<T, K>[], pagination: Pagination }
export function extractPaginationData<T, K>(data: T[], key?: K) {
  if (!data.length) {
    return { items: [], pagination: { total: 0 } }
  }

  const totalKey = (key ?? 'total') as keyof T
  const total = Number(data[0]?.[totalKey]) || 0
  const items = data.map(({ [totalKey]: _, ...item }) => item)

  return {
    items,
    pagination: { total },
  }
}
