'use client'
import React from 'react'
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandWhatsapp,
  IconBrandX,
  IconLink,
  IconShare,
} from '@tabler/icons-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

interface ShareTypes {
  className: string
  url: string
  iconStroke?: string
  iconClassName?: string
}

export default function ShareButton({ className, url, iconStroke, iconClassName }: ShareTypes) {
  const generateShareLink = (platform: string) => {
    switch (platform) {
      case 'whatsapp':
        return `https://wa.me/?text=${encodeURIComponent(url)}`
      case 'x':
        return `https://twitter.com/share?url=${encodeURIComponent(url)}` // Enlace de compartir en Twitter
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
      default:
        return url
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success('Enlace copiado al portapapeles')
      })
      .catch((err) => {
        console.error('Error al copiar el enlace: ', err)
        toast.error('Error al copiar el enlace')
      })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        <IconShare className={`w-5 h-5${iconClassName}`} stroke={iconStroke}></IconShare>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Compartir</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a
            href={generateShareLink('whatsapp')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-1"
          >
            <IconBrandWhatsapp className="h-5 w-5 stroke-1"></IconBrandWhatsapp>
            <span>WhatsApp</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href={generateShareLink('x')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-1"
          >
            <IconBrandX className="h-5 w-5 stroke-1"></IconBrandX>
            <span>X (Twitter)</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href={generateShareLink('facebook')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-1"
          >
            <IconBrandFacebook className="h-5 w-5 stroke-1"></IconBrandFacebook>
            <span>Facebook</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleCopyLink}
          className="flex items-center gap-2 cursor-pointer px-2 py-1"
        >
          <IconLink className="h-5 w-5 stroke-1"></IconLink>
          <span>Copiar enlace</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
