/**
 * Webhook event
 *   bookmarkCreated - Bookmark created
 *   bookmarkDeleted - Bookmark deleted
 *   collectionCreated - Collection created
 *   collectionDeleted - Collection deleted
 */
export type WebhooksEvent
  = | 'bookmarkCreated'
    | 'bookmarkDeleted'
    | 'collectionCreated'
    | 'collectionDeleted'

/** Pagination */
export interface Pagination {
  /**
   * Total items
   * @default 0
   */
  total: number
}

/**
 * Date
 * @example "2025-05-01T00:00:00.000Z"
 */
export type DateType = string

/**
 * Date and time with timezone
 * @example "2025-05-01 17:15:39.189144+00"
 */
export type DateTimeType = string

/**
 * Id
 * @format cuid
 * @minLength 24
 * @maxLength 24
 * @example "cma410aol00000cjobbw006p"
 */
export type CUID = string

/** Payload "Update user details" */
export interface ProfileDetailsUpdatePayload {
  /**
   * User name
   * @minLength 3
   */
  name: string
}

/** Api key form */
export interface ApiKeyForm {
  /**
   * Api key name
   * @minLength 3
   */
  name: string
  expiresAt: '1d' | '1w' | '1m' | '1y' | 'never'
}

/** Api key */
export interface ApiKeysListItem {
  /** Id */
  id: CUID
  /**
   * Api key name
   * @minLength 3
   */
  name: string
  lastUsedAt: DateTimeType | null
  expiresAt: DateTimeType | null
  /** Date and time with timezone */
  createdAt: DateTimeType
}

/** Result "Get api keys list" */
export interface ApiKeysListResult {
  /** Api keys list */
  items: ApiKeysListItem[]
  /** Pagination */
  pagination?: Pagination
}

/** Payload "Create new api key" */
export type ApiKeysCreatePayload = ApiKeyForm

