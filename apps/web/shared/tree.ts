/**
 * Flatten tree to a list of items
 *
 * @param tree - Tree to flatten
 * @param childrenKey - Key of the children property
 * @returns Flattened list of items
 */
export function flattenTree<T extends Record<string, any>>(tree: T[], childrenKey: keyof T = 'children'): T[] {
  const data: T[] = []

  for (const item of tree) {
    data.push(item)

    if (item[childrenKey]) {
      data.push(...flattenTree(item[childrenKey], childrenKey))
    }
  }

  return data
}
