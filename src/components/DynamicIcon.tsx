import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

interface DynamicIconProps {
  iconName: string
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName }) => {
  const IconComponent = dynamic(
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
      <IconComponent />
    </Suspense>
  )
}

export default DynamicIcon
