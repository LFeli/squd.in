import { authMiddleware } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import type { FastifyInstance } from 'fastify/types/instance'
import z from 'zod'
import { BadRequestError } from '../_erros/bad-request-error'
import { UnauthorizedError } from '../_erros/unauthorized-error'

export async function resetPassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password/reset',

    {
      schema: {
        tags: ['auth'],
        description: 'Reset password',
        operationId: 'resetPassword',

        body: z.object({
          code: z.string(),
          password: z.string().min(8),
        }),

        response: {
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { code, password } = request.body

      const token = await prisma.token.findUnique({
        where: { id: code },
      })

      if (!token) {
        throw new UnauthorizedError()
      }

      const passwordHash = await hash(password, 6)

      await prisma.user.update({
        where: { id: token.userId },
        data: {
          passwordHash,
        },
      })

      return reply.status(204).send()
    }
  )
}
