import { OrganizationForm } from '@/components/org/organization-form'
import { SheetContentIntercepted } from '@/components/org/sheet-content-intercepted'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

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
