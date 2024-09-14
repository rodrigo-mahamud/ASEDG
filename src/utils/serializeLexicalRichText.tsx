import RenderBlocks from '@/components/RenderBlocks'
import escapeHTML from 'escape-html'
import Image from 'next/image'
import React, { Fragment, ReactNode } from 'react'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { slugify } from '@/utils/slugify'
export const IS_BOLD = 1
export const IS_ITALIC = 1 << 1
export const IS_STRIKETHROUGH = 1 << 2
export const IS_UNDERLINE = 1 << 3
export const IS_CODE = 1 << 4
export const IS_SUBSCRIPT = 1 << 5
export const IS_SUPERSCRIPT = 1 << 6
export const IS_HIGHLIGHT = 1 << 7

interface Node {
  type: string
  text?: string
  format?: number
  textAlign?: 'left' | 'right' | 'center'
  tag?: any
  listType?: 'bullet' | 'check' | 'number'
  checked?: boolean
  fields?: { [key: string]: any }
  children?: Node[]
}

interface SerializeProps {
  children: Node[]
  customClassNames?: { [key: string]: string }
  parentNode?: Node
}

function generateTextAlign(node: Node): string {
  if (node.textAlign === 'right') return 'text-right'
  if (node.textAlign === 'center') return 'text-center'
  return ''
}

export default function serializeLexicalRichText({
  children,
  customClassNames,
  parentNode,
}: SerializeProps): ReactNode {
  return children
    ?.map((node, i) => {
      const classNames: { [key: string]: string } = {
        h1: 'mt-6 text-5xl font-semibold',
        h2: 'mt-5 text-4xl font-medium',
        h3: 'mt-4 text-3xl font-medium',
        h4: 'mt-3 text-2xl font-medium',
        h5: 'mt-2 text-xl font-medium',
        h6: 'mt-1 text-lg font-medium',
        p: 'text-lg',
        ul: 'list-disc',
        ol: 'list-decimal',
        li: 'list-item',
        blockquote: 'font-medium text-lg text-gray-600',
        a: 'text-blue-500 underline',
      }

      if (!node) {
        return null
      }

      if (node.type === 'text') {
        let text: ReactNode = node.text ? (
          <span className="">{node.text}</span>
        ) : (
          <span className="opacity-0">&nbsp;</span>
        )

        if (node.format !== undefined && node.format & IS_BOLD) {
          text = <strong key={i}>{text}</strong>
        }

        if (node.format !== undefined && node.format & IS_CODE) {
          text = <code key={i}>{text}</code>
        }

        if (node.format !== undefined && node.format & IS_ITALIC) {
          text = <em key={i}>{text}</em>
        }

        if (node.format !== undefined && node.format & IS_UNDERLINE) {
          text = (
            <span className="underline" key={i}>
              {text}
            </span>
          )
        }

        if (node.format !== undefined && node.format & IS_STRIKETHROUGH) {
          text = (
            <span className="line-through" key={i}>
              {text}
            </span>
          )
        }

        return <Fragment key={i}>{text}</Fragment>
      }

      if (node.type === 'heading' && node.tag) {
        const Tag = node.tag
        if (node.tag === 'h2') {
          const headingText = node.children?.[0]?.text || ''
          const headingId = slugify(headingText)
          return (
            <Tag
              id={headingId}
              className={`${classNames[node.tag]} ${generateTextAlign(node)}`}
              key={i}
            >
              {serializeLexicalRichText({ children: node.children || [] })}
            </Tag>
          )
        }
        return (
          <Tag className={`${classNames[node.tag]} ${generateTextAlign(node)}`} key={i}>
            {serializeLexicalRichText({ children: node.children || [] })}
          </Tag>
        )
      }

      if (node.type === 'list') {
        if (node.listType === 'bullet') {
          return (
            <ul className={`${classNames.ul}`} key={i}>
              {serializeLexicalRichText({ children: node.children || [], parentNode: node })}
            </ul>
          )
        } else if (node.listType === 'check') {
          return (
            <ul className={`${classNames.ul} list-none`} key={i}>
              {serializeLexicalRichText({ children: node.children || [], parentNode: node })}
            </ul>
          )
        } else if (node.listType === 'number') {
          return (
            <ol className={`${classNames.ol}`} key={i}>
              {serializeLexicalRichText({ children: node.children || [], parentNode: node })}
            </ol>
          )
        }
      }

      if (node.type === 'listitem') {
        if (node.checked) {
          return (
            <li className={`${classNames.li} flex gap-1`} key={i}>
              <div>
                <MdCheckBox className="w-4 h-4 text-green-500" />
              </div>
              <div className="line-through">
                {serializeLexicalRichText({ children: node.children || [] })}
              </div>
            </li>
          )
        } else if (parentNode?.listType === 'check') {
          return (
            <li className={`${classNames.li} flex gap-1`} key={i}>
              <div>
                <MdCheckBoxOutlineBlank className="w-4 h-4 text-green-500" />
              </div>
              <div className="">{serializeLexicalRichText({ children: node.children || [] })}</div>
            </li>
          )
        } else {
          return (
            <li className={`${classNames.li}`} key={i}>
              {serializeLexicalRichText({ children: node.children || [] })}
            </li>
          )
        }
      }

      if (node.type === 'block' && node.fields) {
        const layout = {
          block: node.fields,
          blockType: node.fields.blockType || 'defaultBlockType',
        }
        return <RenderBlocks key={i} layout={[layout]} />
      }
      if (node.type === 'upload' && node.value) {
        const { value } = node
        if (value.mimeType.startsWith('image')) {
          return (
            <Image
              key={i}
              src={value.url}
              alt={value.alt || value.filename}
              quality={25}
              width={value.width || 800}
              height={value.height || 600}
              className={customClassNames?.image || 'my-4 max-w-full h-auto'}
              layout="responsive"
            />
          )
        } else {
          return (
            <a
              key={i}
              href={value.url}
              target="_blank"
              rel="noopener noreferrer"
              className={customClassNames?.fileLink || 'text-blue-500 underline'}
            >
              {value.filename}
            </a>
          )
        }
      }
      switch (node.type) {
        case 'quote':
          return (
            <blockquote className={`${classNames.blockquote}`} key={i}>
              {serializeLexicalRichText({ children: node.children || [] })}
            </blockquote>
          )

        case 'link':
          return (
            <a
              className={`${classNames.a}`}
              href={escapeHTML(node.fields?.linkType === 'custom' ? node?.fields?.url : '')}
              target={node.fields?.newTab ? '_blank' : '_self'}
              key={i}
            >
              {serializeLexicalRichText({ children: node.children || [] })}
            </a>
          )

        default:
          return (
            <p className={`${classNames.p} ${generateTextAlign(node)}`} key={i}>
              {serializeLexicalRichText({ children: node.children || [] })}
            </p>
          )
      }
    })
    .filter((node) => node !== null)
}

// Función auxiliar para extraer encabezados h2
export function extractH2Headings(nodes: Node[]): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = []

  nodes.forEach((node) => {
    if (node.type === 'heading' && node.tag === 'h2') {
      const text = node.children?.[0]?.text || ''
      const id = slugify(text)
      headings.push({ id, text })
    }
    if (node.children) {
      headings.push(...extractH2Headings(node.children))
    }
  })

  return headings
}
