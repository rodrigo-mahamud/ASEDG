import { IconMapPinExclamation } from '@tabler/icons-react'
import React from 'react'

export default function BookingInfo() {
  return (
    <div className="w-4/6">
      <div className="flex flex-col p-8 rounded-lg btnShadow">
        <h1 className="text-2xl font-cal">Gimnasio Municipal</h1>
        <div className="flex">
          <IconMapPinExclamation></IconMapPinExclamation> Centro juvenil san esteban de gormaz
        </div>
        <h2 className="my-6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt, nobis praesentium
          quisquam quos totam deserunt laborum odit illum eaque perferendis. Quia aut perferendis
          vel sint quidem cum culpa aspernatur quam?
        </h2>
        <hr></hr>
        <div className="my-6"></div>
      </div>
      <div className="flex flex-col p-8 rounded-lg btnShadow">
        <h1 className="text-2xl font-cal">Gimnasio Municipal</h1>
        <div className="flex">
          <IconMapPinExclamation></IconMapPinExclamation> Centro juvenil san esteban de gormaz
        </div>
        <h2 className="my-6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt, nobis praesentium
          quisquam quos totam deserunt laborum odit illum eaque perferendis. Quia aut perferendis
          vel sint quidem cum culpa aspernatur quam?
        </h2>
        <hr></hr>
        <div className="my-6"></div>
      </div>
    </div>
  )
}
