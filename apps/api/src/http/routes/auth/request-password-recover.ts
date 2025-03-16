import { authMiddleware } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import type { FastifyInstance } from 'fastify/types/instance'
import z from 'zod'
import { BadRequestError } from '../_erros/bad-request-error'

export async function requestPasswordRecover(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password/recover',

    {
      schema: {
        tags: ['auth'],
        description: 'Request password recover',
        operationId: 'requestPasswordRecover',

        body: z.object({
          email: z.string().email(),
        }),

        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { email } = request.body

      const userFromEmail = await prisma.user.findUnique({
        where: { email },
      })

      if (!userFromEmail) {
        // we don't want people to know if the email exists or not
        return reply.status(201).send()
      }

      const { id: code } = await prisma.token.create({
        data: {
          type: 'PASSWORD_RECOVER',
          userId: userFromEmail.id,
        },
      })

      // send e-mail with password recover link
      console.log('\n\n Recover password token: ', code)

      return reply.status(201).send()
    }
  )
}
