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
        <SheetContent className="twAply flex flex-col justify-between p-0 border-border">
          <div className="flex flex-col">
            <SheetHeader className="p-6">
              <SheetTitle>{visitor ? 'Edit Visitor' : 'Add New Visitor'}</SheetTitle>
              <SheetDescription>
                {visitor
                  ? "Make changes to visitor's information here."
                  : "Enter new visitor's information here."}
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 px-6">
              <FloatingLabelInput
                className="p-4 text-base h-auto focus-visible:border-white"
                id="first_name"
                name="first_name"
                label="First Name"
                value={currentVisitor?.first_name || ''}
                onChange={handleInputChange}
              />
              <FloatingLabelInput
                className="p-4 text-base h-auto focus-visible:border-white"
                id="last_name"
                name="last_name"
                label="Last Name"
                value={currentVisitor?.last_name || ''}
                onChange={handleInputChange}
              />
              <FloatingLabelInput
                className="p-4 text-base h-auto focus-visible:border-white"
                id="email"
                name="email"
                label="Email"
                value={currentVisitor?.email || ''}
                onChange={handleInputChange}
              />
              <FloatingLabelInput
                className="p-4 text-base h-auto focus-visible:border-white"
                id="start_time"
                name="start_time"
                label="Start Time"
                type="datetime-local"
                value={new Date((currentVisitor?.start_time || 0) * 1000)
                  .toISOString()
                  .slice(0, 16)}
                onChange={(e) => handleDateTimeChange('start_time', e.target.value)}
              />
              <FloatingLabelInput
                className="p-4 text-base h-auto focus-visible:border-white"
                id="end_time"
                name="end_time"
                label="End Time"
                type="datetime-local"
                value={new Date((currentVisitor?.end_time || 0) * 1000).toISOString().slice(0, 16)}
                onChange={(e) => handleDateTimeChange('end_time', e.target.value)}
              />
            </div>
          </div>
          <SheetFooter className="p-5 w-full  bg-white/5">
            <Button type="submit" variant={'default'} className="w-full" onClick={handleSubmit}>
              Save changes
            </Button>
            <Button type="submit" variant={'destructive'} onClick={handleSubmit}>
              Delete
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
