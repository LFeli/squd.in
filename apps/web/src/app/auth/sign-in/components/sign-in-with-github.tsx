import Image from 'next/image'

import githubIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'

import { signInWithGithubAction } from '../actions'

export function SignInWithGithub() {
  return (
    <form action={signInWithGithubAction}>
      <Button variant={'outline'} type="submit" className="w-full">
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
