import React from 'react'

import { NewsStickyAsideProps } from '@/types/typesNP'
import NSADowloadFiles from './NSADowloadFiles'
import NSAIndex from './NSAIndex'

const NewsStickyAside: React.FC<NewsStickyAsideProps> = ({ attachments, indexContent }) => {
  return (
    <div className="sticky top-32 space-y-8">
      <NSAIndex indexContent={indexContent}></NSAIndex>
      <NSADowloadFiles attachments={attachments} />
    </div>
  )
}

export default NewsStickyAside
