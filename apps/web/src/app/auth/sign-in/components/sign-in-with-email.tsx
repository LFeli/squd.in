'use client'

import { Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { signInWithEmailAction } from '../actions'
import {
  type SignInWithEmailSchema,
  signInWithEmailSchema,
} from '../validation'

export function SignInWithEmail() {
  const searchParams = useSearchParams()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignInWithEmailSchema>({
    resolver: zodResolver(signInWithEmailSchema),
  })

  return (
    <form onSubmit={handleSubmit(signInWithEmailAction)} className="space-y-4">
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
        <Input
          type="password"
          id="password"
          disabled={isSubmitting}
          {...register('password')}
        />

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
