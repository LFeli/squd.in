'use client'

import { useParams } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { queryClient } from '@/lib/react-query'

import { createProjectAction } from '../actions'
import {
  type CreateProjectFormSchema,
  createProjectFormSchema,
} from '../validation'

export function ProjectForm() {
  const { slug: org } = useParams<{ slug: string }>()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectFormSchema>({
    resolver: zodResolver(createProjectFormSchema),
  })

  async function onSubmitForm(data: CreateProjectFormSchema) {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('description', data.description)

    const { success, message } = await createProjectAction(formData)

    if (success === false && message) {
      toast.error(message)
    }

    if (success) {
      toast.error(message)

      queryClient.invalidateQueries({
        queryKey: [org, 'projects'],
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <article className="block space-y-3">
        <Label htmlFor="name">Project name</Label>
        <Input
          id="name"
          type="text"
          disabled={isSubmitting}
          {...register('name')}
        />

        {errors.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}
      </article>

      <article className="block space-y-3">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          type="text"
          disabled={isSubmitting}
          {...register('description')}
        />

        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description.message}</p>
        )}
      </article>

      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2Icon className="size-5 animate-spin" />
        ) : (
          'Save project'
        )}
      </Button>
    </form>
  )
}