/** Result "Create new api key" */
export interface ApiKeysCreateResult {
  /** Id */
  id: CUID
  /**
   * Api key
   * @format uuid
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  key: string
}

/** Webhook form */
export interface WebhooksForm {
  /**
   * Webhook url
   * @format url
   * @example "https://example.com/webhook"
   */
  url: string
  /**
   * Webhook events
   * @minLength 1
   * @uniqueItems true
   */
  events: WebhooksEvent[]
}

/** Webhook */
export interface WebhooksListItem {
  /** Id */
  id: CUID
  /**
   * Webhook url
   * @format url
   * @example "https://example.com/webhook"
   */
  url: string
  /** Webhook events */
  events: WebhooksEvent[]
  /** Date and time with timezone */
  createdAt: DateTimeType
}

/** Result "Get webhook list" */
export type WebhooksListResult = WebhooksListItem[]

/** Payload "Create new webhook" */
export type WebhooksCreatePayload = WebhooksForm

/** Result "Create new webhook" */
export interface WebhooksCreateResult {
  /** Id */
  id: CUID
  /**
   * Webhook secret
   * @format uuid
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  secret: string
}

/** Bookmark */
export type BookmarksItem = object

/** Result "Get bookmarks list" */
export type BookmarksListResult = object

/** Payload "Create new bookmark" */
export type BookmarksCreatePayload = object

/** Result "Create new bookmark" */
export type BookmarksCreateResult = object

/** Result "Get bookmark by id" */
export type BookmarksGetResult = object

/** Payload "Update bookmark" */
export type BookmarksUpdatePayload = object

/** Result "Update bookmark" */
export type BookmarksUpdateResult = object

/** Payload "Delete bookmark" */
export type BookmarksDeletePayload = object

/** Result "Delete bookmark" */
export type BookmarksDeleteResult = object

/** Collection form */
export interface CollectionsForm {
  /**
   * Collection name
   * @minLength 3
   */
  name: string
  /** Collection description */
  description?: string
  /**
   * Collection icon
   * @minLength 5
   */
  icon: string
  /** Id */
  parentId?: CUID
  /** Collection is shared */
  isShared?: boolean
}

/** Collection */
export interface CollectionsListItem {
  /** Id */
  id: CUID
  /** Collection name */
  name: string
  /** Collection description */
  description: string | null
  /** Collection icon */
  icon: string
  /** Collection is shared */
  isShared: boolean
  /**
   * Collection sort order
   * @example 1000
   */
  sortOrder: number
  /** Collection children */
  children: CollectionsListItem[]
  /** Date and time with timezone */
  createdAt: DateTimeType
  parentId?: CUID | null
}

/** Collection */
export interface CollectionsItem {
  /** Id */
  id: CUID
  /**
   * Collection name
   * @minLength 3
   */
  name: string
  /** Collection description */
  description: string
  /**
   * Collection icon
   * @minLength 5
   */
  icon: string
  /** Collection is shared */
  isShared: boolean
  /**
   * Collection sort order
   * @example 1000
   */
  sortOrder: number
  /** Date and time with timezone */
  createdAt: DateTimeType
}

/** Result "Get collections list" */
export type CollectionsListResult = CollectionsListItem[]

/** Collection item */
export interface CollectionsReorganizeItem {
  /** Id */
  id: CUID
  parentId: CUID | null
  /**
   * Collection sort order
   * @example 1000
   */
  sortOrder: number
}

/** Payload "Reorganize collections" */
export type CollectionsReorganizeCreatePayload = CollectionsReorganizeItem[]

/** Payload "Create new collection" */
export type CollectionsCreatePayload = CollectionsForm

/** Result "Create new collection" */
export interface CollectionsCreateResult {
  /** Id */
  id: CUID
}

/** Payload "Update collection" */
export type CollectionsUpdatePayload = CollectionsForm

/** Result "Get bookmarks list by collection" */
export type CollectionsBookmarksListResult = BookmarksItem[]

/** Payload "Attach bookmark to collection" */
export interface CollectionsAttachCreatePayload {
  /** Id */
  bookmarkId: CUID
}

/** Payload "Detach bookmark from collection" */
export interface CollectionsDetachCreatePayload {
  /** Id */
  bookmarkId: CUID
}

/** Query "Get api keys list" */
export type ApiKeysListQuery = {
  /**
   * Page number
   * @default "1"
   */
  page?: string
  /**
   * Items per page
   * @default "10"
   */
  perPage?: string

}

/** Route "Delete api key" */
export type ApiKeysDeleteRouteParams = {
  /** Id */
  id: CUID

}

/** Route "Delete webhook" */
export type WebhooksDeleteRouteParams = {
  /** Id */
  id: CUID

}

/** Query "Get bookmarks list" */
export type BookmarksListQuery = {
  /**
   * Page number
   * @default "1"
   */
  page?: string
  /**
   * Items per page
   * @default "10"
   */
  perPage?: string

}

/** Route "Get bookmark by id" */
export type BookmarksGetRouteParams = {
  /** Id */
  id: CUID

}

/** Route "Update bookmark" */
export type BookmarksUpdateRouteParams = {
  /** Id */
  id: CUID

}

/** Route "Delete bookmark" */
export type BookmarksDeleteRouteParams = {
  /** Id */
  id: CUID

}

/** Route "Update collection" */
export type CollectionsUpdateRouteParams = {
  /** Id */
  id: CUID

}

/** Route "Delete collection" */
export type CollectionsDeleteRouteParams = {
  /** Id */
  id: CUID

}

/** Route "Get bookmarks list by collection" */
export type CollectionsBookmarksListRouteParams = {
  /** Id */
  id: CUID

}

/** Route "Attach bookmark to collection" */
export type CollectionsAttachCreateRouteParams = {
  /** Id */
  id: CUID

}

/** Route "Detach bookmark from collection" */
export type CollectionsDetachCreateRouteParams = {
  /** Id */
  id: CUID

}
