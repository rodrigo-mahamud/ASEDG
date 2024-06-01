import React from 'react'
import BusItem from './Item'
import { Type } from '.'

const transport = [
  {
    from: 'San Esteban de Gormaz',
    fromRoad: 'Calle Santa María 24',
    fromHour: '20:30',
    to: 'Soria',
    toRoad: 'Venerable Carabantes 12',
    toHour: '21:00',
    companyImg: '/logoplaceholder.png',
  },
  {
    from: 'San Esteban de Gormaz',
    fromRoad: 'Calle Santa María 24',
    fromHour: '21:15',
    to: 'Soria',
    toRoad: 'Venerable Carabantes 12',
    toHour: '18:00',
    companyImg: '/logoplaceholder2.png',
  },
  {
    from: 'San Esteban de Gormaz',
    fromRoad: 'Calle Santa María 24',
    fromHour: '20:30',
    to: 'Soria',
    toRoad: 'Venerable Carabantes 12',
    toHour: '21:00',
    companyImg: '/logoplaceholder.png',
  },
  {
    from: 'San Esteban de Gormaz',
    fromRoad: 'Calle Santa María 24',
    fromHour: '21:15',
    to: 'Soria',
    toRoad: 'Venerable Carabantes 12',
    toHour: '18:00',
    companyImg: '/logoplaceholder2.png',
  },
]

const BusList: React.FC<Type> = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      {transport.map((item, index) => (
        <BusItem key={index} data={item} />
      ))}
    </div>
  )
}

export default BusList
