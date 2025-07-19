import { PrismaOrderRepository } from '@/core/repositories/prisma/prisma-orders-repository'
import { RatingOrderUseCase } from '@/core/usecases/rating-order'

export function makeRatingOrders() {
  const ordersRepository = new PrismaOrderRepository()
  const listOrdersUseCase = new RatingOrderUseCase(ordersRepository)
  return listOrdersUseCase
}
