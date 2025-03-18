import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { authMiddleware } from '@/http/middlewares/auth'
import { rolesSchema } from '@squd-in/auth'
import { BadRequestError } from '../_erros/bad-request-error'

export async function getPendingInvites(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .post(
      '/pending-invites',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Get all user pending invites',
          security: [{ bearerAuth: [] }],
          operationId: 'getPendingInvites',

          response: {
            200: z.object({
              invites: z.array(
                z.object({
                  id: z.string().uuid(),
                  role: rolesSchema,
                  email: z.string().email(),
                  createdAt: z.date(),
                  organization: z.object({
                    name: z.string(),
                  }),
                  author: z
                    .object({
                      id: z.string().uuid(),
                      name: z.string().nullable(),
                      avatarUrl: z.string().url().nullable(),
                    })
                    .nullable(),
                })
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const userID = await request.getCurrentUserId()

        const user = await prisma.user.findUnique({
          where: {
            id: userID,
          },
        })

        if (!user) {
          throw new BadRequestError('User not found')
        }

        const invites = await prisma.invite.findMany({
          select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,

            author: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },

            organization: {
              select: {
                name: true,
              },
            },
          },

          where: {
            email: user.email,
          },
        })

        return reply.status(200).send({
          invites,
        })
      }
    )
}
