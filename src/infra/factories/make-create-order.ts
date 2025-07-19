import { PrismaOrderRepository } from '@/core/repositories/prisma/prisma-orders-repository'
import { CreateOrderUseCase } from '@/core/usecases/create-order'

export function makeCreateOrder() {
  const ordersRepository = new PrismaOrderRepository()
  const createOrderUseCase = new CreateOrderUseCase(ordersRepository)
  return createOrderUseCase
}
