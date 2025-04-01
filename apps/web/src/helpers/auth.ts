import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/api'
import { isHttpError } from '@/utils/is-http-error'

export async function isAuthenticated() {
  const cookie = await cookies()

  return Boolean(cookie.get('token')?.value)
}

export async function authenticateUser() {
  const cookie = await cookies()
  const token = cookie.get('token')?.value

  if (!token) {
    return redirect('/auth/sign-in')
  }

  try {
    const {
      data: { user },
      status,
    } = await getProfile()

    if (isHttpError(status)) {
      throw new Error()
    }

    return { user }
  } catch {}

  return redirect('/auth/sign-in')
}
