import { redirect } from 'next/navigation'

import { HeaderComponent } from '@/components/layout/header/header'
import { ability } from '@/helpers/auth'

import { ProjectForm } from './_components/project-form'

export default async function CreateProjectPage() {
  const permissions = await ability()

  if (permissions?.cannot('create', 'Project')) {
    redirect('/')
  }

  return (
    <div className="space-y-4 py-4">
      <HeaderComponent />
      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <h1 className="font-bold text-2xl">Create project</h1>

        <ProjectForm />
      </main>
    </div>
  )
}
