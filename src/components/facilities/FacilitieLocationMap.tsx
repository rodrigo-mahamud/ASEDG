import React from 'react'

export default function FacilitieLocationMap() {
  return (
    <div className="w-full mt-12">
      <h2 className="text-3xl mb-4 font-semibold">¿Cómo puedo llegar hasta ahi?</h2>
      <iframe
        className="w-full h-[580px] rounded-xl"
        src="https://maps.google.com/maps?width=100%&amp;height=100%&amp;hl=en&amp;q=England, UK&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      ></iframe>
    </div>
  )
}
