import { FastifyInstance } from 'fastify'
import { knex } from '../knex'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'
import { userStatistics } from '../utils/user-statistics'

export async function dailyDietRoutes(app: FastifyInstance) {
  app.get('/user', { preHandler: [checkSessionIdExists] }, async (request) => {
    const { sessionId } = request.cookies

    const user = await knex('users')
      .where('session_id', sessionId)
      .first()
      .select()

    const diets = await knex('diets').where({ user_id: user?.id }).select()

    return userStatistics(diets)
  })

  app.post('/create-user', async (request, reply) => {
    const newUserSchema = z.object({
      name: z.string(),
    })

    const { name } = newUserSchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    } else {
      reply
        .status(401)
        .send({ error: 'An authenticated user already exists, remove it!' })
    }

    await knex('users').insert({
      id: randomUUID(),
      name,
      session_id: sessionId,
    })

    reply.status(201).send({ message: 'User created successfully!' })
  })

  app.post(
    '/new',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const newDietSchema = z.object({
        name: z.string(),
        description: z.string(),
        completed: z.boolean(),
        dayAndHour: z.coerce.date(),
        active: z.coerce.boolean(),
      })

      const { sessionId } = request.cookies

      const user = await knex('users')
        .where({ session_id: sessionId })
        .first()
        .select()

      const { name, description, completed, dayAndHour, active } =
        newDietSchema.parse(request.body)

      await knex('diets').insert({
        id: randomUUID(),
        user_id: user?.id,
        name,
        description,
        completed,
        day_hour: dayAndHour.toString(),
        active,
      })

      reply.status(201).send({ message: 'Diet created successfully!' })
    },
  )

  app.get('/all', { preHandler: [checkSessionIdExists] }, async (request) => {
    const { sessionId } = request.cookies

    const user = await knex('users')
      .where({ session_id: sessionId })
      .first()
      .select()

    const diets = await knex('diets').where({ user_id: user?.id }).select()

    return { diets }
  })

  app.get('/:id', { preHandler: [checkSessionIdExists] }, async (request) => {
    const idSchema = z.object({ id: z.string() })

    const { id } = idSchema.parse(request.params)

    const diet = await knex('diets').where('id', id).first().select()

    return { diet }
  })
}
