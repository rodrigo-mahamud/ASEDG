import SerializeLexicalRichText from '@/utils/serializeLexicalRichText'
import React from 'react'
// import RichTextSerializer from './RichTextSerializer'

export default function RichTextParser({ className, content, customClassNames }: any) {
  if (!content?.root?.children) return ''

  return (
    <div className={`${[className].filter(Boolean).join(' ')} richText`}>
      {SerializeLexicalRichText({ children: content.root.children, customClassNames })}
      {/* <RichTextSerializer content={content.root.children}></RichTextSerializer> */}
    </div>
  )
}
