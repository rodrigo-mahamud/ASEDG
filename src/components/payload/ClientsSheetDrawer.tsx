'use client'

import React, { useState } from 'react'
import { Button } from '@/components/lib/button'
import { Input } from '@/components/lib/input'
import { Label } from '@/components/lib/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/lib/sheet'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/lib/drawer'
import { IconPencil } from '@tabler/icons-react'
import { FloatingLabelInput } from '../lib/floatinglabel'

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addListener(listener)
    return () => media.removeListener(listener)
  }, [matches, query])

  return matches
}

export default function ClientsSheetDrawer({
  defaultUserName = 'userName',
}: {
  defaultUserName?: string
}) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [goal, setGoal] = useState(350)
  const [isOpen, setIsOpen] = useState(false)
  const [userName, setUserName] = useState(defaultUserName)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  const content = (
    <>
      <div className="flex flex-col gap-4 w-full py-6">
        <div className="flex gap-4 w-full">
          <FloatingLabelInput
            id="name"
            label="Nombre"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full"
          />
          <FloatingLabelInput
            id="name"
            label="Nombre"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
    </>
  )

  return (
    <>
      <Button className="rounded-md" variant="outline" size="icon" onClick={handleOpen}>
        <IconPencil className="w-5 h-5"></IconPencil>
      </Button>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Edit Profile: {userName}</DrawerTitle>
                <DrawerDescription>Make changes to your profile here.</DrawerDescription>
              </DrawerHeader>
              {content}
              <DrawerFooter>
                <Button onClick={handleClose}>Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline" onClick={handleClose}>
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent className="border-border" side="right">
            <SheetHeader>
              <SheetTitle>Editar usuario: {userName}</SheetTitle>
              <SheetDescription>Make changes to your profile here.</SheetDescription>
            </SheetHeader>
            {content}
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" onClick={handleClose}>
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}
