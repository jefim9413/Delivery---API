import { FastifyInstance } from 'fastify'
import { createProduct } from '../controller/create-product'
import { verifyJwt } from '../middlewares/verify-jwt'
import { listProducts } from '../controller/list-products'

export async function productRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.post('/products', createProduct)
  app.get('/products', listProducts)
}
