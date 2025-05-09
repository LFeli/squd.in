'use client'

import { Laptop2Icon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'

import { useMounted } from '@/hooks/use-mounted'

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {mounted && resolvedTheme === 'light' && (
            <SunIcon className="size-4" />
          )}

          {mounted && resolvedTheme === 'dark' && (
            <MoonIcon className="size-4" />
          )}

          {!mounted && <Skeleton className="size-4 rounded-full" />}

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="flex items-center gap-3"
          onClick={() => setTheme('light')}
        >
          <SunIcon className="size-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-3"
          onClick={() => setTheme('dark')}
        >
          <MoonIcon className="size-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-3"
          onClick={() => setTheme('system')}
        >
          <Laptop2Icon className="size-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
