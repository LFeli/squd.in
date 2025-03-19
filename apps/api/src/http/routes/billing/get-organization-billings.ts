import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authMiddleware } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { rolesSchema } from '@squd-in/auth'
import { BadRequestError } from '../_erros/bad-request-error'

export async function getOrganizationBilling(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .get(
      '/organizations/:slug/billing',
      {
        schema: {
          tags: ['Billing'],
          summary: 'Get billing information for an organization',
          security: [{ bearerAuth: [] }],
          operationId: 'getOrganizationBilling',

          params: z.object({
            slug: z.string(),
          }),

          response: {
            200: z.object({
              billing: z.object({
                seats: z.object({
                  amount: z.number(),
                  unit: z.number(),
                  price: z.number(),
                }),
                projects: z.object({
                  amount: z.number(),
                  unit: z.number(),
                  price: z.number(),
                }),
                total: z.number(),
              }),
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

        if (cannot('get', 'Billing')) {
          throw new BadRequestError(
            "Ypu're not allowed to get billing details from this organization"
          )
        }

        const [amountOfMembers, amountOfProjects] = await Promise.all([
          prisma.member.count({
            where: {
              organizationId: organization.id,
              role: { not: 'BILLING' },
            },
          }),

          prisma.project.count({
            where: {
              organizationId: organization.id,
            },
          }),
        ])

        const billing = {
          seats: {
            amount: amountOfMembers,
            unit: 10,
            price: amountOfMembers * 10,
          },
          projects: {
            amount: amountOfProjects,
            unit: 20,
            price: amountOfProjects * 20,
          },
          total: amountOfMembers * 10 + amountOfProjects * 20,
        }

        return reply.status(200).send({
          billing,
        })
      }
    )
}
