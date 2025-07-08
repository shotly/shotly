import type { WebhooksEvent } from './types'

export const webhooksEventLabels: Record<WebhooksEvent, string> = {
  bookmarkCreated: 'Bookmark created',
  bookmarkDeleted: 'Bookmark deleted',
  collectionCreated: 'Collection created',
  collectionDeleted: 'Collection deleted',
}
