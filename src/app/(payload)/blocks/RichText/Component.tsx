import Container from '@/components/Container'
import RichTextParser from '@/utils/richTextParser'
import React from 'react'
export default function RichText({ richtxtcontent }: any) {
  return (
    <Container className="pt-0">
      <RichTextParser content={richtxtcontent}></RichTextParser>
    </Container>
  )
}
