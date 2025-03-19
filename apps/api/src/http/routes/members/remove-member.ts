import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authMiddleware } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { rolesSchema } from '@squd-in/auth'
import { UnauthorizedError } from '../_erros/unauthorized-error'

export async function removeMember(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .delete(
      '/organizations/:slug/members/:memberId',
      {
        schema: {
          tags: ['Members'],
          summary: 'Remove a member in a organization',
          security: [{ bearerAuth: [] }],
          operationId: 'removeMember',

          params: z.object({
            slug: z.string(),
            memberId: z.string().uuid(),
          }),

          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug, memberId } = request.params

        const userID = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const { cannot } = getUserPermissions(userID, membership.role)

        if (cannot('delete', 'User')) {
          throw new UnauthorizedError(
            `You're not allowed to remove this member from the organization.`
          )
        }

        await prisma.member.delete({
          where: {
            id: memberId,
            organizationId: organization.id,
          },
        })

        reply.status(204).send()
      }
    )
}
