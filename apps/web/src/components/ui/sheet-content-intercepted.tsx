'use client'

import { useRouter } from 'next/navigation'

import * as SheetPrimitive from '@radix-ui/react-dialog'
import type { VariantProps } from 'class-variance-authority'
import { XIcon } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'

import { SheetOverlay, SheetPortal, sheetVariants } from '../ui/sheet'

interface SheetContentInterceptedProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

export const SheetContentIntercepted = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentInterceptedProps
>(({ side = 'right', className, children, ...props }, ref) => {
  const router = useRouter()

  function onDismiss() {
    router.back()
  }

  return (
    <SheetPortal>
      <SheetOverlay />

      <SheetPrimitive.Content
        ref={ref}
        onEscapeKeyDown={onDismiss}
        onPointerDownOutside={onDismiss}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}

        <button
          type="button"
          onClick={onDismiss}
          className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
        >
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
})

SheetContentIntercepted.displayName = SheetPrimitive.Content.displayName
