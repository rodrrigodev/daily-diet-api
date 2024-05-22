import { FastifyInstance } from 'fastify'
import { knex } from '../knex'

export async function dailyDietRoutes(app: FastifyInstance) {
  app.get('/diet', async () => {
    const tables = await knex('sqlite_schema').select().returning('*')

    return tables
  })
}
