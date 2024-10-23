import * as React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import DynamicIcon from '@/components/DynamicIcon'
import { LinkItem } from '.'

type CardButtonsProps = {
  links: LinkItem[]
  generateGoogleMapsLink: (location: string) => string
}

const CardButtons: React.FC<CardButtonsProps> = ({ links, generateGoogleMapsLink }) => {
  return (
    <div className="flex items-center justify-between gap-2 mt-6 h-10">
      {links.map((linkItem, linkIndex, array) => {
        switch (linkItem.linkType) {
          case 'internal':
            return (
              <Button
                key={linkIndex}
                variant="ringHover"
                className="flex w-full gap-1 bg-secondaryAlt hover:ring-secondaryAlt rounded-md h-full "
              >
                <Link href={linkItem.internal || '#'}>{linkItem.linkText}</Link>
              </Button>
            )
          case 'external':
            return (
              <Button
                key={linkIndex}
                variant="ringHover"
                className="flex w-full gap-1 bg-secondaryAlt hover:ring-secondaryAlt rounded-md h-full"
              >
                <Link href={linkItem.external || '#'} rel="noopener noreferrer" target="_blank">
                  {linkItem.linkText}
                </Link>
              </Button>
            )
          case 'location':
            return (
              <Button
                key={linkIndex}
                variant="ringHover"
                className="w-full flex gap-1 bg-secondary hover:ring-secondaryAlt rounded-md h-[inherit] text-foreground"
              >
                <Link
                  href={generateGoogleMapsLink(linkItem.location || '')}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <DynamicIcon iconName={linkItem.linkIcon || ''} />
                </Link>
              </Button>
            )
          case 'tel':
            return (
              <Button
                key={linkIndex}
                variant="ringHover"
                className="w-full flex gap-1 bg-secondary hover:ring-secondaryAlt rounded-md h-[inherit] text-foreground"
              >
                <Link href={`tel:${linkItem.tel || ''}`}>
                  <DynamicIcon iconName={linkItem.linkIcon || ''} />
                </Link>
              </Button>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

export default CardButtons
