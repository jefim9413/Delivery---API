import { makeRatingOrders } from '@/infra/factories/make-rating-order'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function ratingOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { orderId } = request.params as { orderId: string }
  const { rating, ratingComment } = request.body as {
    rating: number
    ratingComment: string
  }

  try {
    const ratingOrderUseCase = makeRatingOrders()
    const order = await ratingOrderUseCase.execute(
      orderId,
      rating,
      ratingComment,
    )
    return reply.status(200).send(order)
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
