import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositories/users-repository'
import { UsersAlreadyExistsError } from './errors/users-already-exists-error'

interface CreateUserUsecaseRequest {
  name: string
  email: string
  password: string
}

interface CreateUserUsecaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserUsecaseRequest): Promise<CreateUserUsecaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new UsersAlreadyExistsError()
    }

    const password_hash = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash,
    })

    return { user }
  }
}
