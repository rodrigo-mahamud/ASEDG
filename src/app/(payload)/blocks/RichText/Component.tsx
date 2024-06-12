import React from 'react'
import parse from 'react-html-parser'
export default function RichText(richtxtcontent) {
  console.log(richtxtcontent.root)

  return (
    <div>
      <div>{parse(richtxtcontent.root.children)}</div>
    </div>
  )
}
