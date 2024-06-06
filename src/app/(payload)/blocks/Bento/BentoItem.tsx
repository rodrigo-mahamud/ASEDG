'use client'
import { cn } from '@/app/(frontend)/utils/utils'
import { LinkButton } from './linkButton'
import React, { useRef, useState } from 'react'
import Link from 'next/link'
export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div className={cn('grid md:auto-rows-[24rem] grid-cols-1 md:grid-cols-3 gap-6 ', className)}>
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(1)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }
  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative row-span-1 group transition hover:-translate-y-2 z-10 hover:shadow-lg hover:shadow-[#0e3f7e15] transitionAlt rounded-lg ring-[1px] ring-ring hover:ring-0',
        className,
      )}
    >
      <div className="bg-white absolute group-hover:bg-white/90 gap-4 backdrop-blur-md p-6 flex flex-col h-full justify-between clip-path rounded-[13px]">
        {header}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="font-sans font-bold my-2">{title}</div>
            <div className="font-sans font-normal line-clamp-2">{description}</div>
          </div>
          <LinkButton
            href="/hola"
            variant="default"
            className="p-4 bg-secondaryAlt/5 hover:bg-secondaryAlt/10 text-secondaryAlt stroke-[1.5] hover:translate-y-[none] hover:shadow-none"
            arrow
          ></LinkButton>
        </div>
      </div>

      <div
        className="-z-10 h-full w-full absolute transition duration-300 rounded-lg"
        style={{
          opacity,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(99,91,255,0.8)0%, rgba(255,255,255,0) 100%)`,
        }}
      />
    </div>
  )
}
