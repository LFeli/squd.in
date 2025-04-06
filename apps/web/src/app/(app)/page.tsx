import { HeaderComponent } from '@/components/layout/header/header'

export default async function Home() {
  return (
    <div className="space-y-4 py-4">
      <HeaderComponent />

      <main className="mx-auto w-full max-w-[1200px] space-y-4 px-8">
        <p className="text-muted-foreground text-sm">Select an organization</p>
      </main>
    </div>
  )
}
