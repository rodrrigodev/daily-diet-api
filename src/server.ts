import fastify from 'fastify'
import { dailyDietRoutes } from './routes/daily-diet-routes'
import { env } from './env'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)
app.register(dailyDietRoutes, { prefix: '/diet' })

app.listen({ port: env.PORT }, () => {
  console.log('Server running on port 3333')
})
