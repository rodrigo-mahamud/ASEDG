import RichTextParser from '@/utils/richTextParser'
import React from 'react'
export default function RichText({ richtxtcontent }) {
  console.log(richtxtcontent.root)

  return (
    <div>
      <RichTextParser content={richtxtcontent}></RichTextParser>
    </div>
  )
}
