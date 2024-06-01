import React from 'react'
import { Layout } from '@/app/(payload)/collections/Pages'
import { components } from '@/app/(payload)/blocks'

type Props = {
  layout: Layout[]
  className?: string
}

const RenderBlocks: React.FC<Props> = ({ layout, className }) => {
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

        console.error(`No component found for block type: ${block.blockType}`)
        return (
          <section key={i}>
            <p>No block found for type: {block.blockType}</p>
          </section>
        )
      })}
    </div>
  )
}

export default RenderBlocks
