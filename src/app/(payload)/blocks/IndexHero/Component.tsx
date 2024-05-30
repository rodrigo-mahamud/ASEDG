import Image from 'next/image'
import React from 'react'
import { Type } from '.'
const IndexHero: React.FC<Type> = ({ title, subtitle, image, buttons }: any) => {
  return (
    <div>
      {title} <div>{subtitle}</div>{' '}
      <Image src={image.url} alt="hola" width={1000} height={1000}></Image>
    </div>
  )
}
export default IndexHero
