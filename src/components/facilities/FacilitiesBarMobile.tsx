import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import React from 'react'
import { Button } from '../ui/button'
import BookingSticky from '../BookingSticky'

export default function FacilitiesBarMobile({ data }: any) {
  return (
    <Drawer>
      <DrawerTrigger className="fixed bottom-0 w-full py-4 bg-white z-50 md:hidden">
        Reservar
      </DrawerTrigger>
      <DrawerContent className="pb-4">
        <DrawerHeader className="px-4 pb-0 flex flex-col justify-start items-start text-start">
          <DrawerTitle>Selecciona periodo e introduce tu informacion</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <BookingSticky
          className="md:w-[35%] sticky top-28 h-fit overflow-scroll"
          data={data.bookingOptions}
          termsFile={data.termsFile}
        ></BookingSticky>
      </DrawerContent>
    </Drawer>
  )
}
