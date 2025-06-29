import { tables, useDatabase } from '@shotly/db'
import { count } from 'drizzle-orm'

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Run database seeders',
  },
  async run() {
    const db = useDatabase()

    // if users not exists, create admin user
    const users = await db.select({ count: count() }).from(tables.users)
    if (users.length === 0) {
      await db.insert(tables.users).values({
        name: 'Admin',
        email: 'admin@shotly.dev',
        role: 'admin',
        password: await hashPassword('password'),
      })
    }

    return {
      result: 'Database seeders completed',
    }
  },
})
