import { FastifyInstance } from 'fastify'
import { createUser } from '../controller/create-user'
import { authenticate } from '../controller/authencitcate'
import { verifyJwt } from '../middlewares/verify-jwt'
import { getProfile } from '../controller/profile'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', createUser)
  app.post('/sessions', authenticate)

  app.get('/me', { onRequest: [verifyJwt] }, getProfile)
}
