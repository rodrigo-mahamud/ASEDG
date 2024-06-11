'use client'
import * as React from 'react'
import { cn } from '@/utils/utils'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
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
import { MotionDiv } from './MotionDiv'
interface ChildTypes {
  id: string
  linkType: string
  title: string
  text: string
  url: string | null
  highlighted: boolean | null
  reference: {
    value: {
      id: number
      header: {
        style: string
        titleIndex: string | null
        pretitleIndex: string | null
        description: string | null
        newsSelection: number[]
        title: string
        pretitle: string | null
      }
      slug: string
    }
  }
}
interface NavMenuItem {
  id: string
  item: {
    label: string
    child: ChildTypes[]
  }
}

interface NavBarTypes {
  data: NavMenuItem[]
}

export default function NavBar({ data }: NavBarTypes) {
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
      <MotionDiv
        className="w-full h-full flex bg-transparent"
        animate={isFixed ? 'down' : 'up'}
        variants={variants}
        transition={{
          ease: [0.14, 1, 0.34, 1],
          duration: 1,
        }}
      >
        <MotionDiv
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
            {data.map((menuItem, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger>{menuItem.item.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[675px] lg:grid-cols-[.75fr_1fr] ">
                    {menuItem.item.child &&
                      menuItem.item.child.map((childItem, childIndex) =>
                        childItem.highlighted ? (
                          <li key={childIndex} className="row-span-5">
                            <NavigationMenuLink asChild>
                              <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href={childItem.url || `/${childItem.reference.value.slug}`}
                              >
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  {childItem.title}
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  {childItem.text}
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ) : (
                          <ListItem
                            key={childIndex}
                            href={childItem.url || `/${childItem.reference.value.slug}`}
                            title={childItem.title}
                          >
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
        </MotionDiv>
      </MotionDiv>
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
