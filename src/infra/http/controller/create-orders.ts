import { makeCreateOrder } from '@/infra/factories/make-create-order'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function createOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { status, items } = request.body as {
    status: string
    items: { productId: string; quantity: number }[]
  }
  const userId = request.user.sub

  const createOrderUseCase = makeCreateOrder()

  try {
    const order = await createOrderUseCase.execute({
      userId,
      status,
      items,
      totalValue: 0,
    })
    return reply.status(201).send(order)
  } catch (err) {
    return reply.status(400).send({ message: (err as Error).message })
  }
}
