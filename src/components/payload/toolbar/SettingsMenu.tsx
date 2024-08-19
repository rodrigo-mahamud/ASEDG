'use client'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/lib/dropdown-menu'
import { Button } from '@/components/lib/button'
import {
  IconClipboard,
  IconDoor,
  IconDoorEnter,
  IconDoorOff,
  IconDots,
  IconEdit,
  IconFileText,
  IconSettings2,
  IconUsersPlus,
} from '@tabler/icons-react'
import { useDocumentDrawer, toast } from '@payloadcms/ui'
import { openDoor } from '@/utils/dashboard/data'
export default function SettingsMenu() {
  async function handleOpenDoor(minutes?: number) {
    const result = await openDoor(minutes)
    if (result.success) {
      toast.success('Puerta abierta')
    } else {
      toast.error('NO aBRIda')
    }
  }
  const [DocumentDrawer, DocumentDrawerToggler, { openDrawer }] = useDocumentDrawer({
    id: '669147e907d44f5df704e9c1',
    collectionSlug: 'facilities',
  })
  return (
    <>
      <DocumentDrawer></DocumentDrawer>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="m-2">
          <Button variant="outline" className="rounded-md h-full border-border text-base py-3">
            <IconDots size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="p-1 w-56 border border-border rounded-md shadow-xl shadow-black useTw text-base"
          align="end"
        >
          <DropdownMenuLabel className="py-1.5 px-2 font-semibold text-lg">
            Ajustes
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="text-base">
              <IconDoor size={16} className="mr-2" />
              <span>Puerta</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="p-1 w-56 border border-border rounded-md shadow-xl shadow-black useTw text-base">
                <DropdownMenuItem className="text-base" onClick={() => handleOpenDoor()}>
                  <IconDoorEnter size={16} className="mr-2" />
                  <span>Abrir puerta</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-base">
                  <IconDoorOff size={16} className="mr-2" />
                  <span>Cerrar puerta</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            onClick={openDrawer}
            className="capitalize flex items-center text-base outline-none focus-within:outline-none hover:outline-none focus:outline-none"
          >
            <IconFileText className="mr-2" size={15}></IconFileText>
            Registros
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={openDrawer}
            className="capitalize flex items-center text-base outline-none focus-within:outline-none hover:outline-none focus:outline-none"
          >
            <IconSettings2 className="mr-2" size={15}></IconSettings2>
            Ajustes
          </DropdownMenuItem>

          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
