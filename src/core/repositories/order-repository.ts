import { Order } from '@prisma/client'

export interface CreateOrderRequest {
  userId: string
  status: string
  totalValue: number
  items: {
    productId: string
    quantity: number
  }[]
}

export interface OrderResponse {
  id: string
  userId: string
  status: string
  totalValue: number
  items: {
    id: string
    productId: string
    quantity: number
    product: {
      id: string
      name: string
      price: number
    }
  }[]
}

export interface OrderRepository {
  createOrder(data: CreateOrderRequest): Promise<OrderResponse>
  findById(id: string): Promise<OrderResponse | null>
  findAll(): Promise<OrderResponse[]>
  findByUserId(userId: string): Promise<OrderResponse[]>
  updateRating(
    orderId: string,
    rating: number,
    ratingComment: string,
  ): Promise<Order>
}
