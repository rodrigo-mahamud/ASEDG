'use client'
import React, { Suspense, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { cn } from '@/utils/utils'

interface DynamicIconProps {
  iconName: string
  className?: string
  stroke?: number
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
  iconName = 'IconMoodSearch',
  className,
  stroke,
}) => {
  const IconComponent = useMemo(() => {
    return dynamic<any>(
      async () => {
        const mod = (await import('@tabler/icons-react')) as any
        return mod[iconName]
      },
      {
        ssr: false,
        loading: () => (
          <span className={cn(`animate-pulse bg-neutral-300/50 rounded-full ${className}`)}></span>
        ),
      },
    )
  }, [iconName, className])

  return <IconComponent className={className} stroke={stroke} />
}

export default DynamicIcon
