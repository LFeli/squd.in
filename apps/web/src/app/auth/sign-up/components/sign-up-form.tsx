'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import githubIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { signInWithGithubAction } from '../../sign-in/actions'
import { signUpAction } from '../actions'
import { type SignUpSchema, signUpSchema } from '../validation'

export function SignUpForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  async function onSubmitForm(data: SignUpSchema) {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)

    const { success, message } = await signUpAction(formData)

    if (success === false && message) {
      toast.error('Sign up failed!', {
        description: message,
      })
    }

    if (success) {
      router.push('/auth/sign-in')
    }
  }

  return (
    <section className="space-y-4">
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <article className="block space-y-3">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            disabled={isSubmitting}
            {...register('name')}
          />

          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </article>

        <article className="block space-y-3">
          <Label htmlFor="email">E-mail</Label>
          <Input
            type="email"
            id="email"
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
        </article>

        <article className="block space-y-3">
          <Label htmlFor="password_confirmation">Confirm your password</Label>
          <Input
            type="password"
            id="password_confirmation"
            disabled={isSubmitting}
            {...register('password_confirmation')}
          />

          {errors.password_confirmation && (
            <p className="text-red-500 text-xs">
              {errors.password_confirmation.message}
            </p>
          )}
        </article>

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2Icon className="size-5 animate-spin" />
          ) : (
            'Create account'
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
            href="/auth/sign-in"
            aria-disabled={isSubmitting}
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
          >
            Already registered? Sign In
          </Link>
        </Button>
      </form>

      <Separator />

      <form onSubmit={signInWithGithubAction}>
        <Button
          variant={'outline'}
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2Icon className="size-5 animate-spin" />
          ) : (
            <>
              <Image
                src={githubIcon}
                alt="github icon"
                className="mr-2 size-4 dark:invert"
              />
              Sign in with GitHub
            </>
          )}
        </Button>
      </form>
    </section>
  )
}
