import fastify from 'fastify'
import { dailyDietRoutes } from './routes/daily-diet-routes'
import cookie from '@fastify/cookie'

export const app = fastify()

app.register(cookie)
app.register(dailyDietRoutes, { prefix: '/diet' })
