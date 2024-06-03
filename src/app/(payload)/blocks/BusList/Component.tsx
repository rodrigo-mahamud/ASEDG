import React from 'react'
import BusItem from './Item'
import { Type } from '.'

const BusList: React.FC<Type> = ({ buses }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      {buses.map((item, index) => (
        <BusItem key={index} data={item} />
      ))}
    </div>
  )
}

export default BusList
