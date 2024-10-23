import React from 'react'
import { Button } from './lib/button'
import {
  IconArrowRight,
  IconCreditCard,
  IconCreditCardPay,
  IconLoader2,
  IconRefresh,
} from '@tabler/icons-react'
import useFormStore from '@/utils/useBookingState'

interface BookingButtonProps {
  onDataSubmit: () => void
  onPaymentSubmit: () => void
  clientSecret: string | null
}

export function BookingButton({ onDataSubmit, onPaymentSubmit, clientSecret }: BookingButtonProps) {
  const { formState, isLoading } = useFormStore()

  const handleClick = () => {
    switch (formState) {
      case 'data':
        onDataSubmit()
        break
      case 'payment':
        onPaymentSubmit()
        break
      case 'success':
        window.location.reload()
        break
    }
  }

  const getButtonProps = () => {
    const baseProps = {
      type: 'button' as 'button',
      className: 'w-full rounded-md py-3 h-auto bg-primary text-white',
      variant: 'expandIcon' as const,
      iconClass: 'w-5 h-5',
      iconPlacement: 'right' as const,
      onClick: handleClick,
    }

    switch (formState) {
      case 'empty':
        return {
          ...baseProps,
          disabled: true,
          children: 'Continuar con el pago',
          Icon: IconArrowRight,
        }
      case 'data':
        return {
          ...baseProps,
          children: 'Continuar con el pago',
          Icon: IconArrowRight,
        }
      case 'payment':
        return {
          ...baseProps,
          form: 'stripe-form',
          disabled: isLoading || !clientSecret,
          children: isLoading ? 'Procesando...' : 'Pagar',
          Icon: isLoading ? IconLoader2 : IconCreditCardPay,
        }
      case 'success':
        return {
          ...baseProps,
          children: 'Reservar de nuevo',
          Icon: IconRefresh,
        }
      default:
        return baseProps
    }
  }

  return <Button {...getButtonProps()} />
}
