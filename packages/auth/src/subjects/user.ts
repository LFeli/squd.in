import { z } from 'zod'

export const userSubject = z.tuple([
  z.union([
    z.literal('manage'),

    z.literal('create'),
    z.literal('invite'),
    z.literal('delete'),
  ]),
  z.literal('User'),
])

export type UserSubject = z.infer<typeof userSubject>
