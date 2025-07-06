/** Pagination */
export interface Pagination {
  /**
   * Total items
   * @default 0
   */
  total: number
}

/**
 * Id
 * @format cuid
 * @minLength 24
 * @maxLength 24
 * @example "cma410aol00000cjobbw006p"
 */
export type CUID = string

/**
 * Api key
 * @format uuid
 * @example "123e4567-e89b-12d3-a456-426614174000"
 */
export type ApiKey = string

/** Payload "Update user details" */
export interface ProfileDetailsUpdatePayload {
  /**
   * User name
   * @minLength 3
   */
  name: string
}

/** Result "Get api keys list" */
export type ApiKeysListResult = object

/** Payload "Create new api key" */
export type ApiKeysCreatePayload = object

/** Result "Create new api key" */
export type ApiKeysCreateResult = object

/** Payload "Delete api key" */
export type ApiKeysDeletePayload = object

/** Result "Delete api key" */
export type ApiKeysDeleteResult = object

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

/** Result "Get collections list" */
export type CollectionsListResult = object

/** Payload "Create new collection" */
export type CollectionsCreatePayload = object

/** Result "Create new collection" */
export type CollectionsCreateResult = object

/** Result "Get collection by id" */
export type CollectionsGetResult = object

/** Payload "Update collection" */
export type CollectionsUpdatePayload = object

/** Result "Update collection" */
export type CollectionsUpdateResult = object

/** Payload "Delete collection" */
export type CollectionsDeletePayload = object

/** Result "Delete collection" */
export type CollectionsDeleteResult = object

/** Payload "Attach bookmark to collection" */
export type CollectionsAttachCreatePayload = object

/** Result "Attach bookmark to collection" */
export type CollectionsAttachCreateResult = object

/** Payload "Detach bookmark from collection" */
export type CollectionsDetachCreatePayload = object

/** Result "Detach bookmark from collection" */
export type CollectionsDetachCreateResult = object

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
  id: string

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
  id: string

}

/** Route "Update bookmark" */
export type BookmarksUpdateRouteParams = {
  id: string

}

/** Route "Delete bookmark" */
export type BookmarksDeleteRouteParams = {
  id: string

}

/** Query "Get collections list" */
export type CollectionsListQuery = {
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

/** Route "Get collection by id" */
export type CollectionsGetRouteParams = {
  id: string

}

/** Route "Update collection" */
export type CollectionsUpdateRouteParams = {
  id: string

}

/** Route "Delete collection" */
export type CollectionsDeleteRouteParams = {
  id: string

}

/** Route "Attach bookmark to collection" */
export type CollectionsAttachCreateRouteParams = {
  id: string

}

/** Route "Detach bookmark from collection" */
export type CollectionsDetachCreateRouteParams = {
  id: string

}
