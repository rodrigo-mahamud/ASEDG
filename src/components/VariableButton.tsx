import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { cn } from '@/utils/utils'
import * as TablerIcons from '@tabler/icons-react'
import { ButtonData, ButtonConfig, ButtonStyle } from '@/types/types'

const getLinkHref = (data: ButtonData): string => {
  if (data.internal) return data.internal.slug
  if (data.external) return data.external.slug
  if (data.mail) return `mailto:${data.mail}`
  if (data.location) return `https://maps.google.com/?q=${encodeURIComponent(data.location)}`
  if (data.tel) return `tel:${data.tel}`
  return '#'
}

const getButtonConfig = (linkStyle: ButtonStyle): ButtonConfig => {
  switch (linkStyle) {
    case 'basic':
      return {
        variant: 'expandIcon',
        className: 'w-fit flex gap-1 bg-secondaryAlt hover:bg-secondaryAlt/90 rounded-md h-10',
      }
    case 'secondary':
      return {
        variant: 'outline',
        className: 'w-fit bg-secondary hover:bg-secondaryAlt/5 h-10 rounded-md',
      }
    case 'highlighted':
      return {
        variant: 'default',
        className: 'text-lg bg-primary hover:bg-primary/90 rounded-full h-12',
      }
    case 'withicon':
      return {
        variant: 'expandIcon',
        className: 'w-fit flex gap-1 bg-secondaryAlt hover:bg-secondaryAlt/90 rounded-md h-10',
      }
    case 'shine':
      return { variant: 'linkHover1', className: 'underline-button-class' }
    default:
      return {
        variant: 'shine',
        className: 'w-fit  rounded-md h-10',
      }
  }
}

const getIcon = (iconName: string) => {
  return (
    (TablerIcons[iconName as keyof typeof TablerIcons] as React.ComponentType<any>) || undefined
  )
}

export default function VariableButton({ data }: { data: ButtonData }) {
  const href = getLinkHref(data)
  const { variant, className } = getButtonConfig(data.linkStyle)

  let Icon
  if (data.linkStyle === 'basic') {
    Icon = TablerIcons.IconArrowRight
  } else if (data.linkStyle === 'withicon' && data.gIcon) {
    Icon = getIcon(data.gIcon.icon)
  }

  return (
    <Button
      asChild
      variant={variant}
      iconPlacement="right"
      iconClass="w-4 h-4"
      className={cn(className)}
      Icon={Icon}
    >
      <Link href={href}>{data.linkText}</Link>
    </Button>
  )
}
