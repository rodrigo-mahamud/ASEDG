'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/lib/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/lib/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/lib/drawer'
import StripeForm from './StripeForm'
import { Elements } from '@stripe/react-stripe-js'
import stripeState from '../../../../utils/stripe/stripeState'
import { loadStripe } from '@stripe/stripe-js'
import convertToSubcurrency from '@/utils/convertToSubcurrency'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

export default function StripeModal({ isOpen, setIsOpen, stripeInfo }: any) {
  const [isMobile, setIsMobile] = useState(false)
  const checkIsMobile = () => {
    setIsMobile(window.innerWidth < 768)
  }
  useEffect(() => {
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
  }, [])
  const { formState, setFormState } = stripeState()
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: 'payment',
        amount: convertToSubcurrency(stripeInfo.price),
        appearance: {
          theme: 'flat',
        },
        currency: 'eur',
      }}
    >
      {isMobile ? (
        <Drawer open={formState === 'open'} onClose={() => setFormState('closed')}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Formulario de Pago</DrawerTitle>
              <DrawerDescription>
                Por favor, complete los detalles de pago a continuación.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <StripeForm stripeInfo={stripeInfo} />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cerrar</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={formState === 'open'} onOpenChange={() => setFormState('closed')}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Formulario de Pago</DialogTitle>
              <DialogDescription>
                Por favor, complete los detalles de pago a continuación.
              </DialogDescription>
            </DialogHeader>
            <StripeForm stripeInfo={stripeInfo} />
          </DialogContent>
        </Dialog>
      )}
    </Elements>
  )
}
