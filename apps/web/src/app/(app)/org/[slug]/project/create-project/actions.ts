import { getCurrentOrg } from '@/helpers/auth'
import { createProject } from '@/http/api'
import type { FormState } from '@/types/form'

import { createProjectFormSchema } from './validation'

export async function createProjectAction(data: FormData): Promise<FormState> {
  const result = createProjectFormSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    return {
      success: false,
      message: 'Something went wrong, please try again',
      errors: null,
    }
  }

  const { name, description } = result.data
  const org = await getCurrentOrg()

  try {
    if (!org) {
      throw Error()
    }

    await createProject(org, {
      name,
      description,
    })
  } catch {
    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the project.',
    errors: null,
  }
}
