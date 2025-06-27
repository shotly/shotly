import { resolve } from 'node:path'
import process from 'node:process'
import { migrateDatabase } from '@shotly/db'

export default defineTask({
  meta: {
    name: 'db:migrate',
    description: 'Run database migrations',
  },
  run() {
    const migrationsFolder = import.meta.dev
      ? resolve(process.cwd(), '../../packages/db/migrations')
      : resolve(process.cwd(), 'server/migrations')

    migrateDatabase(migrationsFolder)

    return {
      result: 'Database migrations completed',
    }
  },
})
