import React from 'react'
import { Button } from '@/components/lib/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/lib/sheet'
import { IconPencil, IconPlus } from '@tabler/icons-react'
import { FloatingLabelInput } from '../lib/floatinglabel'
import useDashboardState from '@/utils/useDashboardState'
import {
  handleDrawerOpen,
  handleDrawerClose,
  handleInputChange,
  handleSubmit,
  handleDateTimeChange,
} from '@/utils/DashboardHandlers'

interface ClientsSheetDrawerProps {
  visitor?: {
    id?: string
    first_name: string
    last_name: string
    email: string
    start_time: number
    end_time: number
  }
}

export default function ClientsSheetDrawer({ visitor }: ClientsSheetDrawerProps) {
  const { drawerOpenId, currentVisitor } = useDashboardState()

  const isOpen = visitor ? drawerOpenId === visitor.id : drawerOpenId === 'new'

  return (
    <>
      <Button
        className="rounded-md"
        variant="outline"
        size="icon"
        onClick={() => handleDrawerOpen(visitor)}
      >
        {visitor ? <IconPencil className="w-5 h-5" /> : <IconPlus className="w-5 h-5" />}
      </Button>
      <Sheet open={isOpen} onOpenChange={() => handleDrawerClose()}>
        <SheetContent className="twAply">
          <SheetHeader>
            <SheetTitle>{visitor ? 'Edit Visitor' : 'Add New Visitor'}</SheetTitle>
            <SheetDescription>
              {visitor
                ? "Make changes to visitor's information here."
                : "Enter new visitor's information here."}
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <FloatingLabelInput
              id="first_name"
              name="first_name"
              label="First Name"
              value={currentVisitor?.first_name || ''}
              onChange={handleInputChange}
            />
            <FloatingLabelInput
              id="last_name"
              name="last_name"
              label="Last Name"
              value={currentVisitor?.last_name || ''}
              onChange={handleInputChange}
            />
            <FloatingLabelInput
              id="email"
              name="email"
              label="Email"
              value={currentVisitor?.email || ''}
              onChange={handleInputChange}
            />
            <FloatingLabelInput
              id="start_time"
              name="start_time"
              label="Start Time"
              type="datetime-local"
              value={new Date((currentVisitor?.start_time || 0) * 1000).toISOString().slice(0, 16)}
              onChange={(e) => handleDateTimeChange('start_time', e.target.value)}
            />
            <FloatingLabelInput
              id="end_time"
              name="end_time"
              label="End Time"
              type="datetime-local"
              value={new Date((currentVisitor?.end_time || 0) * 1000).toISOString().slice(0, 16)}
              onChange={(e) => handleDateTimeChange('end_time', e.target.value)}
            />
          </div>
          <SheetFooter>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
