import { makeListOrdersUser } from '@/infra/factories/make-list-order-user'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listOrdersUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const userId = request.user.sub
    const listOrdersUseCase = makeListOrdersUser()
    const orders = await listOrdersUseCase.execute(userId)
    return reply.status(200).send({ orders })
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
