'use server'

import { cookies } from 'next/headers'

import { acceptInvite, authenticateWithPassword } from '@/http/api'
import type { FormState } from '@/types/form'
import { isHttpError } from '@/utils/is-http-error'

import { signInWithEmailSchema } from './validation'

export async function signInWithEmailAction(
  data: FormData
): Promise<FormState> {
  const result = signInWithEmailSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    return {
      success: false,
      message: 'Something went wrong, please try again',
      errors: null,
    }
  }

  const { email, password } = result.data

  try {
    const {
      data: { token },
      status,
    } = await authenticateWithPassword({
      email,
      password,
    })

    if (isHttpError(status)) {
      throw new Error()
    }

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
