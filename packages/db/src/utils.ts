import type { AnyColumn, SQLWrapper } from 'drizzle-orm'
import { asc, desc } from 'drizzle-orm'

/**
 * Sort a column by ascending or descending order.
 *
 * @param column - The column to sort.
 * @param sortType - The sort type.
 * @returns The sorted column.
 *
 * @example
 * ```ts
 * sort(users.id, 'asc') // asc(users.id)
 * ```
 */
export function sort(column: AnyColumn | SQLWrapper, sortType: 'asc' | 'desc' = 'asc') {
  return sortType === 'asc' ? asc(column) : desc(column)
}
