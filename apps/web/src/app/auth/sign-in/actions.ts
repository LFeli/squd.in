'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { acceptInvite, authenticateWithPassword } from '@/http/api'
import type { FormState } from '@/types/form'
import { env } from '@squd-in/env'

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
    } = await authenticateWithPassword({
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
  const githubSignInURL = new URL('login/oauth/authorize', 'https://github.com')

  githubSignInURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
  githubSignInURL.searchParams.set(
    'redirect_uri',
    env.GITHUB_OAUTH_CLIENT_REDIRECT_URI
  )
  githubSignInURL.searchParams.set('scope', 'user')

  redirect(githubSignInURL.toString())
}
