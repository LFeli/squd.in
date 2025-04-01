import { redirect } from 'next/navigation'

import { Toaster } from '@/components/ui/sonner'
import { isAuthenticated } from '@/helpers/auth'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (await isAuthenticated()) {
    redirect('/')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-xs">{children}</div>
      <Toaster closeButton richColors />
    </main>
  )
}
