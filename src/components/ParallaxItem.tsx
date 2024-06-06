'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import React from 'react'
import { MotionDiv } from './MotionDiv'

interface ParallaxItemProps {
  children: React.ReactNode
  speed: number
  className?: string
}

const ParallaxItem: React.FC<ParallaxItemProps> = ({ children, speed, className }) => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [60, -60 * speed])

  return (
    <MotionDiv className={className} style={{ y }}>
      {children}
    </MotionDiv>
  )
}

export default ParallaxItem
