import { redirect } from 'next/navigation'

import { defineAbilityFor } from '@squd-in/auth'

import { getProfile } from '@/http/auth/auth'
import { getMembership } from '@/http/organizations/organizations'
import { getCookie } from '@/utils/get-cookie'

export async function isAuthenticated() {
  const token = await getCookie('token')

  return Boolean(token)
}

export async function getCurrentOrg() {
  const org = await getCookie('org')

  return org
}

export async function getCurrentMembership() {
  const org = await getCurrentOrg()

  if (!org) {
    return null
  }

  const {
    data: { membership },
  } = await getMembership(org)

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
  const token = await getCookie('token')

  if (!token) {
    return redirect('/auth/sign-in')
  }

  try {
    const {
      data: { user },
    } = await getProfile()

    return { user }
  } catch {}

  redirect('/api/auth/sign-out')
}
