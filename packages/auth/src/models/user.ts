import { z } from 'zod'
import { rolesSchema } from '../roles'

export const userSchema = z.object({
  role: rolesSchema,
})

export type User = z.infer<typeof userSchema>
