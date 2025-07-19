import { OrderRepository } from '../repositories/order-repository'

export class RatingOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(orderId: string, rating: number, ratingComment: string) {
    const order = await this.orderRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }
    const newOrder = await this.orderRepository.updateRating(
      orderId,
      rating,
      ratingComment,
    )

    return newOrder
  }
}
