import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import BetterSqlite3 from 'better-sqlite3'
import { consola } from 'consola'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './tables'

export type Database = BetterSQLite3Database<typeof schema>

/**
 * Create a database connection.
 *
 * @param path - The path to the database file.
 * @returns The database connection.
 */
export function createConnection(path: string): Database {
  if (!existsSync(dirname(path))) {
    consola.info('Database directory does not exist, creating it', path)
    mkdirSync(dirname(path), { recursive: true })
  }

  const sqlite = new BetterSqlite3(path)
  consola.info('Database connection created', resolve(process.cwd(), path))

  return drizzle(sqlite, {
    schema,
  })
}
