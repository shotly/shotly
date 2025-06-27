export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Run database seeders',
  },
  run() {
    // ...

    return {
      result: 'Database seeders completed',
    }
  },
})
