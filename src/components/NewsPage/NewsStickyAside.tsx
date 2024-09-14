import { IconFiles } from '@tabler/icons-react'
import React from 'react'
import NSADowloadFiles from './NSADowloadFiles'

export default function NewsStickyAside({ attachments }) {
  return (
    <div className="sticky top-32">
      <NSADowloadFiles attachments={attachments}></NSADowloadFiles>
    </div>
  )
}
