import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { BadRequestError } from '../_erros/bad-request-error'

import { authMiddleware } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { organizationSchema } from '@squd-in/auth'
import { UnauthorizedError } from '../_erros/unauthorized-error'

export async function transferOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .patch(
      '/organizations/:slug/owner',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Transfer organization ownership',
          security: [{ bearerAuth: [] }],
          operationId: 'transferOrganization',

          params: z.object({
            slug: z.string(),
          }),

          body: z.object({
            transferToUserId: z.string().uuid(),
          }),

          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug } = await request.params
        const { transferToUserId } = request.body

        const userID = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const authOrganization = organizationSchema.parse(organization)
        const { cannot } = getUserPermissions(userID, membership.role)

        if (cannot('transfer_ownership', authOrganization)) {
          throw new UnauthorizedError(
            "You're not allowed to transfer this organization ownership"
          )
        }

        const transferToMembership = await prisma.member.findUnique({
          where: {
            organizationId_userId: {
              organizationId: organization.id,
              userId: userID,
            },
          },
        })

        if (!transferToMembership) {
          throw new BadRequestError(
            'Target user is not a member of this organization'
          )
        }

        await prisma.$transaction([
          prisma.member.update({
            where: {
              organizationId_userId: {
                organizationId: organization.id,
                userId: userID,
              },
            },

            data: {
              role: 'ADMIN',
            },
          }),

          prisma.organization.update({
            where: {
              id: organization.id,
            },

            data: {
              ownerId: transferToUserId,
            },
          }),
        ])

        return reply.status(204).send()
      }
    )
}
