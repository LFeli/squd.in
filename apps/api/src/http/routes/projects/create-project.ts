import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authMiddleware } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { UnauthorizedError } from '../_erros/unauthorized-error'

export async function createProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .post(
      '/organizations/:slug/projects',
      {
        schema: {
          tags: ['Projects'],
          summary: 'Create a new project in a organization',
          security: [{ bearerAuth: [] }],
          operationId: 'createProject',

          params: z.object({
            slug: z.string(),
          }),

          body: z.object({
            name: z.string(),
            description: z.string(),
          }),

          response: {
            201: z.object({
              projectId: z.string().uuid(),
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

        if (cannot('create', 'Project')) {
          throw new UnauthorizedError("You're not allowed to create a project")
        }

        const { name, description } = request.body

        const project = await prisma.project.create({
          data: {
            ownerId: userID,
            organizationId: organization.id,
            name,
            slug: createSlug(name),
            description,
          },
        })

        return reply.status(201).send({ projectId: project.id })
      }
    )
}
