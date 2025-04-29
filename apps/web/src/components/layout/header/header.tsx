import Image from 'next/image'

import { SlashIcon } from 'lucide-react'

import rocketseatIcon from '@/assets/rocketseat-icon.svg'
import { Separator } from '@/components/ui/separator'
import { ability } from '@/helpers/auth'

import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'
import { ProjectSwitcher } from './project-switcher'
import { ThemeSwitcher } from './theme-switcher'

export async function HeaderComponent() {
  const permissions = await ability()

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

          {permissions?.can('get', 'Project') && (
            <>
              <SlashIcon className="-rotate-[24deg] size-3 text-border" />
              <ProjectSwitcher />
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Separator orientation="vertical" className="h-5" />
          <ProfileButton />
        </div>
      </div>
    </header>
  )
}
