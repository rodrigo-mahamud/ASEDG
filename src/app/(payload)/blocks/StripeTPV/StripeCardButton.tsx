'use client'
import DynamicIcon from '@/components/DynamicIcon'
import { Button } from '@/components/lib/button'
import React from 'react'
import stripeState from '../../../../utils/stripe/stripeState'

export default function StripeCardButton({ isExpired, icon, buttonText }: any) {
  const { setFormState } = stripeState()
  return (
    <>
      <Button
        variant={'shine'}
        className="w-full gap-1 rounded-md py-3 h-auto text-white hover:bg-primary/90 hover:animate-none animate-shine bg-gradient-to-r from-primary via-primary/85 to-primary bg-[length:200%_100%]"
        iconClass="w-5 h-5"
        disabled={isExpired}
        onClick={() => setFormState('open')}
      >
        <DynamicIcon iconName={icon} className="w-4 h-4" stroke={2} />
        {buttonText}
      </Button>
    </>
  )
}
