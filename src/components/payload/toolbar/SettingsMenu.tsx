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
  IconAdjustmentsHorizontal,
  IconDoor,
  IconDoorEnter,
  IconDoorOff,
  IconDots,
  IconFileText,
  IconLock,
  IconLockOpen2,
  IconSettings2,
  IconTimeDuration15,
  IconTimeDuration30,
  IconTimeDuration5,
  IconTimeDuration60,
} from '@tabler/icons-react'
import { useDocumentDrawer, toast } from '@payloadcms/ui'

import { handleDoor } from '@/utils/dashboard/actions'
import { DoorOperation } from '@/utils/dashboard/types'
import { useDashboardStore } from '@/utils/dashboard/dashboardStore'

export default function SettingsMenu() {
  const [DocumentDrawer, DocumentDrawerToggler, { openDrawer }] = useDocumentDrawer({
    id: '669147e907d44f5df704e9c1',
    collectionSlug: 'facilities',
  })
  const { setDialogOpen } = useDashboardStore()

  const openCloseDoor = async (type: DoorOperation, time?: number) => {
    const result = await handleDoor(type, time)
    if (result.success) {
      toast.success(result.actionMessage)
    } else {
      toast.error(result.message)
    }
  }

  return (
    <>
      <DocumentDrawer></DocumentDrawer>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="h-full">
          <Button variant="outline" className="rounded-md border-border text-base py-3">
            <IconDots size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="p-1 w-56 border border-border rounded-md shadow-xl shadow-black useTw text-base"
          align="end"
        >
          <DropdownMenuLabel className="py-1.5 px-2 font-semibold text-lg">
            Opciones
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="text-base outline-none focus-within:outline-none hover:outline-none focus:outline-none">
              <IconDoor size={16} className="mr-2" />
              <span>Abrir Puerta</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="p-1 w-56 border border-border rounded-md shadow-xl shadow-black useTw text-base">
                <DropdownMenuItem
                  className="text-base flex items-center outline-none focus-within:outline-none hover:outline-none focus:outline-none"
                  onClick={() => openCloseDoor('open')}
                >
                  <IconDoorEnter size={16} className="mr-2" />
                  <span>Abrir puerta</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => openCloseDoor('open', 5)}
                  className="text-base flex items-center outline-none focus-within:outline-none hover:outline-none focus:outline-none"
                >
                  <IconTimeDuration5 size={18} className="mr-2" />
                  <span>Abrir 5 min</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => openCloseDoor('open', 15)}
                  className="text-base flex items-center outline-none focus-within:outline-none hover:outline-none focus:outline-none"
                >
                  <IconTimeDuration15 size={18} className="mr-2" />
                  <span>Abrir 15 min</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => openCloseDoor('open', 30)}
                  className="text-base flex items-center outline-none focus-within:outline-none hover:outline-none focus:outline-none"
                >
                  <IconTimeDuration30 size={18} className="mr-2" />
                  <span>Abrir 30 min</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => openCloseDoor('open', 60)}
                  className="text-base flex items-center outline-none focus-within:outline-none hover:outline-none focus:outline-none"
                >
                  <IconTimeDuration60 size={18} className="mr-2" />
                  <span>Abrir 60 min</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            onClick={() => setDialogOpen(true, 'closeConfirmation')}
            className="capitalize flex items-center text-base outline-none focus-within:outline-none hover:outline-none focus:outline-none"
          >
            <IconLock size={16} className="mr-2" />
            <span>Cerrar Instalación</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDialogOpen(true, 'logs')}
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
