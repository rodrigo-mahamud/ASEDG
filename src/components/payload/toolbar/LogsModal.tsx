'use client'
import * as React from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Button } from '@/components/lib/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/lib/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/lib/drawer'
import { useDashboardStore } from '@/utils/dashboard/dashboardStore'

export function LogsModal({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { isDialogOpen, setDialogOpen, dialogType, clientToEdit } = useDashboardStore()
  if (isDesktop) {
    return (
      <Dialog
        open={isDialogOpen && dialogType === 'logs'}
        onOpenChange={() => setDialogOpen(false, 'logs')}
      >
        <DialogContent className="max-w-4xl useTw border-border">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer
      open={isDialogOpen && dialogType === 'logs'}
      onOpenChange={() => setDialogOpen(false, 'logs')}
    >
      <DrawerContent>
        <DrawerHeader className="text-left useTw">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}