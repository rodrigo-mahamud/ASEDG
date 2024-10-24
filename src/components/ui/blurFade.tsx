'use client'

import { useRef } from 'react'
import { AnimatePresence, motion, useInView, UseInViewOptions, Variants } from 'framer-motion'

type MarginType = UseInViewOptions['margin']

interface BlurFadeProps {
  children: React.ReactNode
  className?: string
  variant?: {
    hidden: { y: number }
    visible: { y: number }
  }
  duration?: number
  delay?: number
  yOffset?: number
  inView?: boolean
  inViewMargin?: MarginType
  blur?: string
}

export default function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 8,
  inView = false,
  inViewMargin = '-50px',
  blur = '6px',
}: BlurFadeProps) {
  const ref = useRef<any>(null)
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin })
  const isInView = !inView || inViewResult
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: 0, opacity: 1, filter: `blur(0px)` },
  }
  const combinedVariants = variant || defaultVariants
  return (
    <AnimatePresence>
      <motion.div
        {...({
          ref,
          initial: 'hidden',
          animate: isInView ? 'visible' : 'hidden',
          exit: 'hidden',
          variants: combinedVariants,
          transition: {
            delay: 0.04 + delay,
            duration,
            ease: 'easeOut',
          },
          className,
        } as const)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
