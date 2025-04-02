import Image from 'next/image'

import rocketseatIcon from '@/assets/rocketseat-icon.svg'

import { SlashIcon } from 'lucide-react'
import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'

export function HeaderComponent() {
  return (
    <header className="w-full border-b px-8 py-4">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            width={24}
            height={24}
            src={rocketseatIcon}
            alt="Rocketseat"
            className="size-6 dark:invert"
          />

          <SlashIcon className="-rotate-[24deg] size-3 text-border" />

          <OrganizationSwitcher />
        </div>

        <div className="flex items-center gap-4">
          <ProfileButton />
        </div>
      </div>
    </header>
  )
}
