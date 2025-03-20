import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
  return (
    <form className="space-y-4">
      <article className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </article>

      <Button className="w-full" type="submit">
        Recover password
      </Button>

      <Button variant={'link'} size={'sm'} className="w-full" asChild>
        <Link href="/auth/sign-up">Sign in instead</Link>
      </Button>
    </form>
  )
}
