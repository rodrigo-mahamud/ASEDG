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

import React from 'react'
import { Button } from '../lib/button'
import BookingSticky from '../BookingSticky'

export default function FacilitiesBarMobile({ data }: any) {
  return (
    <Drawer>
      <DrawerTrigger className="fixed bottom-0 w-full py-4 bg-white z-50 md:hidden">
        Reservar
      </DrawerTrigger>
      <DrawerContent className="pb-4">
        <DrawerHeader className="p-4 flex flex-col justify-start">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <BookingSticky
          className="md:w-[35%] sticky top-28 h-fit"
          data={data.bookingOptions}
          termsFile={data.termsFile}
        ></BookingSticky>
      </DrawerContent>
    </Drawer>
  )
}
