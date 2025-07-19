import { prisma } from '@/config/prisma/database'
import {
  OrderRepository,
  CreateOrderRequest,
  OrderResponse,
} from '@/core/repositories/order-repository'

export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(request: CreateOrderRequest): Promise<OrderResponse> {
    let totalValue = 0
    for (const item of request.items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      })
      if (!product) throw new Error(`Produto ${item.productId} não encontrado`)
      totalValue += product.price * item.quantity
    }

    return this.orderRepository.createOrder({
      ...request,
      totalValue,
    })
  }
}
