import type { Database } from './connection'
import { resolve } from 'node:path'
import { consola } from 'consola'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { createConnection } from './connection'

let instance: Database | null = null

/**
 * Create a database instance.
 *
 * @param connectionString - The connection string to the database.
 * @returns The database instance.
 */
export function createDatabaseInstance(connectionString: string): Database {
  if (instance) {
    consola.warn('Database instance already created')
    return instance
  }

  instance = createConnection(connectionString)

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
export async function migrateDatabase(migrationsFolder: string): Promise<void> {
  const db = useDatabase()

  await migrate(db, {
    migrationsFolder: resolve(migrationsFolder),
  })
}
