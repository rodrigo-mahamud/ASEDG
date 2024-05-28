'use client'
import * as React from 'react'
import { cn } from '@/utils/utils'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/lib/navigation-menu'
import Link from 'next/link'
// menuItems.js
export const menuItems = [
  {
    item: 'Ayuntamiento',
    child: {
      1: {
        title: 'Trámites',
        text: 'Información sobre los trámites municipales.',
        highlighted: true,
        link: '/ayuntamiento/tramites',
      },
      2: {
        title: 'Empleo público',
        text: 'Información sobre empleo público.',
        highlighted: false,
        link: '/ayuntamiento/empleo-publico',
      },
      3: {
        title: 'Corporación Municipal',
        text: 'Información sobre la corporación municipal.',
        highlighted: false,
        link: '/ayuntamiento/corporacion-municipal',
      },
      4: {
        title: 'Ayudas y subenciones',
        text: 'Información sobre ayudas y subvenciones.',
        highlighted: false,
        link: '/ayuntamiento/ayudas-subenciones',
      },
      5: {
        title: 'Contacto',
        text: 'Información de contacto.',
        highlighted: false,
        link: '/ayuntamiento/contacto',
      },
    },
  },
  {
    item: 'Servicios',
    child: {
      1: {
        title: 'Instalaciones Deportivas',
        text: 'Reserva de instalaciones deportivas.',
        highlighted: true,
        link: '/servicios/reserva-instalaciones-deport',
      },
      2: {
        title: 'Transportes',
        text: 'Información sobre transportes.',
        highlighted: false,
        link: '/servicios/transportes',
      },
      3: {
        title: 'Gestión de Residuos',
        text: 'Información sobre la gestión de residuos.',
        highlighted: false,
        link: '/servicios/gestion-de-residuos',
      },
      4: {
        title: 'Cementerio y Velatorio Municipal',
        text: 'Información sobre el cementerio y velatorio municipal.',
        highlighted: false,
        link: '/servicios/cementerio-y-velatorio-municipal',
      },
      5: {
        title: 'CYL Digital',
        text: 'Información sobre CYL Digital.',
        highlighted: false,
        link: '/servicios/cyl-digital',
      },
    },
  },
  {
    item: 'Turismo',
    child: {
      1: {
        title: 'Comarca y Pedanías',
        text: 'Información sobre la comarca y pedanías.',
        highlighted: true,
        link: '/ayto-seg/turismo/comarca-y-pedanias',
      },
      2: {
        title: 'Historia San Esteban',
        text: 'Información sobre la historia de San Esteban.',
        highlighted: false,
        link: '/ayto-seg/turismo/historia-san-esteban',
      },
      3: {
        title: 'Rutas',
        text: 'Información sobre rutas turísticas.',
        highlighted: false,
        link: '/ayto-seg/turismo/rutas',
      },
    },
  },
  {
    item: 'Actualidad',
    child: {
      1: {
        title: 'Exposiciones',
        text: 'Información sobre exposiciones actuales.',
        highlighted: true,
        link: '/actualidad/exposiciones',
      },
      2: {
        title: 'Noticias',
        text: 'Últimas noticias.',
        highlighted: false,
        link: '/actualidad/noticias',
      },
      3: {
        title: 'Eventos',
        text: 'Información sobre eventos.',
        highlighted: false,
        link: '/actualidad/eventos',
      },
    },
  },
  {
    item: 'Comercio',
    child: {
      1: {
        title: 'Vinicultura',
        text: 'Información sobre la vinicultura.',
        highlighted: true,
        link: '/comercio-e-industria/vinicultura',
      },
      2: {
        title: 'Empresas Locales',
        text: 'Información sobre empresas locales.',
        highlighted: false,
        link: '/comercio-e-industria/empresas-locales',
      },
      3: {
        title: 'Proceso',
        text: 'Información sobre el proceso industrial.',
        highlighted: false,
        link: '/comercio-e-industria/proceso',
      },
    },
  },
  {
    item: 'Galería',
    child: {
      1: {
        title: 'Galería',
        text: 'Galería de imágenes.',
        highlighted: true,
        link: '/galeria',
      },
    },
  },
]

export function NavBar() {
  const [isFixed, setIsFixed] = useState(false)
  const [yPosition, setYPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 200) {
        // Ajusta este valor según tus necesidades
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }
      setYPosition(currentScrollY)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const variants = {
    down: {
      y: [-100, 0],
      border: 'solid 1px #00000011',
      backdropFilter: 'blur(16px)',
      background: '#ffffffbf',
      boxShadow: '0 10px 20px 0 rgba(35,56,79,0.05)',
    },
    up: {
      y: 0,
      border: ' 0px',
      backdropFilter: 'blur(0px)',
      background: '#ffffff00',
      boxShadow: '0 10px 25px 0 rgba(0,0,0,0)',
    },
  }

  return (
    <NavigationMenu className="fixed w-full h-[84px] flex z-50">
      <motion.div
        className="w-full h-full flex bg-transparent"
        animate={isFixed ? 'down' : 'up'}
        variants={variants}
        transition={{
          ease: [0.14, 1, 0.34, 1],
          duration: 1,
        }}
      >
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: -100, opacity: 0 }}
          transition={{
            ease: [0.14, 1, 0.34, 1],
            duration: 1,
          }}
          className="container flex items-center justify-between mx-auto "
        >
          <Link href="/">
            <Image src="/logo.png" alt="Logo San Esteban de Gormaz" width={125} height={125} />
          </Link>
          <NavigationMenuList className="flex justify-center items-center w-full">
            {menuItems.map((menuItem, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger>{menuItem.item}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[675px] lg:grid-cols-[.75fr_1fr] ">
                    {Object.entries(menuItem.child).map(([key, childItem]) =>
                      childItem.highlighted ? (
                        <li key={key} className="row-span-4">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href={childItem.link}
                            >
                              <div className="mb-2 mt-4 text-lg font-medium">{childItem.title}</div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                {childItem.text}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ) : (
                        <ListItem key={key} href={childItem.link} title={childItem.title}>
                          {childItem.text}
                        </ListItem>
                      ),
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            <NavigationMenuIndicator />
            <NavigationMenuViewport />
          </NavigationMenuList>
        </motion.div>
      </motion.div>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = 'ListItem'
