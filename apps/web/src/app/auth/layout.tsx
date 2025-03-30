import { Toaster } from '@/components/ui/sonner'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-xs">{children}</div>
      <Toaster closeButton richColors />
    </main>
  )
}
