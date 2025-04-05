import { z } from 'zod'

const DOMAIN_REGEX = /^[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/

const isValidDomain = (domain: string | null): boolean => {
  if (!domain) {
    return true
  }

  return DOMAIN_REGEX.test(domain)
}

const parseAttachUsersByDomain = (value: 'on' | 'off' | boolean): boolean => {
  return value === true || value === 'on'
}

const organizationFormSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: 'Please, include at least 4 character' }),
    domain: z
      .string()
      .nullable()
      .refine(isValidDomain, { message: 'Please, enter a valid domain' }),
    shouldAttachUsersByDomain: z
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform(parseAttachUsersByDomain)
      .default(false),
  })
  .refine(
    data => {
      if (data.shouldAttachUsersByDomain === true && !data.domain) {
        return false
      }

      return true
    },
    {
      message: 'Domain is required when auto-join is enabled.',
      path: ['domain'],
    }
  )

export type OrganizationFormSchema = z.infer<typeof organizationFormSchema>
