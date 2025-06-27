import type { NitroPreset } from 'nitropack'
import { cp, mkdir, realpath } from 'node:fs/promises'
import { resolve } from 'node:path'

export default <NitroPreset>{
  extends: 'node-server',
  hooks: {
    async compiled(nitro) {
      /**
       * Copy migrations from the @shotly/db module to the server directory
       */
      const module = resolve('node_modules', '@shotly/db')
      const source = resolve(await realpath(module), 'migrations')
      const destination = resolve(nitro.options.output.serverDir, 'migrations')

      await mkdir(destination, { recursive: true })
      await cp(source, destination, { recursive: true })
    },
  },
}
