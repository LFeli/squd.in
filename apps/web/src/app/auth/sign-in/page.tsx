import Image from 'next/image'
import Link from 'next/link'

import githubIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SignInPage() {
  return (
    <form className="space-y-4">
      <article className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </article>

      <article className="space-y-2">
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

      <Separator />

      <Button type="submit" className="w-full" variant="outline">
        <Image
          src={githubIcon}
          alt="github icon"
          className="mr-2 size-4 dark:invert"
        />
        Sign in with GitHub
      </Button>
    </form>
  )
}
