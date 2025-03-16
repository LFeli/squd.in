import { prisma } from '@/http/lib/prisma'
import { compare } from 'bcryptjs'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import type { FastifyInstance } from 'fastify/types/instance'
import z from 'zod'

export async function authenticateWithPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/password',
    {
      schema: {
        tags: ['auth'],
        summary: 'Authenticate with e-mail and password',
        operationId: 'authenticateWithPassword',

        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        return reply.status(400).send({ message: 'invalid credentials' })
      }

      if (user.passwordHash === null) {
        return reply.status(400).send({
          message: 'user does not have a password, use a social login',
        })
      }

      const isPasswordValid = await compare(password, user.passwordHash)

      if (!isPasswordValid) {
        return reply.status(400).send({ message: 'invalid credentials' })
      }

      const token = await reply.jwtSign(
        {
          sub: user.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        }
      )

      return reply.status(201).send({ token })
    }
  )
}
