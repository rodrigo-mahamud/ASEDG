import React from 'react'

export default function ImagesMasonry() {
  return (
    <div>
      <div className="grid grid-cols-4 grid-rows-4 gap-4">
        <div className="col-span-2 row-span-4">1</div>
        <div className="row-span-2 col-start-3">2</div>
        <div className="row-span-2 col-start-3 row-start-3">3</div>
        <div className="row-span-2 col-start-4 row-start-1">4</div>
        <div className="row-span-2 col-start-4 row-start-3">5</div>
      </div>
    </div>
  )
}
