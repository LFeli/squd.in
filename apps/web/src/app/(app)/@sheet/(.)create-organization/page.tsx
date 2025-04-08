import { OrganizationForm } from '@/components/org/organization-form'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

export default function CreateOrganizationSheet() {
  return (
    <Sheet defaultOpen>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create organization</SheetTitle>
        </SheetHeader>

        <div className="p-4">
          <OrganizationForm />
        </div>
      </SheetContent>
    </Sheet>
  )
}
