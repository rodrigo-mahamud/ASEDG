'use client'
import { useEffect } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
  SheetClose,
} from '@/components/lib/sheet'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/lib/drawer'
import { Button } from '@/components/lib/button'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useClientEditStore } from '@/utils/dashboard/dashboardStore'
import { FloatingLabelInput } from '@/components/lib/floatinglabel'

export function AddEdit() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const {
    isOpen,
    clientToEdit,
    editedClient,
    setIsOpen,
    setEditedClient,
    updateEditedClient,
    saveEditedClient,
    resetStore,
  } = useClientEditStore()

  useEffect(() => {
    setEditedClient(clientToEdit)
  }, [clientToEdit, setEditedClient])

  const handleClose = () => {
    setIsOpen(false)
    resetStore()
  }

  const Content = (
    <>
      <div className="grid gap-4 py-4">
        <FloatingLabelInput
          id="first_name"
          value={editedClient?.first_name || ''}
          onChange={(e) => updateEditedClient('first_name', e.target.value)}
          label="Nombre"
        />
        <FloatingLabelInput
          id="last_name"
          value={editedClient?.last_name || ''}
          onChange={(e) => updateEditedClient('last_name', e.target.value)}
          label="Apellido"
        />
        <FloatingLabelInput
          id="email"
          value={editedClient?.email || ''}
          onChange={(e) => updateEditedClient('email', e.target.value)}
          label="Email"
        />
      </div>
    </>
  )

  if (isDesktop) {
    return (
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent className="useTw border-border sm:max-w-[32rem]">
          <SheetHeader>
            <SheetTitle>{clientToEdit ? 'Editar Cliente' : 'Añadir Cliente'}</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when youre done.
            </SheetDescription>
          </SheetHeader>
          {Content}
          <SheetFooter>
            <SheetClose asChild onClick={saveEditedClient}>
              <Button>Guardar cambios</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{clientToEdit ? 'Editar Cliente' : 'Añadir Cliente'}</DrawerTitle>
        </DrawerHeader>
        {Content}
        <DrawerFooter>
          <Button onClick={saveEditedClient}>Guardar cambios</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
