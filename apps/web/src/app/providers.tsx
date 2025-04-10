'use client'

import { ThemeProvider } from 'next-themes'

import { QueryClientProvider } from '@tanstack/react-query'

import { Toaster } from '@/components/ui/sonner'
import { queryClient } from '@/lib/react-query'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute={'class'}
        defaultTheme="dark"
        disableTransitionOnChange
      >
        {children}
        <Toaster closeButton richColors />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
