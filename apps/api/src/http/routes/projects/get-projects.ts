import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authMiddleware } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_erros/unauthorized-error'

export async function getProjects(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .get(
      '/organizations/:slug/projects',
      {
        schema: {
          tags: ['Projects'],
          summary: 'Get all organization projects',
          security: [{ bearerAuth: [] }],
          operationId: 'getProjects',

          params: z.object({
            slug: z.string(),
          }),

          response: {
            200: z.object({
              projects: z.array(
                z.object({
                  id: z.string().uuid(),
                  description: z.string(),
                  name: z.string(),
                  slug: z.string(),
                  avatarUrl: z.string().nullable(),
                  organizationId: z.string().uuid(),
                  ownerId: z.string().uuid(),
                  createdAt: z.date(),
                  owner: z.object({
                    id: z.string().uuid(),
                    name: z.string().nullable(),
                    avatarUrl: z.string().nullable(),
                  }),
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

        if (cannot('get', 'Project')) {
          throw new UnauthorizedError(
            "You're not allowed to see organization projects"
          )
        }

        const projects = await prisma.project.findMany({
          select: {
            id: true,
            ownerId: true,
            organizationId: true,
            createdAt: true,

            name: true,
            description: true,
            slug: true,
            avatarUrl: true,
            owner: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
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

        console.log(projects)

        return reply.status(200).send({ projects })
      }
    )
}
