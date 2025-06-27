import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { consola } from 'consola'

/**
 * Create .env files
 *
 * @param {string} cwd - The current working directory
 */
function createEnvFile(cwd) {
  const folders = ['apps/web', 'packages/db']

  for (const folder of folders) {
    const envFile = path.join(cwd, folder, '.env')
    const envExampleFile = path.join(cwd, folder, '.env.example')

    if (fs.existsSync(envFile)) {
      continue
    }

    fs.copyFileSync(envExampleFile, envFile)
    consola.success(`Created .env file: ${envFile}`)
  }
}

/**
 * Create an empty database file
 *
 * @param {string} cwd - The current working directory
 */
function createDbFile(cwd) {
  const dbFile = path.join(cwd, 'packages/db/.data/db.sqlite3')

  if (fs.existsSync(dbFile)) {
    return dbFile
  }

  fs.writeFileSync(dbFile, '')
  consola.success(`Created empty database file: ${dbFile}`)

  return dbFile
}

/**
 * Change the database URL in the .env file
 *
 * @param {string} databaseURL - The database URL.
 */
function changeDatabaseUrl(databaseURL) {
  const envFile = path.join(process.cwd(), 'apps/web/.env')

  const env = fs.readFileSync(envFile, 'utf8')
  const envLines = env.split('\n')

  const newEnv = envLines.map((line) => {
    if (line.startsWith('APP_DATABASE_URL=')) {
      return `APP_DATABASE_URL=${databaseURL}`
    }

    return line
  })

  fs.writeFileSync(envFile, newEnv.join('\n'))
}

/**
 * Main function
 */
async function main() {
  const cwd = process.cwd()

  createEnvFile(cwd)
  const dbFile = createDbFile(cwd)
  changeDatabaseUrl(dbFile)
}

main()
  .then(() => {
    consola.success('Project prepared')
  })
  .catch((e) => {
    consola.fatal(e)
  })
