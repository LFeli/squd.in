import type { Metadata } from 'next'

import '../styles/global.css'

export const metadata: Metadata = {
  title: 'Squd.In Inc',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={'antialiased'}>{children}</body>
    </html>
  )
}
