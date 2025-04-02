import Image from 'next/image'

import rocketseatIcon from '@/assets/rocketseat-icon.svg'

import { ProfileButton } from './profile-button'

export function HeaderComponent() {
  return (
    // <header className="mx-auto flex max-w-[1200px] items-center justify-between border-muted border-b px-8 py-4">
    <header className="w-full border-b px-8 py-4">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <Image
          width={24}
          height={24}
          src={rocketseatIcon}
          alt="Rocketseat"
          className="size-6 dark:invert"
        />

        <div className="flex items-center gap-4">
          <ProfileButton />
        </div>
      </div>
    </header>
  )
}
