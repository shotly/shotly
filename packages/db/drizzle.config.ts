import process from 'node:process'
import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: ['.env', '.env.local'] })

if (!process.env.APP_DATABASE_URL) {
  throw new Error('APP_DATABASE_URL is not defined')
}

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/tables.ts',
  out: './migrations',
  dbCredentials: {
    url: process.env.APP_DATABASE_URL,
  },
})
