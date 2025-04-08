import { HeaderComponent } from '@/components/layout/header/header'
import { OrganizationForm } from '@/components/org/organization-form'

export default function CreateOrganizationPage() {
  return (
    <div className="space-y-4 py-4">
      <HeaderComponent />

      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <h1 className="font-bold text-2xl">Create organization</h1>

        <OrganizationForm />
      </main>
    </div>
  )
}
