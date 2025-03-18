import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authMiddleware } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_erros/bad-request-error'
import { UnauthorizedError } from '../_erros/unauthorized-error'

export async function getProjectDetails(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .get(
      '/organizations/:orgSlug/projects/:projectSlug',
      {
        schema: {
          tags: ['Projects'],
          summary: 'Get Project Details',
          security: [{ bearerAuth: [] }],
          operationId: 'getProjectDetails',

          params: z.object({
            orgSlug: z.string(),
            projectSlug: z.string().uuid(),
          }),

          response: {
            200: z.object({
              project: z.object({
                id: z.string().uuid(),
                description: z.string(),
                name: z.string(),
                slug: z.string(),
                avatarUrl: z.string().nullable(),
                organizationId: z.string().uuid(),
                ownerId: z.string().uuid(),
                owner: z.object({
                  id: z.string().uuid(),
                  name: z.string().nullable(),
                  avatarUrl: z.string().nullable(),
                }),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { orgSlug, projectSlug } = request.params

        const userID = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(orgSlug)

        const { cannot } = getUserPermissions(userID, membership.role)

        if (cannot('get', 'Project')) {
          throw new UnauthorizedError("You're not allowed to see this project")
        }

        const project = await prisma.project.findUnique({
          select: {
            id: true,
            name: true,
            description: true,
            slug: true,
            ownerId: true,
            avatarUrl: true,
            organizationId: true,
            owner: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },

          where: {
            slug: projectSlug,
            organizationId: organization.id,
          },
        })

        if (!project) {
          throw new BadRequestError('Project not found')
        }

        return reply.status(200).send({ project })
      }
    )
}
