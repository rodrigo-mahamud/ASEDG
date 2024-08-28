import React from 'react'
import * as TablerIcons from '@tabler/icons-react'

interface IconDisplayProps {
  iconName: string
  size?: number
  stroke?: number
  className?: string
}

export const IconDisplay: React.FC<IconDisplayProps> = ({
  iconName,
  size = 24,
  className,
  stroke = 1.5,
}) => {
  const IconComponent = (TablerIcons as any)[iconName]

  if (!IconComponent) {
    console.warn(`Icon ${iconName} not found`)
    return null
  }

  return <IconComponent size={size} stroke={stroke} className={className} />
}
