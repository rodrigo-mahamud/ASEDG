import React from 'react'
import DynamicIcon from '@/components/DynamicIcon'

export default function IconList({ block }: any) {
  return (
    <div className="flex items-start w-full">
      <ul className="py-6 grid grid-cols-2 grid-rows-3 w-full">
        {block.list.map((item: any, index: any) => {
          return (
            <li key={index} className="my-2 flex items-center">
              {item.icon && (
                <DynamicIcon
                  stroke={1.5}
                  className="mr-2 h-7 w-7 md:mr-1.5 md:h-5 md:w-5"
                  iconName={item.icon || ''}
                />
              )}
              <div className="flex flex-col">
                <h3 className={`line-clamp-1 text-base ${item.isblold ? 'font-semibold' : ''}`}>
                  {item.text}
                </h3>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
