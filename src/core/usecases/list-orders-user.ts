import { OrderRepository } from '../repositories/order-repository'
import { UsersRepository } from '../repositories/users-repository'
import { UsersAlreadyExistsError } from './errors/users-already-exists-error'

export class ListOrdersUserUseCase {
  constructor(
    private ordersRepository: OrderRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute(userId: string) {
    const userExists = await this.usersRepository.findById(userId)

    if (!userExists) {
      throw new UsersAlreadyExistsError()
    }
    const orders = await this.ordersRepository.findByUserId(userId)

    return orders
  }
}
