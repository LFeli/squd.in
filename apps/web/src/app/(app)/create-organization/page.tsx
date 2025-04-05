import { OrganizationForm } from '@/components/org/organization-form'

export default function CreateOrganizationPage() {
  return (
    <div className="mx-auto w-full max-w-md space-y-6 py-4">
      <h1 className="font-bold text-2xl">Create organization</h1>

      <OrganizationForm />
    </div>
  )
}
