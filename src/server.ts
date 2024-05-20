import fastify from 'fastify'
import { knex } from './knex'

const app = fastify()

app.get('/diet', async () => {
  const tables = await knex('sqlite_schema').select().returning('*')

  return tables
})

app.listen({ port: 3333 }, () => {
  console.log('Server running on port 3333')
})
