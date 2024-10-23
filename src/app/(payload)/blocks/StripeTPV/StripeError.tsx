'use client'
import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { IconCheck, IconExclamationCircle, IconX } from '@tabler/icons-react'
import { Button } from '@/components/lib/button'
import stripeState from '@/utils/stripe/stripeState'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/lib/dialog'

export default function StripeError({ stripeInfo }: any) {
  const pathname = usePathname()
  const router = useRouter()
  const { setFormState } = stripeState()
  const handleClose = () => {
    router.replace(pathname, { scroll: false })
    setFormState('closed')
  }
  const { formData } = stripeState()

  return (
    <div className="relative w-full p-6">
      <div className=" flex flex-col gap-6 items-center">
        <DialogHeader className="flex flex-col gap-3 justify-center items-center">
          <div className="inline-flex p-3 w-fit items-center justify-center rounded-full bg-red-100">
            <IconExclamationCircle className="h-10 w-10 text-red-500" />
          </div>

          <DialogTitle className="font-bold text-3xl">Formulario de Pago</DialogTitle>
          <DialogDescription className=" text-base text-pretty text-center text-muted-foreground">
            {stripeInfo.errorMsg}
          </DialogDescription>
        </DialogHeader>
        <Button
          className="w-full rounded-md py-3 h-auto text-white bg-secondaryAlt"
          type="submit"
          onClick={handleClose}
          variant={'expandIcon'}
          Icon={IconX}
          iconPlacement="right"
          iconClass="w-5 h-5"
        >
          Cerrar
        </Button>
      </div>
    </div>
  )
}
