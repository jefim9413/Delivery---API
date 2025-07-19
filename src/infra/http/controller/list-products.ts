import { makeListProducts } from '@/infra/factories/make-list-products'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const listProductsUseCase = makeListProducts()
    const products = await listProductsUseCase.execute()
    return reply.status(200).send(products)
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
