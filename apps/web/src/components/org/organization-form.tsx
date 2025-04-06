'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  createOrganizationAction,
  updateOrganizationAction,
} from '@/actions/organization'
import {
  type OrganizationFormSchema,
  organizationFormSchema,
} from '@/validations/organization'

import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface OrganizationFormProps {
  isUpdating?: boolean
  initialData?: OrganizationFormSchema
}

export function OrganizationForm({
  isUpdating = false,
  initialData,
}: OrganizationFormProps) {
  const formAction = isUpdating
    ? updateOrganizationAction
    : createOrganizationAction

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationFormSchema>({
    resolver: zodResolver(organizationFormSchema),
  })

  async function onSubmitForm(data: OrganizationFormSchema) {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('domain', data.domain ?? '')
    formData.append(
      'shouldAttachUsersByDomain',
      data.shouldAttachUsersByDomain ? 'true' : 'false'
    )

    const { success, message } = await formAction(formData)

    if (success === false && message) {
      toast.error(message)
    }

    if (success) {
      toast.success(message)

      // reset()
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmitForm)}>
      <article className="block space-y-3">
        <Label htmlFor="name">Organization name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Your organization name here."
          defaultValue={initialData?.name}
          disabled={isSubmitting}
          {...register('name')}
        />

        {errors.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}
      </article>

      <article className="block space-y-3">
        <Label htmlFor="domain">E-mail domain</Label>
        <Input
          id="domain"
          type="text"
          inputMode="url"
          placeholder="example.com"
          defaultValue={initialData?.domain ?? undefined}
          disabled={isSubmitting}
          {...register('domain')}
        />

        {errors.domain && (
          <p className="text-red-500 text-xs">{errors.domain.message}</p>
        )}
      </article>

      <article className="block space-y-3">
        <div className=" space-y-3">
          <div className="flex translate-y-0.5 items-center space-x-3">
            <Controller
              control={control}
              name="shouldAttachUsersByDomain"
              render={({ field }) => (
                <Checkbox
                  id="shouldAttachUsersByDomain"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                  defaultChecked={initialData?.shouldAttachUsersByDomain}
                />
              )}
            />

            <Label htmlFor="shouldAttachUsersByDomain">
              <span className="font-medium text-sm leading-none">
                Auto-join new members
              </span>
            </Label>
          </div>

          <p className="text-muted-foreground text-sm">
            This will automatically invite all members with same e-mail domain
            to this organization.
          </p>
        </div>

        {errors.shouldAttachUsersByDomain && (
          <p className="text-red-500 text-xs">
            {errors.shouldAttachUsersByDomain.message}
          </p>
        )}
      </article>

      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2Icon className="size-4 animate-spin" />
        ) : (
          'Save organization'
        )}
      </Button>
    </form>
  )
}
