import { ChevronsUpDownIcon, PlusCircleIcon } from 'lucide-react'

import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getOrganizations } from '@/http/api'

export async function OrganizationSwitcher() {
  const cookie = await cookies()
  const token = cookie.get('token')?.value

  if (!token) {
    return redirect('/auth/sign-in')
  }

  const {
    data: { organizations },
    status,
  } = await getOrganizations({ headers: { Authorization: `Bearer ${token}` } })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[168px] items-center gap-3 rounded p-1 font-medium text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <span className="text-muted-foreground">Select Organization</span>
        <ChevronsUpDownIcon className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-[200px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>

          {/* <DropdownMenuItem>
            <Avatar className="mr-2 size-4">
              <AvatarImage src="https://github.com/rocketseat.png" />
              <AvatarFallback />
            </Avatar>

            <span className="line-clamp-1 w-full truncate">Rocketseat</span>
          </DropdownMenuItem> */}

          {organizations.map(organization => {
            return (
              <DropdownMenuItem key={organization.id} asChild>
                <Link href={`/org/${organization.slug}`}>
                  <Avatar className="mr-2 size-4">
                    {organization.avatarUrl && (
                      <AvatarImage src={organization.avatarUrl} />
                    )}

                    <AvatarFallback />
                  </Avatar>

                  <span className="line-clamp-1 w-full truncate">
                    {organization.name}
                  </span>
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/create-organization">
            <PlusCircleIcon className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
