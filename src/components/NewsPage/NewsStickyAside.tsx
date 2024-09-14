import React from 'react'

import { NewsStickyAsideProps } from '@/types/typesNP'
import NSADowloadFiles from './NSADowloadFiles'
import NSAIndex from './NSAIndex'

const NewsStickyAside: React.FC<NewsStickyAsideProps> = ({ attachments, indexContent }) => {
  return (
    <div className="sticky top-32">
      <NSADowloadFiles attachments={attachments} />
      <NSAIndex indexContent={indexContent}></NSAIndex>
    </div>
  )
}

export default NewsStickyAside
