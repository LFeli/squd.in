'use server'

import { createAccount } from '@/http/api'
import type { FormState } from '@/types/form'
import { isHttpError } from '@/utils/is-http-error'

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

  const { name, email, password } = result.data

  try {
    const { status } = await createAccount({
      name,
      email,
      password,
    })

    if (isHttpError(status)) {
      throw new Error()
    }
  } catch {
    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
