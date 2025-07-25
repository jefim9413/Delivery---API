import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './config/env'
import { usersRoutes } from './infra/http/routes/user.routes'
import fastifyJwt from '@fastify/jwt'
import cors from '@fastify/cors'
import { productRoutes } from './infra/http/routes/product.routes'
import { orderRoutes } from './infra/http/routes/orders.routes'

export const app = fastify()

app.register(cors, {
  origin: true,
  credentials: true,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d',
  },
})

app.register(usersRoutes)
app.register(productRoutes)
app.register(orderRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
