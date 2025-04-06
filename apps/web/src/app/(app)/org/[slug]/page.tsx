import { HeaderComponent } from '@/components/layout/header/header'

export default async function ProjectsPage() {
  return (
    <div className="space-y-4 py-4">
      <HeaderComponent />

      <main className="mx-auto w-full max-w-[1200px] px-8">Projects</main>
    </div>
  )
}
