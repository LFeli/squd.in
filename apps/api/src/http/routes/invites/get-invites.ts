import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'
import { rolesSchema } from '@squd-in/auth'

import { authMiddleware } from '@/http/middlewares/auth'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_erros/unauthorized-error'

export async function getInvites(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .get(
      '/organizations/:slug/invites',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Get all invites in a organization',
          security: [{ bearerAuth: [] }],
          operationId: 'getInvites',

          params: z.object({
            slug: z.string(),
          }),

          response: {
            200: z.object({
              invites: z.array(
                z.object({
                  id: z.string().uuid(),
                  role: rolesSchema,
                  email: z.string().email(),
                  createdAt: z.date(),
                  author: z
                    .object({
                      id: z.string().uuid(),
                      name: z.string().nullable(),
                    })
                    .nullable(),
                })
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params

        const userID = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userID, membership.role)

        if (cannot('get', 'Invite')) {
          throw new UnauthorizedError(
            `You're not allowed to get organization invites.`
          )
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
              },
            },
          },

          where: {
            organizationId: organization.id,
          },

          orderBy: {
            createdAt: 'desc',
          },
        })

        return reply.status(200).send({ invites })
      }
    )
}
