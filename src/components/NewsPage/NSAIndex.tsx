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
    <nav className="nsa-index">
      <h3 className="text-xl font-semibold mb-4">Índice</h3>
      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <li key={index}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NSAIndex
