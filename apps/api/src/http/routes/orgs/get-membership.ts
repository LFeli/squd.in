import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authMiddleware } from '@/http/middlewares/auth'
import { rolesSchema } from '@squd-in/auth'

export async function getMembership(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .get(
      '/organization/:slug/membership',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Get organization membership on organization',
          security: [{ bearerAuth: [] }],
          operationId: 'getMembership',

          params: z.object({
            slug: z.string(),
          }),

          response: {
            200: z.object({
              membership: z.object({
                id: z.string().uuid(),
                organizationId: z.string().uuid(),
                role: rolesSchema,
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const { membership } = await request.getUserMembership(slug)

        return reply.status(200).send({
          membership: {
            id: membership.id,
            organizationId: membership.organizationId,
            role: membership.role,
          },
        })
      }
    )
}
