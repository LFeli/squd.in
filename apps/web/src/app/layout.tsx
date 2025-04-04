import type { Metadata } from 'next'

import '../styles/global.css'

import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Squd.In Inc',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={'antialiased'}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
