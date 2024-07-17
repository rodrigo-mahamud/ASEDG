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
import { IconDeviceFloppy, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react'
import { FloatingLabelInput } from '../lib/floatinglabel'
import useDashboardState from '@/utils/useDashboardState'
import {
  handleDrawerOpen,
  handleDrawerClose,
  handleInputChange,
  handleSubmit,
  handleDateRangeChange,
  handlePresetChange,
} from '@/utils/DashboardHandlers'
import { DatePickerWithRange } from '@/components/lib/datePicker'

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
        <SheetContent className="useTw flex flex-col justify-between p-0 border-border sm:max-w-[30rem] bg-card">
          <div className="flex flex-col">
            <SheetHeader className="px-6 py-12">
              <SheetTitle className="useTw text-2xl">
                {visitor ? 'Editar Usuario' : 'Añadir Usuario'}
              </SheetTitle>
              <SheetDescription className="text-base">
                {visitor
                  ? "Make changes to visitor's information here."
                  : "Enter new visitor's information here."}
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 px-6">
              <FloatingLabelInput
                className="p-4 text-base h-auto focus-visible:border-white bg-onTop"
                id="first_name"
                name="first_name"
                label="Nombre"
                value={currentVisitor?.first_name || ''}
                onChange={handleInputChange}
              />
              <FloatingLabelInput
                className="p-4 text-base h-auto focus-visible:border-white bg-onTop"
                id="last_name"
                name="last_name"
                label="Apellidos"
                value={currentVisitor?.last_name || ''}
                onChange={handleInputChange}
              />
              <FloatingLabelInput
                className="p-4 text-base h-auto focus-visible:border-white bg-onTop"
                id="email"
                name="email"
                label="Correo Electrónico"
                value={currentVisitor?.email || ''}
                onChange={handleInputChange}
              />
              <DatePickerWithRange
                className="p-4 text-base h-auto bg-onTop rounded-md w-full"
                value={{
                  from: new Date(currentVisitor?.start_time! * 1000),
                  to: new Date(currentVisitor?.end_time! * 1000),
                }}
                onChange={handleDateRangeChange}
                onPresetChange={handlePresetChange}
              />
            </div>
          </div>
          <SheetFooter className="p-6 border-border border-t bg-onTop flex gap-3">
            <Button
              type="submit"
              variant="default"
              className="w-3/4 py-4 text-lg rounded-md font-semibold items-center flex h-auto leading-none"
              onClick={handleSubmit}
            >
              <IconDeviceFloppy className="w-6 h-6 mr-1"></IconDeviceFloppy>
              Guardar cambios
            </Button>
            <Button
              type="submit"
              variant="destructive"
              className="w-1/4 py-4 rounded-md font-semibold items-center flex h-auto leading-none"
              onClick={handleSubmit}
            >
              <IconTrash className="w-6 h-6"></IconTrash>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
