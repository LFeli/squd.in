'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePasswordVisibility } from '@/hooks/use-password-visibility'

import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { signInWithEmailAction } from '../actions'
import {
  type SignInWithEmailSchema,
  signInWithEmailSchema,
} from '../validation'

export function SignInWithEmail() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isVisible, toggleVisibility } = usePasswordVisibility()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInWithEmailSchema>({
    resolver: zodResolver(signInWithEmailSchema),
  })

  async function onSubmitForm(data: SignInWithEmailSchema) {
    const formData = new FormData()

    formData.append('email', data.email)
    formData.append('password', data.password)

    const { success, message } = await signInWithEmailAction(formData)

    if (success === false && message) {
      toast.error(message)
    }

    if (success) {
      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <article className="block space-y-3">
        <Label htmlFor="email">E-mail</Label>
        <Input
          type="email"
          id="email"
          defaultValue={searchParams.get('email') ?? ''}
          disabled={isSubmitting}
          {...register('email')}
        />

        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
      </article>

      <article className="block space-y-3">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            type={isVisible ? 'text' : 'password'}
            id="password"
            className="pr-12"
            disabled={isSubmitting}
            {...register('password')}
          />

          <Button
            variant={'link'}
            size={'icon'}
            type="button"
            onClick={toggleVisibility}
            className="absolute top-0 right-2 cursor-pointer"
            disabled={isSubmitting}
            aria-label={isVisible ? 'hide password' : 'show password'}
          >
            {isVisible ? (
              <EyeOffIcon className="size-4" />
            ) : (
              <EyeIcon className="size-4" />
            )}
          </Button>
        </div>

        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}

        <Button
          variant={'link'}
          size={'sm'}
          className="w-full justify-start px-0"
          asChild
        >
          <Link
            href="/auth/forgot-password"
            aria-disabled={isSubmitting}
            className="text-xs aria-disabled:pointer-events-none aria-disabled:opacity-50"
          >
            Forgot your password?
          </Link>
        </Button>
      </article>

      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2Icon className="size-5 animate-spin" />
        ) : (
          'Sign in with e-mail'
        )}
      </Button>

      <Button
        variant={'link'}
        size={'sm'}
        className="w-full"
        disabled={isSubmitting}
        asChild
      >
        <Link
          href="/auth/sign-up"
          aria-disabled={isSubmitting}
          className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
        >
          Create new account
        </Link>
      </Button>
    </form>
  )
}
