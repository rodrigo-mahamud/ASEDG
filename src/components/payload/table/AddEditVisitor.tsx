'use client'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useDashboardStore } from '@/utils/dashboard/dashboardStore'
import AddEditForm from './AddEditForm'

export default function AddEditVisitor() {
  const { isOpen, clientToEdit, setIsOpen } = useDashboardStore()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (!isDesktop) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{clientToEdit ? 'Editar Usuario' : 'Añadir Usuario'}</DrawerTitle>
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
            {clientToEdit ? 'Editar Usuario' : 'Añadir Usuario'}
          </SheetTitle>
          <SheetDescription className="text-base">
            Haz cambios en el perfil del Usuario aquí. Haz clic en guardar cuando hayas terminado.
          </SheetDescription>
        </SheetHeader>
        <AddEditForm></AddEditForm>
      </SheetContent>
    </Sheet>
  )
}
