import { ProjectForm } from '@/app/(app)/org/[slug]/create-project/_components/project-form'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { SheetContentIntercepted } from '@/components/ui/sheet-content-intercepted'

export default function CreateProjectSheet() {
  return (
    <Sheet defaultOpen>
      <SheetContentIntercepted>
        <SheetHeader>
          <SheetTitle>Create project</SheetTitle>
        </SheetHeader>

        <div className="py-4">
          <ProjectForm />
        </div>
      </SheetContentIntercepted>
    </Sheet>
  )
}
