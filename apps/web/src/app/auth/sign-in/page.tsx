import { Separator } from '@/components/ui/separator'
import { SignInWithEmail } from './components/sign-in-with-email'
import { SignInWithGithub } from './components/sign-in-with-github'

export default function SignInPage() {
  return (
    <section className="space-y-4">
      <SignInWithEmail />

      <Separator />

      <SignInWithGithub />
    </section>
  )
}
