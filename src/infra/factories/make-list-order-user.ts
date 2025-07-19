import { PrismaOrderRepository } from '@/core/repositories/prisma/prisma-orders-repository'
import { PrismaUsersRepository } from '@/core/repositories/prisma/prisma-users-repository'
import { ListOrdersUserUseCase } from '@/core/usecases/list-orders-user'

export function makeListOrdersUser() {
  const ordersRepository = new PrismaOrderRepository()
  const usersRepository = new PrismaUsersRepository()
  const listOrdersUseCase = new ListOrdersUserUseCase(
    ordersRepository,
    usersRepository,
  )
  return listOrdersUseCase
}
