import { UsersRepository } from '@/core/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type PublicUser = Omit<User, 'password'>

interface GetUserProfileUseCaseRequest {
  userId: string
}
interface GetUserProfileUseCaseResponse {
  user: PublicUser
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(
    request: GetUserProfileUseCaseRequest,
  ): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(request.userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const { password, ...userWithoutPassword } = user

    if (!password) {
      throw new ResourceNotFoundError()
    }

    return { user: userWithoutPassword }
  }
}
