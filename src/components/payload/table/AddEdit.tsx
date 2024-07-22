'use client'
import { useState, useEffect } from 'react'
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
import { Input } from '@/components/lib/input'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Visitor } from './Columns'
import { useClientEditStore } from '@/utils/dashboard/dashboardStore'
import { FloatingLabelInput } from '@/components/lib/floatinglabel'
export function AddEdit() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const clientEditStore = useClientEditStore()
  const [editedClient, setEditedClient] = useState<Visitor | null>(null)

  useEffect(() => {
    setEditedClient(clientEditStore.clientToEdit)
  }, [clientEditStore.clientToEdit])

  const handleClose = () => {
    clientEditStore.setIsOpen(false)
    clientEditStore.resetStore()
  }

  const handleSave = () => {
    if (editedClient) {
      console.log('Guardando cliente:', editedClient)
      handleClose()
    }
  }

  const Content = (
    <>
      <div className="grid gap-4 py-4">
        <FloatingLabelInput
          id="first_name"
          value={editedClient?.first_name || ''}
          onChange={(e) =>
            setEditedClient({ ...editedClient, first_name: e.target.value } as Visitor)
          }
          label="Nombre"
        />
        <FloatingLabelInput
          id="last_name"
          value={editedClient?.last_name || ''}
          onChange={(e) =>
            setEditedClient({ ...editedClient, last_name: e.target.value } as Visitor)
          }
          label="Apellido"
        />
        <FloatingLabelInput
          id="email"
          value={editedClient?.email || ''}
          onChange={(e) => setEditedClient({ ...editedClient, email: e.target.value } as Visitor)}
          label="Email"
        />
      </div>
    </>
  )

  if (isDesktop) {
    return (
      <Sheet open={clientEditStore.isOpen} onOpenChange={handleClose}>
        <SheetContent className="useTw border-border sm:max-w-[32rem]">
          <SheetHeader>
            <SheetTitle>
              {clientEditStore.clientToEdit ? 'Editar Cliente' : 'Añadir Cliente'}
            </SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when yore done.
            </SheetDescription>
          </SheetHeader>
          {Content}
          <SheetFooter>
            <SheetClose asChild onClick={handleSave}>
              <Button>Guardar cambios</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Drawer open={clientEditStore.isOpen} onOpenChange={handleClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {clientEditStore.clientToEdit ? 'Editar Cliente' : 'Añadir Cliente'}
          </DrawerTitle>
        </DrawerHeader>
        {Content}
      </DrawerContent>
    </Drawer>
  )
}
