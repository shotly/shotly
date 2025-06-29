import process from 'node:process'
import { createDatabaseInstance } from '@shotly/db'
import { consola } from 'consola'

export default defineNitroPlugin(async () => {
  const runtimeConfig = useRuntimeConfig()

  if (!runtimeConfig.databaseURL) {
    consola.fatal('ENV APP_DATABASE_URL is not set')
    process.exit(1)
  }

  createDatabaseInstance(runtimeConfig.databaseURL)

  // In dev mode, don't run migrations, use the `pnpm db:*` commands instead
  if (import.meta.dev) {
    return
  }

  const tasks = ['db:migrate', 'db:seed']

  for (const task of tasks) {
    const { result } = await runTask(task)
    consola.info(result)
  }
})
