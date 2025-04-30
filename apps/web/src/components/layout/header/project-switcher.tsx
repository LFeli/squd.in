'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDownIcon, PlusCircleIcon } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { getProjects } from '@/http/api'

export function ProjectSwitcher() {
  const { slug: orgSlug } = useParams<{
    slug: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: [orgSlug, 'projects'],
    queryFn: () => getProjects(orgSlug),
    enabled: Boolean(orgSlug),
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded p-1 font-medium text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <span className="text-muted-foreground">Select project</span>

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
          <DropdownMenuSeparator />

          <DropdownMenuItem /* key={organization.id} */ asChild>
            <Link href={''}>
              <Avatar className="mr-2 size-4">
                {/* {organization.avatarUrl && (
                       <AvatarImage src={organization.avatarUrl} />
                     )} */}
                <AvatarFallback />
              </Avatar>
              <span className="line-clamp-1">Projeto teste</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="">
            <PlusCircleIcon className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
