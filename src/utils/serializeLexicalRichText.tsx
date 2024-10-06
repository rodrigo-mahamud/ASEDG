import React, { Fragment, ReactNode, useMemo } from 'react'
import { slugify } from '@/utils/slugify'
import { IconCheckbox, IconSquare } from '@tabler/icons-react'
import Image from 'next/image'
import escapeHTML from 'escape-html'
import RenderBlocks from '@/components/RenderBlocks'

// Define constants for text formats
const IS_BOLD = 1
const IS_ITALIC = 1 << 1
const IS_STRIKETHROUGH = 1 << 2
const IS_UNDERLINE = 1 << 3
const IS_CODE = 1 << 4
const IS_SUBSCRIPT = 1 << 5
const IS_SUPERSCRIPT = 1 << 6
const IS_HIGHLIGHT = 1 << 7

// Define types
interface Node {
  type: string
  value?: any
  text?: string
  format?: number
  textAlign?: 'left' | 'right' | 'center'
  tag?: string
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

// Define classNames using a Map for faster lookup
const classNames = new Map<string, string>([
  ['h2', 'text-3xl font-medium mb-2 mt-10 first:mt-0'],
  ['h3', 'text-xl font-medium mb-2 mt-4'],
  ['h4', 'text-lg font-medium'],
  ['p', 'text-base my-2'],
  ['ul', 'list-disc ml-8 mt-3 mb-4'],
  ['ol', 'list-decimal ml-8 mt-3 mb-4'],
  ['li', 'list-item my-4'],
  [
    'blockquote',
    'p-5 my-8 font-medium text-xl italic border border-border bg-secondary rounded-lg',
  ],
  ['a', 'text-blue-500 underline'],
])

// Helper functions
const generateTextAlign = (node: Node): string => {
  if (node.textAlign === 'right') return 'text-right'
  if (node.textAlign === 'center') return 'text-center'
  return ''
}

const formatText = (node: Node, text: ReactNode): ReactNode => {
  if (node.format !== undefined) {
    if (node.format & IS_BOLD) text = <strong key="bold">{text}</strong>
    if (node.format & IS_CODE) text = <code key="code">{text}</code>
    if (node.format & IS_ITALIC) text = <em key="italic">{text}</em>
    if (node.format & IS_UNDERLINE)
      text = (
        <span key="underline" className="underline">
          {text}
        </span>
      )
    if (node.format & IS_STRIKETHROUGH)
      text = (
        <span key="strikethrough" className="line-through">
          {text}
        </span>
      )
  }
  return text
}

// Render functions for different node types
const renderTextNode = (node: Node): ReactNode => {
  let text: ReactNode = node.text ? (
    <span key="text">{node.text}</span>
  ) : (
    <span key="empty" className="opacity-0 border-foreground">
      &nbsp;
    </span>
  )
  return formatText(node, text)
}

const renderHeadingNode = (node: Node, i: number): ReactNode => {
  const Tag = node.tag as string
  const headingText = node.children?.[0]?.text || ''
  const headingId = slugify(headingText)
  const className = `${classNames.get(node.tag || '') || ''} ${generateTextAlign(node)}`

  return React.createElement(
    Tag,
    { id: headingId, className, key: i, 'data-index-marker': true },
    SerializeLexicalRichText({ children: node.children || [] }),
  )
}

const renderListNode = (node: Node, i: number, parentNode: Node): ReactNode => {
  const listType = node.listType
  const className = `${classNames.get(listType === 'bullet' ? 'ul' : 'ol') || ''} ${listType === 'check' ? 'list-none' : ''}`
  const Tag = listType === 'bullet' ? 'ul' : 'ol'

  return React.createElement(
    Tag,
    { className, key: i },
    SerializeLexicalRichText({ children: node.children || [], parentNode: node }),
  )
}

const renderListItemNode = (node: Node, i: number, parentNode: Node): ReactNode => {
  const className = classNames.get('li') || ''

  if (node.checked) {
    return (
      <li className={`${className} flex gap-1`} key={i}>
        <IconCheckbox className="w-4 h-4 text-green-500" />
        <div className="line-through">
          {SerializeLexicalRichText({ children: node.children || [] })}
        </div>
      </li>
    )
  } else if (parentNode?.listType === 'check') {
    return (
      <li className={`${className} flex gap-1`} key={i}>
        <IconSquare className="w-4 h-4 text-green-500" />
        <div>{SerializeLexicalRichText({ children: node.children || [] })}</div>
      </li>
    )
  } else {
    return (
      <li className={className} key={i}>
        {SerializeLexicalRichText({ children: node.children || [] })}
      </li>
    )
  }
}

const renderUploadNode = (node: Node, i: number): ReactNode => {
  const { value } = node
  if (value.mimeType.startsWith('image')) {
    return (
      <Image
        key={i}
        src={value.url}
        alt={value.alt || value.filename}
        quality={15}
        width={value.width || 800}
        height={value.height || 600}
        className="my-10 w-full aspect-video rounded-xl object-cover"
      />
    )
  } else {
    return (
      <a
        key={i}
        href={value.url}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames.get('a') || ''}
      >
        {value.filename}
      </a>
    )
  }
}

const renderParagraphNode = (node: Node, i: number, parentNode: Node): ReactNode => {
  const className = `${classNames.get('p') || ''} ${generateTextAlign(node)}`
  const Tag = parentNode && parentNode.type === 'paragraph' ? 'span' : 'p'

  return React.createElement(
    Tag,
    { className, key: i },
    SerializeLexicalRichText({
      children: node.children || [],
      parentNode: { ...node, type: 'paragraph' },
    }),
  )
}

// Main function
const SerializeLexicalRichText: React.FC<SerializeProps> = ({ children, parentNode }) => {
  return useMemo(() => {
    return children
      ?.map((node, i) => {
        if (!node) return null

        switch (node.type) {
          case 'text':
            return <Fragment key={i}>{renderTextNode(node)}</Fragment>
          case 'heading':
            return renderHeadingNode(node, i)
          case 'list':
            return renderListNode(node, i, parentNode!)
          case 'listitem':
            return renderListItemNode(node, i, parentNode!)
          case 'upload':
            return renderUploadNode(node, i)
          case 'paragraph':
          case undefined:
            return renderParagraphNode(node, i, parentNode!)
          case 'quote':
            return (
              <blockquote className={classNames.get('blockquote') || ''} key={i}>
                &quot;{SerializeLexicalRichText({ children: node.children || [] })}&quot;
              </blockquote>
            )
          case 'link':
            return (
              <a
                className={classNames.get('a') || ''}
                href={escapeHTML(node.fields?.linkType === 'custom' ? node?.fields?.url : '')}
                target={node.fields?.newTab ? '_blank' : '_self'}
                key={i}
              >
                {SerializeLexicalRichText({ children: node.children || [] })}
              </a>
            )
          case 'block':
            if (node.fields) {
              const layout = {
                block: node.fields,
                blockType: node.fields.blockType || 'defaultBlockType',
              }
              return <RenderBlocks key={i} layout={[layout]} />
            }
            return null
          default:
            return node.children ? (
              <Fragment key={i}>
                {SerializeLexicalRichText({ children: node.children, parentNode: node })}
              </Fragment>
            ) : null
        }
      })
      .filter(Boolean)
  }, [children, parentNode])
}

export default SerializeLexicalRichText
