'use client'
import React, { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { IconCheck, IconX } from '@tabler/icons-react'
import { Button } from '@/components/lib/button'
import stripeState from '@/utils/stripe/stripeState'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const StripeSuccess = () => {
  const handleClick = () => {
    const duration = 3.5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        zIndex: 999,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        zIndex: 999,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)
  }
  useEffect(() => {
    handleClick()
  }, [])
  const { setFormState } = stripeState()

  const pathname = usePathname()
  const router = useRouter()
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setFormState('closed')
    // Eliminar todos los parámetros de la URL
    router.replace(pathname, { scroll: false })
  }
  return (
    <div className="relative w-full p-6">
      <div className=" flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="inline-flex p-3 w-fit items-center justify-center rounded-full bg-green-100">
            <IconCheck className="h-10 w-10 text-green-500" />
          </div>

          <h3 className="font-bold text-3xl">¡Pago exsitoso!</h3>
          <h4 className=" text-base text-pretty text-center text-muted-foreground">
            Thank you for your payment. Your transaction was completed successfully.
          </h4>
        </div>

        <div className="rounded-md border border-border p-4 w-full flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Nombre y apellidos</p>
            <p className="text-sm text-muted-foreground">Rod</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">dasd</p>
            <p className="text-sm text-muted-foreground">$99.99</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Cantidad</p>
            <p className="text-sm text-muted-foreground">$99.99</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Cantidad</p>
            <p className="text-sm text-muted-foreground">$99.99</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Metodo de pago</p>
            <p className="text-sm text-muted-foreground">Visa **** 1234</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">Transaction ID</p>
            <p className="text-sm text-muted-foreground">123456789</p>
          </div>
        </div>
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

export default StripeSuccess
