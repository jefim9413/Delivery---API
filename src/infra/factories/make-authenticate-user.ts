import { PrismaUsersRepository } from '@/core/repositories/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '@/core/usecases/authenticate-user'

export function makeAuthenticateUser() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

  return authenticateUserUseCase
}
