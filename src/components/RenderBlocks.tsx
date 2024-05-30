import React from 'react'
import { Layout } from '@/app/(payload)/collections/Pages'
import { components } from '@/app/(payload)/blocks'

type Props = {
  layout: Layout[]
  className?: string
  isHomepage: boolean
}

const RenderBlocks: React.FC<Props> = ({ layout, className, isHomepage }) => {
  if (isHomepage) {
    const Block: React.FC<any> = components[layout[0].blockType]
    if (Block) {
      return (
        <section>
          <Block {...layout[0]} />
        </section>
      )
    }

    if (!Block) {
      return 'no hay bloque de inicio'
    }
  }
  return (
    <div className={[className].filter(Boolean).join(' ')}>
      {layout.map((block, i) => {
        const Block: React.FC<any> = components[block.blockType]

        if (Block) {
          return (
            <section key={i}>
              <Block {...block} />
            </section>
          )
        }

        if (!Block) {
          return 'no hay bloque'
        }
      })}
    </div>
  )
}

export default RenderBlocks
