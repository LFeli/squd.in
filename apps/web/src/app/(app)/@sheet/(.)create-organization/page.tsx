import { OrganizationForm } from '@/components/org/organization-form'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { SheetContentIntercepted } from '@/components/ui/sheet-content-intercepted'

export default function CreateOrganizationSheet() {
  return (
    <Sheet defaultOpen>
      <SheetContentIntercepted>
        <SheetHeader>
          <SheetTitle>Create organization</SheetTitle>
        </SheetHeader>

        <div className="p-4">
          <OrganizationForm />
        </div>
      </SheetContentIntercepted>
    </Sheet>
  )
}
