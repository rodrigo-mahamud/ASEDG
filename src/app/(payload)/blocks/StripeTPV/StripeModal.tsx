'use client'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import StripeForm from './StripeForm'
import { Elements } from '@stripe/react-stripe-js'
import stripeState from '../../../../utils/stripe/stripeState'
import { loadStripe } from '@stripe/stripe-js/pure'
import convertToSubcurrency from '@/utils/convertToSubcurrency'
import StripeSuccess from './StripeSuccess'
import { usePathname, useSearchParams } from 'next/navigation'
import StripeError from './StripeError'
import { useRouter } from 'next/navigation'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

export default function StripeModal({ stripeInfo, blockId, cardTitle }: any) {
  const [isMobile, setIsMobile] = useState(false)
  const params = useSearchParams()
  const status = params.get('paymentStatus')
  const pathname = usePathname()
  const router = useRouter()
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
        loader: 'always',
        mode: 'payment',
        amount: convertToSubcurrency(stripeInfo.price),

        appearance: {
          labels: 'floating',
          theme: 'flat',
          variables: {
            spacingUnit: '2px',
            fontFamily: 'Ideal Sans, system-ui, sans-serif',
            fontLineHeight: '1.5',
            borderRadius: '6px',
            colorBackground: '#ffffff00',
            accessibleColorOnColorPrimary: '#262626',
            colorTextPlaceholder: '#0a2642bf',
            gridRowSpacing: '1rem',
            gridColumnSpacing: '1rem',
            fontSizeBase: '1.05rem',
          },
          rules: {
            '.Input': {
              border: '1px solid #0e3f7e1a',
            },
            '.Label--resting': {
              fontSize: '.875rem',
              color: '#0a2642bf',
            },
          },
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

            <StripeForm stripeInfo={stripeInfo} blockId={blockId} cardTitle={cardTitle} />

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog
          open={formState === 'open'}
          onOpenChange={() => {
            setFormState('closed'), router.replace(pathname, { scroll: false })
          }}
        >
          <DialogContent
            onInteractOutside={(e) => {
              e.preventDefault()
              setFormState('closed')
              router.replace(pathname, { scroll: false })
            }}
            className="p-0 overflow-hidden gap-0"
          >
            {status === 'success' ? (
              <StripeSuccess stripeInfo={stripeInfo} />
            ) : status === 'error' ? (
              <StripeError stripeInfo={stripeInfo} />
            ) : (
              <>
                <StripeForm stripeInfo={stripeInfo} blockId={blockId} cardTitle={cardTitle} />
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </Elements>
  )
}
