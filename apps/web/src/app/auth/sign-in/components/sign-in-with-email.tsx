import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { signInWithEmailAndPassword } from '../actions'

export function SignInWithEmail() {
  return (
    <form action={signInWithEmailAndPassword} className="space-y-4">
      <article className="block space-y-3">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </article>

      <article className="block space-y-3">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password" />

        <Link
          href="/auth/forgot-password"
          className="font-medium text-foreground text-xs hover:underline"
        >
          Forgot your password?
        </Link>
      </article>

      <Button className="w-full" type="submit">
        Sign in with e-mail
      </Button>

      <Button variant={'link'} size={'sm'} className="w-full" asChild>
        <Link href="/auth/sign-up">Create new account</Link>
      </Button>
    </form>
  )
}
