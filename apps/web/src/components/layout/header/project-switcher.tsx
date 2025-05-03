'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDownIcon, Loader2Icon, PlusCircleIcon } from 'lucide-react'

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
import { Skeleton } from '@/components/ui/skeleton'

import type { GetProjects200ProjectsItem } from '@/http/api.schemas'
import { getProjects } from '@/http/projects/projects'

export function ProjectSwitcher() {
  const { slug: orgSlug, project: projectSlug } = useParams<{
    slug: string
    project: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: [orgSlug, 'projects'],
    queryFn: async () => {
      const response = await getProjects(orgSlug)

      return response.data
    },
    enabled: Boolean(orgSlug),
  })

  const currentProject = data?.projects?.find(
    project => project.slug === projectSlug
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded p-1 font-medium text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <ProjectDisplay isLoading={isLoading} project={currentProject} />

        {isLoading ? (
          <Loader2Icon className="ml-auto size-4 animate-spin text-muted-foreground" />
        ) : (
          <ChevronsUpDownIcon className="ml-auto size-4 shrink-0 text-muted-foreground" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-[200px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projects</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {data?.projects?.map(project => (
            <DropdownMenuItem key={project.id} asChild>
              <Link href={`/org/${orgSlug}/project/${project.slug}`}>
                <Avatar className="mr-2 size-4">
                  {project.avatarUrl && <AvatarImage src={project.avatarUrl} />}
                  <AvatarFallback />
                </Avatar>
                <span className="line-clamp-1">{project.name}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={`/org/${orgSlug}/create-project`}>
            <PlusCircleIcon className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ProjectDisplay({
  isLoading,
  project,
}: {
  isLoading: boolean
  project?: GetProjects200ProjectsItem | undefined
}) {
  if (isLoading) {
    return (
      <>
        <Skeleton className="size-4 rounded-full" />
        <Skeleton className="h-4 w-full flex-1" />
      </>
    )
  }

  if (!project) {
    return <span className="text-muted-foreground">Select project</span>
  }

  return (
    <>
      <Avatar className="size-4">
        {project.avatarUrl && <AvatarImage src={project.avatarUrl} />}
        <AvatarFallback />
      </Avatar>
      <span className="truncate text-left">{project.name}</span>
    </>
  )
}
