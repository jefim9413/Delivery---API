import { CreateProductDTO } from '@/core/validations/product.schema'
import { makeCreateProduct } from '@/infra/factories/make-create-product'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function createProduct(
  request: FastifyRequest<{ Body: CreateProductDTO }>,
  reply: FastifyReply,
) {
  try {
    const { name, description, imageUrl, price } = request.body
    const createProductUseCase = makeCreateProduct()

    const product = await createProductUseCase.execute({
      name,
      description,
      imageUrl,
      price,
    })

    return reply.status(201).send(product)
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
