import type { WebhooksEvent } from './types'

export const webhooksEventLabels: Record<WebhooksEvent, string> = {
  bookmarkCreated: 'bookmark.created',
  bookmarkDeleted: 'bookmark.deleted',
  collectionCreated: 'collection.created',
  collectionDeleted: 'collection.deleted',
}
