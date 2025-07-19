import { prisma } from '@/config/prisma/database'
import {
  CreateOrderRequest,
  OrderRepository,
  OrderResponse,
} from '../order-repository'

export class PrismaOrderRepository implements OrderRepository {
  async createOrder(data: CreateOrderRequest): Promise<OrderResponse> {
    const order = await prisma.order.create({
      data: {
        userId: data.userId,
        status: data.status,
        totalValue: data.totalValue,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: { include: { product: true } },
      },
    })
    return order as unknown as OrderResponse
  }

  async findById(id: string): Promise<OrderResponse | null> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { product: true } },
      },
    })
    return order as unknown as OrderResponse
  }

  async findAll(): Promise<OrderResponse[]> {
    const orders = await prisma.order.findMany({
      include: {
        items: { include: { product: true } },
      },
    })
    return orders as unknown as OrderResponse[]
  }

  async findByUserId(userId: string): Promise<OrderResponse[]> {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: { include: { product: true } },
      },
    })
    return orders as unknown as OrderResponse[]
  }

  async updateRating(id: string, rating: number, ratingComment: string) {
    const order = await prisma.order.update({
      where: { id },
      data: {
        rating,
        ratingComment,
      },
    })
    return order
  }
}
