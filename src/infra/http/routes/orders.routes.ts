import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middlewares/verify-jwt'
import { createOrder } from '../controller/create-orders'
import { listOrdersUser } from '../controller/list-order-user'
import { ratingOrder } from '../controller/rating-order'

export async function orderRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/orders', createOrder)

  app.get('/orders', listOrdersUser)

  app.patch('/orders/:orderId/rating', ratingOrder)
}
