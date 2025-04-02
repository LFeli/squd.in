import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z.string().refine(value => value.split(' ').length > 1, {
      message: 'Please, enter your full name',
    }),
    email: z.string().email({
      message: 'Please, provide a valid e-mail address.',
    }),
    password: z.string().min(8, {
      message: 'Password should have at least 8 characters.',
    }),
    password_confirmation: z.string(),
  })
  .refine(data => data.password === data.password_confirmation, {
    message: 'Password confirmation does not match',
    path: ['password_confirmation'],
  })

export type SignUpSchema = z.infer<typeof signUpSchema>
