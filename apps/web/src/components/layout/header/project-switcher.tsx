'use client'

import { getProjects } from '@/http/api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export function ProjectSwitcher() {
  const { slug: orgSlug } = useParams<{
    slug: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: ['aaa'],
    queryFn: () => getProjects(orgSlug),
    enabled: Boolean(orgSlug),
  })

  console.log('log validate fetcher', isLoading, data)

  return <span>a</span>
}
