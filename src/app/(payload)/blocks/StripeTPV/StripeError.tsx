'use client'
import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { IconCheck, IconExclamationCircle, IconX } from '@tabler/icons-react'
import { Button } from '@/components/lib/button'
import stripeState from '@/utils/stripe/stripeState'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function StripeError({ stripeInfo }: any) {
  const { formData } = stripeState()
  console.log(formData)

  return (
    <div className="relative w-full p-6">
      <div className=" flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="inline-flex p-3 w-fit items-center justify-center rounded-full bg-red-100">
            <IconExclamationCircle className="h-10 w-10 text-red-500" />
          </div>

          <h3 className="font-bold text-3xl">Ha ocurrido un error</h3>
          <h4 className=" text-base text-pretty text-center text-muted-foreground">
            {stripeInfo.errorMsg}
          </h4>
        </div>
        <Button
          className="w-full rounded-md py-3 h-auto text-white bg-secondaryAlt"
          type="submit"
          onClick={() => window.location.reload()}
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
