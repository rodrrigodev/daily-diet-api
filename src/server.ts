import fastify from 'fastify'
import { dailyDietRoutes } from './routes/daily-diet-routes'

const app = fastify()

app.register(dailyDietRoutes)

app.listen({ port: 3333 }, () => {
  console.log('Server running on port 3333')
})
