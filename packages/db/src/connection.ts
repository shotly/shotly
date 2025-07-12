import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import * as schema from './tables'

export type Database = NodePgDatabase<typeof schema>

/**
 * Create a database connection.
 *
 * @param connectionString - The connection string to the database.
 * @param logger - Whether to log queries.
 * @returns The database connection.
 */
export function createConnection(connectionString: string, logger: boolean = false): Database {
  const pool = new pg.Pool({ connectionString })

  return drizzle({
    schema,
    client: pool,
    logger,
  })
}
