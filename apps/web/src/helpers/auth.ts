import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getMembership, getProfile } from '@/http/api'
import { defineAbilityFor } from '@squd-in/auth'

export async function isAuthenticated() {
  const cookie = await cookies()

  return Boolean(cookie.get('token')?.value)
}

export async function getCurrentOrg() {
  const cookie = await cookies()
  const org = cookie.get('org')?.value

  return org ?? null
}

export async function getCurrentMembership() {
  const org = await getCurrentOrg()
  const token = await isAuthenticated()

  if (!org) {
    return null
  }

  const {
    data: { membership },
  } = await getMembership(org, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
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
    } = await getProfile({ headers: { Authorization: `Bearer ${token}` } })

    return { user }
  } catch {}

  return redirect('/auth/sign-out')
}
