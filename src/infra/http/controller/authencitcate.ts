import { FastifyReply, FastifyRequest } from 'fastify'
import { SessionsDTO } from '@/core/validations/user.schema'
import { InvalidCredentialsError } from '@/core/usecases/errors/invalid-credentials-error'
import { makeAuthenticateUser } from '@/infra/factories/make-authenticate-user'

export async function authenticate(
  request: FastifyRequest<{ Body: SessionsDTO }>,
  reply: FastifyReply,
) {
  const { email, password } = request.body

  try {
    const authenticateUserUseCase = makeAuthenticateUser()
    const { user } = await authenticateUserUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.code(400).send({ message: err.message })
    }
    throw err
  }
}
