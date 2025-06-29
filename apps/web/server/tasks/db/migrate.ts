import { resolve } from 'node:path'
import process from 'node:process'
import { migrateDatabase } from '@shotly/db'

export default defineTask({
  meta: {
    name: 'db:migrate',
    description: 'Run database migrations',
  },
  async run() {
    const migrationsFolder = resolve(process.cwd(), 'server/migrations')
    await migrateDatabase(migrationsFolder)

    return {
      result: 'Database migrations completed',
    }
  },
})
