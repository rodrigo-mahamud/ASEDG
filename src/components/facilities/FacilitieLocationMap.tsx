import React from 'react'
import { Separator } from '../ui/separator'

export default function FacilitieLocationMap({
  address = 'ayuntamiento san esteban de gormaz',
  zoom = 16,
}: any) {
  const encodedAddress = encodeURIComponent(address)
  const src = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed&disableDefaultUI=true&maptype=`
  return (
    <>
      <div className="w-full">
        <h2 className="text-xl md:text-3xl mb-4 font-semibold tracking-tight">
          ¿Cómo puedo llegar hasta ahi?
        </h2>
        <iframe
          title="Google Maps"
          className="h-96 md:h-[580px] rounded-xl"
          src={src}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  )
}
