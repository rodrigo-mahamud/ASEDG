// components/NSAIndex.tsx
import React from 'react'
import Link from 'next/link'
import { extractH2Headings } from '@/utils/serializeLexicalRichText'
import { NSAIndexProps } from '@/types/typesNP'

const NSAIndex: React.FC<NSAIndexProps> = ({ indexContent }) => {
  console.log()

  const headings = extractH2Headings(indexContent.root.children)

  if (headings.length === 0) {
    return null
  }

  return (
    <div className="bg-[#f3f4f6] rounded-lg overflow-hidden border border-border">
      <h2 className="text-lg font-semibold pl-5 py-5">Indice de contenidos</h2>
      <ul className="space-y-2 p-5 border-t border-border">
        {headings.map((heading, index) => (
          <li key={index}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NSAIndex
