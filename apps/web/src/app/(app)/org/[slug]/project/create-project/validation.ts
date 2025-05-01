import { z } from 'zod'

export const createProjectFormSchema = z.object({
  name: z
    .string()
    .min(4, { message: 'Please, incluide at least 4 characters.' }),
  description: z.string(),
})

export type CreateProjectFormSchema = z.infer<typeof createProjectFormSchema>
