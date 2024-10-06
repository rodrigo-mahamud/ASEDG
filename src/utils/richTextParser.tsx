import SerializeLexicalRichText from '@/utils/serializeLexicalRichText'
import React from 'react'

export default function RichTextParser({ className, content, customClassNames }: any) {
  if (!content?.root?.children) return ''

  return (
    <div className={`${[className].filter(Boolean).join(' ')} richText`}>
      {SerializeLexicalRichText({ children: content.root.children, customClassNames })}
    </div>
  )
}
