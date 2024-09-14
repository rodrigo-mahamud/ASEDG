import React from 'react'

import { NewsStickyAsideProps } from '@/types/typesNP'
import NSADowloadFiles from './NSADowloadFiles'

const NewsStickyAside: React.FC<NewsStickyAsideProps> = ({ attachments }) => {
  return (
    <div className="sticky top-32">
      <NSADowloadFiles attachments={attachments} />
    </div>
  )
}

export default NewsStickyAside
