import { z } from 'zod'

export const organizationSubject = z.tuple([
  z.union([
    z.literal('manage'),

    z.literal('create'),
    z.literal('update'),
    z.literal('transfer_ownership'),
    z.literal('delete'),
  ]),
  z.literal('Organization'),
])

export type OrganizationSubject = z.infer<typeof organizationSubject>
