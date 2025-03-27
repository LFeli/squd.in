'use server'

import { cookies } from 'next/headers'

import type { FormState } from '@/types/form'
import { type SignInWithEmailSchema, signInWithEmailSchema } from './validation'

import { acceptInvite, authenticateWithPassword } from '@/http/api'

export async function signInWithEmailAction(
  data: SignInWithEmailSchema
): Promise<FormState> {
  const result = signInWithEmailSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      message: null,
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { email, password } = result.data

  try {
    const { token } = await authenticateWithPassword({
      email,
      password,
    })

    const cookie = await cookies()
    cookie.set('token', token, { path: '/', maxAge: 60 * 60 * 24 * 7 }) // 7 days

    const inviteId = cookie.get('inviteId')?.value

    if (inviteId) {
      await acceptInvite(inviteId)

      cookie.delete('inviteId')
    }
  } catch (error) {
    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}

export async function signInWithGithubAction(): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 5000))
  console.log('sign in with github')
}
