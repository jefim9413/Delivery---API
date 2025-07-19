import { PrismaUsersRepository } from '@/core/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '@/core/usecases/get-user-profile'

export function makeGetUserProfileUser() {
  const usersRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
  return getUserProfileUseCase
}
