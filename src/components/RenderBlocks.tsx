import React from 'react'
import { components } from '@/app/(payload)/blocks'

// Define the type for the block components
interface BlockComponents {
  [key: string]: React.FC<any>
}

type Props = {
  layout: any
  className?: string
}

// Ensure `components` has the correct type
const typedComponents: BlockComponents = components

const RenderBlocks = ({ layout, className }: Props) => {
  return (
    <div className={[className].filter(Boolean).join(' ')}>
      {layout.map((block: any, i: number) => {
        const Block = typedComponents[block.blockType]

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
