'use server'

import { revalidateTag } from 'next/cache'

import { getCurrentOrg, isAuthenticated } from '@/helpers/auth'
import { createOrganization, updateOrganization } from '@/http/api'
import type { FormState } from '@/types/form'
import { isHttpError } from '@/utils/is-http-error'
import {
  type OrganizationFormSchema,
  organizationFormSchema,
} from '@/validations/organization'

const normalizeDomain = (domain: string): string | null => {
  return domain === '' || domain === 'null' ? null : domain
}

const parseBoolean = (value: string): boolean => {
  return value === 'true' || value === 'on'
}

export async function createOrganizationAction(
  data: FormData
): Promise<FormState> {
  const raw = Object.fromEntries(data)
  const parsed: OrganizationFormSchema = {
    name: raw.name as string,
    domain: normalizeDomain(raw.domain as string),
    shouldAttachUsersByDomain: parseBoolean(
      raw.shouldAttachUsersByDomain as string
    ),
  }

  const result = organizationFormSchema.safeParse(parsed)

  if (!result.success) {
    return {
      success: false,
      message: 'Something went wrong, please try again',
      errors: null,
    }
  }

  const { name, domain, shouldAttachUsersByDomain } = result.data

  try {
    const token = await isAuthenticated()

    const { status } = await createOrganization(
      {
        name,
        domain,
        shouldAttachUsersByDomain,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    if (isHttpError(status)) {
      throw new Error()
    }

    revalidateTag('organizations')
  } catch {
    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the organization.',
    errors: null,
  }
}

export async function updateOrganizationAction(
  data: FormData
): Promise<FormState> {
  const raw = Object.fromEntries(data)
  const parsed: OrganizationFormSchema = {
    name: raw.name as string,
    domain: normalizeDomain(raw.domain as string),
    shouldAttachUsersByDomain: parseBoolean(
      raw.shouldAttachUsersByDomain as string
    ),
  }

  const result = organizationFormSchema.safeParse(parsed)
  const currentOrg = await getCurrentOrg()

  if (!result.success || !currentOrg) {
    return {
      success: false,
      message: 'Something went wrong, please try again',
      errors: null,
    }
  }

  const { name, domain, shouldAttachUsersByDomain } = result.data

  try {
    const token = await isAuthenticated()

    const { status } = await updateOrganization(
      currentOrg,
      {
        name,
        domain,
        shouldAttachUsersByDomain,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    if (isHttpError(status)) {
      throw new Error()
    }

    revalidateTag('organizations')
  } catch {
    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the organization.',
    errors: null,
  }
}
