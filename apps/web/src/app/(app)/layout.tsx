import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/helpers/auth'

export default function AppLayout({
  children,
  teste,
}: Readonly<{
  children: React.ReactNode
  teste: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  return (
    <>
      {children}
      {teste}
    </>
  )
}
