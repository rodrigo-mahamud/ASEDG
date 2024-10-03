import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ParallaxItem from '@/components/ParallaxItem'
import * as Icons from '@tabler/icons-react' // Importa todos los iconos
import { Button } from '@/components/lib/button'
import { Type } from '.'
import RichTextParser from '@/utils/richTextParser'

export default function IconList({ list }: Type) {
  return (
    <div className="flex items-start justify-center md:w-3/5">
      <ul className="pt-5">
        {list.map((item, index) => {
          const IconComponent = (Icons as any)[item.icon]
          return (
            <li key={index} className={` ${item.isblold ? 'ml-0' : 'ml-5'}mb-2 flex items-center`}>
              {IconComponent && (
                <IconComponent className="stroke-1.5 mr-2 h-7 w-7 md:mr-1.5 md:h-5 md:w-5" />
              )}
              <div className="flex flex-col">
                <h3
                  className={`line-clamp-1 text-base md:text-lg ${
                    item.isblold ? 'font-semibold' : ''
                  }`}
                >
                  {item.text}
                </h3>
                {item.listImage && (
                  <Image
                    className="mt-2"
                    src={item.listImage.url}
                    alt={item.listImage.alt}
                    width={130}
                    height={65}
                  ></Image>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
