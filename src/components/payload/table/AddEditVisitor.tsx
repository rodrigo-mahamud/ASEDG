'use client'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/lib/sheet'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/lib/drawer'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useClientEditStore } from '@/utils/dashboard/dashboardStore'
import { getPeriods } from '@/utils/dashboard/data'

import AddEditForm from './AddEditForm'

export default function AddEditVisitor() {
  const { isOpen, clientToEdit, setIsOpen } = useClientEditStore()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (!isDesktop) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{clientToEdit ? 'Editar Cliente' : 'Añadir Cliente'}</DrawerTitle>
          </DrawerHeader>
          <AddEditForm></AddEditForm>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="useTw border-border sm:max-w-[28rem] p-0">
        <SheetHeader className="px-8 pt-8">
          <SheetTitle className="useTw text-2xl font-semibold">
            {clientToEdit ? 'Editar Cliente' : 'Añadir Cliente'}
          </SheetTitle>
          <SheetDescription>
            Haz cambios en el perfil del cliente aquí. Haz clic en guardar cuando hayas terminado.
          </SheetDescription>
        </SheetHeader>
        <AddEditForm></AddEditForm>
      </SheetContent>
    </Sheet>
  )
}

// Nota: Necesitarás crear un archivo separado llamado FormContent.tsx con el contenido del formulario
