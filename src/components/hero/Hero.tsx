import React from 'react'
import HIndex from './HIndex'
import HGlow from './HGlow'

export default function Hero({ data }: any) {
  return (
    <>
      {data.header && data.header.style === 'index' && <HIndex data={data.header} />}
      {data.header && data.header.style === 'glow' && <HGlow data={data.header} />}
      {data.header && data.header.style === 'grid' && <HIndex data={data.header} />}
    </>
  )
}
