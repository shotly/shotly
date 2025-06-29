import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import * as schema from './tables'

export type Database = NodePgDatabase<typeof schema>

/**
 * Create a database connection.
 *
 * @param connectionString - The connection string to the database.
 * @returns The database connection.
 */
export function createConnection(connectionString: string): Database {
  const pool = new pg.Pool({ connectionString })

  return drizzle({
    schema,
    client: pool,
  })
}
