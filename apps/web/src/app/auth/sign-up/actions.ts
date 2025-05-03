'use server'

import { createAccount } from '@/http/auth/auth'
import type { FormState } from '@/types/form'

import { signUpSchema } from './validation'

export async function signUpAction(data: FormData): Promise<FormState> {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    return {
      success: false,
      message: 'Something went wrong, please try again',
      errors: null,
    }
  }

  try {
    const { name, email, password } = result.data

    await createAccount({
      name,
      email,
      password,
    })
  } catch {
    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
