import type { PaginationQuery, PaginationQueryRaw, SortQuery, SortQueryRaw } from '#shared/types/query'

/**
 * Get validated sort
 *
 * @param query - Query
 * @param availableColumns - Available columns
 * @returns Sort
 */
export function getValidatedSort<T extends string[]>(query: SortQueryRaw, availableColumns: readonly [...T]): SortQuery<T[number]> {
  if (!query.sortColumn || !availableColumns.includes(query.sortColumn)) {
    throw createHttpError('badRequest')
  }

  const sortType = query.sortType === 'asc' ? 'asc' : 'desc'
  const sortColumn = query.sortColumn as T[number]

  return {
    sortType,
    sortColumn,
  }
}

/**
 * Get validated pagination
 *
 * @param query - Query
 * @returns Pagination
 */
export function getValidatedPagination(query: PaginationQueryRaw): PaginationQuery & { pageOffset: number } {
  const perPage = Number(query.perPage)

  if (!Number.isInteger(perPage) || perPage < 1 || perPage > 100) {
    throw createHttpError('badRequest')
  }

  const page = Number(query.page) || 1
  const pageOffset = (page - 1) * perPage

  return {
    page,
    perPage,
    pageOffset,
  }
}
