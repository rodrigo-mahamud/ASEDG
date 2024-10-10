import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

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
  const IconComponent = dynamic<any>(
    async () => {
      const mod = (await import('@tabler/icons-react')) as any
      return mod[iconName]
    },
    {
      ssr: false, // Deshabilitar renderizado en el servidor para las importaciones dinámicas
    },
  )

  return (
    <Suspense fallback={<span>Loading...</span>}>
      <IconComponent className={className} stroke={stroke} />
    </Suspense>
  )
}

export default DynamicIcon
