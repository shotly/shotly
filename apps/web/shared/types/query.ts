export interface SortQueryRaw {
  sortColumn?: string
  sortType?: string
}

export interface SortQuery<K = string> {
  sortColumn: K
  sortType: 'asc' | 'desc'
}

export interface PaginationQueryRaw {
  page?: string
  perPage?: string
}

export interface PaginationQuery {
  page: number
  perPage: number
}
