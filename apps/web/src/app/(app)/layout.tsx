import { redirect } from 'next/navigation'

import { HeaderComponent } from '@/components/layout/header/header'
import { isAuthenticated } from '@/helpers/auth'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  return (
    <div className="space-y-4 py-4">
      <HeaderComponent />

      <main className="mx-auto w-full max-w-[1200px]">{children}</main>
    </div>
  )
}
