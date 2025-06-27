import type { Database } from './connection'
import { consola } from 'consola'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { createConnection } from './connection'

let instance: Database | null = null

/**
 * Create a database instance.
 *
 * @param path - The path to the database file.
 * @returns The database instance.
 */
export function createDatabaseInstance(path: string): Database {
  if (instance) {
    consola.info('Database instance already created')
    return instance
  }

  instance = createConnection(path)

  return instance
}

/**
 * Get the database instance.
 *
 * @returns The database instance.
 */
export function useDatabase(): Database {
  if (!instance) {
    throw new Error('Database instance not created')
  }

  return instance
}

/**
 * Migrate the database.
 *
 * @param migrationsFolder - The migrations folder.
 */
export function migrateDatabase(migrationsFolder: string): void {
  const db = useDatabase()

  migrate(db, { migrationsFolder })
}
